<a name="WktParserHelper"></a>

## WktParserHelper

**Kind**: global class

- [WktParserHelper](#WktParserHelper)
  - [new WktParserHelper()](#new_WktParserHelper_new)
  - [.convertPolygonToWK(GeoJSON, [type])](#WktParserHelper.convertPolygonToWK) ⇒ <code>string</code> \| <code>Buffer</code>
  - [.parseFromWK(item)](#WktParserHelper.parseFromWK) ⇒ <code>object</code>

<a name="new_WktParserHelper_new"></a>

### new WktParserHelper()

WktParserHelper class

<a name="WktParserHelper.convertPolygonToWK"></a>

### WktParserHelper.convertPolygonToWK(GeoJSON, [type]) ⇒ <code>string</code> \| <code>Buffer</code>

Converts GeoJSON to Wkt or Wkb

**Kind**: static method of [<code>WktParserHelper</code>](#WktParserHelper)  
**Returns**: <code>string</code> \| <code>Buffer</code> - WKT or WKT

| Param   | Type                                                         | Default                      | Description                      |
| ------- | ------------------------------------------------------------ | ---------------------------- | -------------------------------- |
| GeoJSON | <code>object</code>                                          |                              | GeoJSON to convert to WKT or WKB |
| [type]  | <code>&#x27;wkt&#x27;</code> \| <code>&#x27;wkb&#x27;</code> | <code>&#x27;wkt&#x27;</code> |                                  |

<a name="WktParserHelper.parseFromWK"></a>

### WktParserHelper.parseFromWK(item) ⇒ <code>object</code>

Parses from WKT or WKB

**Kind**: static method of [<code>WktParserHelper</code>](#WktParserHelper)  
**Returns**: <code>object</code> - GeoJSON

| Param | Type                                       | Description                      |
| ----- | ------------------------------------------ | -------------------------------- |
| item  | <code>string</code> \| <code>Buffer</code> | WKT or WKB to convert to GeoJSON |
