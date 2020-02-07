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
   * @param {object} GeoJSON GeoJSON to convert to WKT or WKB
   * @param {'wkt'|'wkb'} [type='wkt']
   * @returns {string|Buffer} WKT or WKT
   * @memberof WktParserHelper
   */
  static convertPolygonToWK(GeoJSON, type = 'wkt') {
    const parsed = wkx.Geometry.parseGeoJSON(GeoJSON);
    return type === 'wkt' ? parsed.toWkt() : parsed.toWkb();
  }

  /**
   * Parses from WKT or WKB
   *
   * @static
   * @param {string|Buffer} item WKT or WKB to convert to GeoJSON
   * @returns {object} GeoJSON
   * @memberof WktParserHelper
   */
  static parseFromWK(item) {
    return wkx.Geometry.parse(item).toGeoJSON();
  }
}

module.exports = WktParserHelper;
