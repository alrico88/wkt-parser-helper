import type {
  GeoJSON,
  GeoJsonProperties,
  Feature,
  Geometry,
  FeatureCollection,
} from 'geojson';
import { wktToGeoJSON, geoJSONToWkt } from 'betterknown';

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

  return `GEOMETRYCOLLECTION(${featureCollection.features
    .map((d) => convertFeatureToWK(d))
    .join(',')})`;
}

/**
 * Shorthand to convert GeoJSON Features, Geometries or FeatureCollections to WKT or WKB
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
 * Parse a WKT or WKB into a GeoJSON Feature or Geometry
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
