import type {
  Feature,
  FeatureCollection,
  GeoJSON,
  GeoJsonProperties,
  Geometry,
  GeometryCollection,
  Position,
} from 'geojson';
import { geoJSONToWkt, wktToGeoJSON } from 'betterknown';
import { klona } from 'klona/json';

type Coordinates = Position | Position[] | Position[][] | Position[][][];

/**
 * Converts GeoJSON Geometry to WKT
 *
 * @export
 * @param  {Geometry} geojson Geometry object to convert
 * @return {string} The GeoJSON converted to well known text representation
 */
export function convertGeometryToWK(geojson: Geometry): string {
  return geoJSONToWkt(geojson);
}

/**
 * Converts GeoJSON Feature to WKT
 *
 * @export
 * @param  {Feature} geojson Feature object to convert
 * @return {string} The GeoJSON converted to well known text representation
 */
export function convertFeatureToWK(geojson: Feature): string {
  return convertGeometryToWK(geojson.geometry);
}

/**
 * Converts a GeoJSON FeatureCollection to WKT GeometryCollection
 * @export
 * @param  {FeatureCollection} featureCollection The FeatureCollection to convert to WKT
 * @return {string} The GeoJSON converted to well known representation
 */
export function convertFeatureCollection(
  featureCollection: FeatureCollection
): string {
  if (featureCollection.type !== 'FeatureCollection') {
    throw new Error('GeoJSON is not a FeatureCollection');
  }

  return featureCollection.features.length === 0
    ? 'GEOMETRYCOLLECTION EMPTY'
    : `GEOMETRYCOLLECTION(${featureCollection.features
        .map((d) => convertFeatureToWK(d))
        .join(',')})`;
}

/**
 * Shorthand to convert GeoJSON Features, Geometries or FeatureCollections to WKT
 *
 * @export
 * @param  {GeoJSON} geojson The GeoJSON to convert
 * @return {string} The GeoJSON as WKT
 */
export function convertToWK(geojson: GeoJSON): string {
  switch (geojson.type) {
    case 'Feature':
      return convertFeatureToWK(geojson);
    case 'FeatureCollection':
      return convertFeatureCollection(geojson);
    default:
      return convertGeometryToWK(geojson);
  }
}

/**
 * Converts a GeoJSON FeatureCollection into an array of objects where each object
 * contains a WKT string representing the geometry and the properties
 * from the original GeoJSON feature
 *
 * @template P The type of properties in the GeoJSON features
 * @param {FeatureCollection<Geometry, P>} geojson The GeoJSON FeatureCollection to be converted
 * @returns {(P & { wkt: string })[]} An array of objects where each object contains a `wkt` string
 * representing the geometry and all the properties from the original GeoJSON feature
 */
export function convertFeatureCollectionToWktCollection<P>(
  geojson: FeatureCollection<Geometry, P>
): (P & { wkt: string })[] {
  return geojson.features.map((d) => ({
    wkt: convertGeometryToWK(d.geometry),
    ...d.properties,
  }));
}

/**
 * Parse a WKT into a GeoJSON Feature or Geometry
 *
 * @export
 * @param  {string} item The WKT to convert to GeoJSON
 * @param  {boolean} [asFeature=false] Wrap the converted geometry into a Feature
 * @param  {GeoJsonProperties} [properties={}] Metadata to embed the Feature with
 * @return {(Feature | Geometry)} The WKT as GeoJSON
 */
export function parseFromWK(
  item: string,
  asFeature = false,
  properties: GeoJsonProperties = {}
): Feature | Geometry {
  const parsed = wktToGeoJSON(item) as Geometry;

  if (asFeature) {
    return {
      type: 'Feature',
      geometry: parsed,
      properties,
    };
  }

  return parsed;
}

/**
 * Parse a Z WKT into a 2D GeoJSON Feature or Geometry
 *
 * @export
 * @param  {GeoJSON} geojson The WKT to convert to GeoJSON
 * @return {GeoJSON} The WKT as 2D GeoJSON
 */
export function convertZGeojsonTo2D(geojson: GeoJSON): GeoJSON {
  const newGeoJSON = klona(geojson);

  function stripCoords(coords: Coordinates): Coordinates {
    if (typeof coords[0] === 'number') {
      return coords.slice(0, 2) as unknown as Coordinates;
    }

    return (coords as Position[]).map(stripCoords) as unknown as Coordinates;
  }

  function processGeometry(geom: GeoJSON | GeometryCollection): GeoJSON | null {
    if (geom == null) return null;

    const type = geom.type;

    switch (type) {
      case 'Point':
      case 'MultiPoint':
      case 'LineString':
      case 'MultiLineString':
      case 'Polygon':
      case 'MultiPolygon':
        geom.coordinates = stripCoords(geom.coordinates);

        break;
      case 'GeometryCollection':
        geom.geometries = geom.geometries.map(processGeometry) as Geometry[];

        break;
      default:
        throw new Error(`geometry type not supported: ${type}`);
    }

    return geom;
  }

  function processFeature(feature: Feature): Feature {
    if (feature.geometry) {
      feature.geometry = processGeometry(feature.geometry) as Geometry;
    }
    return feature;
  }

  if (newGeoJSON.type === 'Feature') {
    return processFeature(newGeoJSON as Feature);
  } else if (newGeoJSON.type === 'FeatureCollection') {
    const fc = newGeoJSON as FeatureCollection;

    fc.features = fc.features.map(processFeature);

    return fc;
  } else {
    return processGeometry(newGeoJSON) as GeoJSON;
  }
}

/**
 * Parse a Z WKT into a 2D WKT
 *
 * @export
 * @param  {string} wkt The Z WKT to convert to 2D WKT
 * @return {GeoJSON} The Z WKT as 2D WKT
 */
export function convertWkTo2DWk(wkt: string): string {
  const geojson = parseFromWK(wkt);

  return convertToWK(convertZGeojsonTo2D(geojson));
}
