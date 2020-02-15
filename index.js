const wkx = require('wkx');

/**
 * WktParserHelper class
 *
 * @class WktParserHelper
 */
class WktParserHelper {

  /**
   * Converts GeoJSON to Wkt or Wkb
   *
   * @static
   * @deprecated Use convertToWK instead
   * @memberof WktParserHelper
   */
  static convertPolygonToWK() {
    throw new Error('method is deprecated, use convertToWK instead');
  }

  /**
   * Converts GeoJSON to WKT or WKB
   *
   * @static
   * @param {{type: string}} GeoJSON GeoJSON to convert to WKT or WKB
   * @param {'wkt'|'wkb'} [type='wkt']
   * @returns {string|Buffer} WKT or WKB
   * @memberof WktParserHelper
   */
  static convertToWK(GeoJSON, type = 'wkt') {
    const toParse = GeoJSON.type === 'Feature' ? GeoJSON.geometry : GeoJSON;
    const parsed = wkx.Geometry.parseGeoJSON(toParse);
    return type === 'wkt' ? parsed.toWkt() : parsed.toWkb();
  }

  /**
   * Parses from WKT or WKB
   *
   * @static
   * @param {string|Buffer} item WKT or WKB to convert to GeoJSON
   * @param {boolean} [asFeature=false]
   * @param {object} [properties={}] Properties to embed resulting GeoJSON feature
   * @returns {object} GeoJSON
   * @memberof WktParserHelper
   */
  static parseFromWK(item, asFeature = false, properties = {}) {
    const GeoJSON = wkx.Geometry.parse(item).toGeoJSON();
    return asFeature
      ? {
          type: 'Feature',
          geometry: GeoJSON,
          properties,
        }
      : GeoJSON;
  }

  /**
   * Converts GeoJSON FeatureCollection to WKT GEOMETRYCOLLECTION
   *
   * @static
   * @param {{type: 'FeatureCollection', features: object[]}} GeoJSON GeoJSON FeatureCollection to convert to WKT
   * @returns {string} WKT or WKT
   * @memberof WktParserHelper
   */
  static convertFeatureCollection(GeoJSON) {
    if (GeoJSON.type !== 'FeatureCollection') {
      throw new Error('GeoJSON is not a FeatureCollection');
    }
    return `GEOMETRYCOLLECTION(${GeoJSON.features
      .map((d) => WktParserHelper.convertToWK(d))
      .join(',')})`;
  }
}

module.exports = WktParserHelper;
