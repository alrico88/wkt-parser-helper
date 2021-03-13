import {GeoJSON, GeoJsonProperties, Feature, Geometry, FeatureCollection} from 'geojson';
import wkx from 'wkx';

export type WKType = 'wkt' | 'wkb';

/**
 * Converts GeoJSON Geometry to WKT or WKB
 *
 * @export
 * @param  {Geometry} geojson Geometry object to convert
 * @param  {WKType} [type='wkt'] Type of WK to convert to
 * @return {(string | Buffer)} The GeoJSON converted to well known representation
 */
export function convertGeometryToWK(geojson: Geometry, type: WKType = 'wkt'): string | Buffer {
  const parsed = wkx.Geometry.parseGeoJSON(geojson);

  return type === 'wkt' ? parsed.toWkt() : parsed.toWkb();
}

/**
 * Converts GeoJSON Feature to WKT or WKB
 *
 * @export
 * @param  {Feature} geojson Feature object to convert
 * @param  {WKType} [type='wkt'] Type of WK to convert to
 * @return {(string | Buffer) } The GeoJSON converted to well known representation
 */
export function convertFeatureToWK(geojson: Feature, type: WKType = 'wkt'): string | Buffer {
  return convertGeometryToWK(geojson.geometry, type);
}

/**
 * Converts a GeoJSON FeatureCollection to WKT GeometryCollection
 * @export
 * @param  {FeatureCollection} featureCollection The FeatureCollection to convert to WKT
 * @return {string} The GeoJSON converted to well known representation
 */
export function convertFeatureCollection(featureCollection: FeatureCollection): string {
  if (featureCollection.type !== 'FeatureCollection') {
    throw new Error('GeoJSON is not a FeatureCollection');
  }

  return `GEOMETRYCOLLECTION(${featureCollection.features
    .map((d) => convertFeatureToWK(d, 'wkt'))
    .join(',')})`;
}

/**
 * Shorthand to convert GeoJSON Features, Geometries or FeatureCollections to WKT or WKB
 *
 * @export
 * @param  {GeoJSON} geojson The GeoJSON to convert
 * @param  {WKType} [type='wkt'] Type of WK to convert to
 * @return {(string | Buffer)} The GeoJSON as WKT or WKB
 */
export function convertToWK(geojson: GeoJSON, type: WKType = 'wkt'): string | Buffer {
  switch (geojson.type) {
    case 'Feature':
      return convertFeatureToWK(geojson, type);
    case 'FeatureCollection':
      return convertFeatureCollection(geojson);
    default:
      return convertGeometryToWK(geojson, type);
  }
}

/**
 * Parse a WKT or WKB into a GeoJSON Feature or Geometry
 *
 * @export
 * @param  {(string | Buffer)} item The WK to convert to GeoJSON
 * @param  {boolean} [asFeature=false] Wrap the converted geometry into a Feature
 * @param  {GeoJsonProperties} [properties={}] Metadata to embed the Feature with
 * @return {(Feature | Geometry)} The WK as GeoJSON
 */
export function parseFromWK(item: string | Buffer, asFeature = false, properties: GeoJsonProperties = {}): Feature | Geometry {
  const parsed = wkx.Geometry.parse(item).toGeoJSON() as Geometry;

  if (asFeature === true) {
    return {
      type: 'Feature',
      geometry: parsed,
      properties,
    };
  } else {
    return parsed;
  }
}


