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

export const EMPTY_GEOMETRY_COLLECTION_WKT = 'GEOMETRYCOLLECTION EMPTY';

/**
 * Converts GeoJSON Geometry to WKT
 *
 * @param  {Geometry} geojson Geometry object to convert
 * @return {string} The GeoJSON converted to well known text representation
 */
export function geometryToWkt(geojson: Geometry): string {
  return geoJSONToWkt(geojson);
}

/**
 * Converts GeoJSON Feature to WKT
 *
 * @param  {Feature} geojson Feature object to convert
 * @return {string} The GeoJSON converted to well known text representation
 */
export function featureToWkt(geojson: Feature): string {
  return geometryToWkt(geojson.geometry);
}

/**
 * Converts a GeoJSON FeatureCollection to WKT GeometryCollection
 * @param  {FeatureCollection} featureCollection The FeatureCollection to convert to WKT
 * @return {string} The GeoJSON converted to well known representation
 */
export function featureCollectionToWkt(
  featureCollection: FeatureCollection
): string {
  if (featureCollection.type !== 'FeatureCollection') {
    throw new Error('GeoJSON is not a FeatureCollection');
  }

  return featureCollection.features.length === 0
    ? EMPTY_GEOMETRY_COLLECTION_WKT
    : `GEOMETRYCOLLECTION(${featureCollection.features
        .map((d) => featureToWkt(d))
        .join(',')})`;
}

/**
 * Shorthand to convert GeoJSON Features, Geometries or FeatureCollections to WKT
 *
 * @param  {GeoJSON} geojson The GeoJSON to convert
 * @return {string} The GeoJSON as WKT
 */
export function geojsonToWkt(geojson: GeoJSON): string {
  switch (geojson.type) {
    case 'Feature':
      return featureToWkt(geojson);
    case 'FeatureCollection':
      return featureCollectionToWkt(geojson);
    default:
      return geometryToWkt(geojson);
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
export function featureCollectionToWktList<P>(
  geojson: FeatureCollection<Geometry, P>
): (P & { wkt: string })[] {
  return geojson.features.map((d) => ({
    wkt: geometryToWkt(d.geometry),
    ...d.properties,
  }));
}

/**
 * Parse a WKT into a GeoJSON Feature or Geometry
 *
 * @param  {string} item The WKT to convert to GeoJSON
 * @param  {boolean} [asFeature=false] Wrap the converted geometry into a Feature
 * @param  {GeoJsonProperties} [properties={}] Metadata to embed the Feature with
 * @return {(Feature | Geometry)} The WKT as GeoJSON
 */
export function wktToGeojson(
  item: string,
  asFeature = false,
  properties: GeoJsonProperties = {}
): Feature | Geometry {
  let parsed: Geometry;

  if (item === EMPTY_GEOMETRY_COLLECTION_WKT) {
    parsed = {
      type: 'GeometryCollection',
      geometries: [],
    };
  } else {
    parsed = wktToGeoJSON(item) as Geometry;
  }

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
 * Removes 3D coordinates
 *
 * @param {Coordinates} coords The coordinates to strip the Z of
 * @return {Coordinates} The coordinates without the Z
 */
function stripZCoordinates(coords: Coordinates): Coordinates {
  if (typeof coords[0] === 'number') {
    return coords.slice(0, 2) as unknown as Coordinates;
  }

  return (coords as Position[]).map(
    stripZCoordinates
  ) as unknown as Coordinates;
}

/**
 * Parse a 3D GeoJSON into a 2D GeoJSON
 *
 * @param  {GeoJSON} geojson The 3D GeoJSON to convert to 2D
 * @return {GeoJSON} The GeoJSON as 2D
 */
export function geojson3dTo2d(geojson: GeoJSON): GeoJSON {
  const newGeoJSON = klona(geojson);

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
        geom.coordinates = stripZCoordinates(geom.coordinates);

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
  }

  if (newGeoJSON.type === 'FeatureCollection') {
    newGeoJSON.features = newGeoJSON.features.map(processFeature);

    return newGeoJSON;
  }

  return processGeometry(newGeoJSON) as GeoJSON;
}

/**
 * Parse a Z WKT into a 2D WKT
 *
 * @param  {string} wkt The Z WKT to convert to 2D WKT
 * @return {string} The Z WKT as 2D WKT
 */
export function wkt3dTo2d(wkt: string): string {
  const geojson = wktToGeojson(wkt);

  return geojsonToWkt(geojson3dTo2d(geojson));
}
