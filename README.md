<a name="WktParserHelper"></a>

## WktParserHelper

**Kind**: global class

- [WktParserHelper](#WktParserHelper)
  - [new WktParserHelper()](#new_WktParserHelper_new)
  - ~~[.convertPolygonToWK()](#WktParserHelper.convertPolygonToWK)~~
  - [.convertToWK(GeoJSON, [type])](#WktParserHelper.convertToWK) ⇒ <code>string</code> \| <code>Buffer</code>
  - [.parseFromWK(item, [asFeature], [properties])](#WktParserHelper.parseFromWK) ⇒ <code>object</code>
  - [.convertFeatureCollection(GeoJSON)](#WktParserHelper.convertFeatureCollection) ⇒ <code>string</code>

<a name="new_WktParserHelper_new"></a>

### new WktParserHelper()

WktParserHelper class

<a name="WktParserHelper.convertPolygonToWK"></a>

### ~~WktParserHelper.convertPolygonToWK()~~

**_Deprecated_**

Converts GeoJSON to Wkt or Wkb

**Kind**: static method of [<code>WktParserHelper</code>](#WktParserHelper)  
<a name="WktParserHelper.convertToWK"></a>

### WktParserHelper.convertToWK(GeoJSON, [type]) ⇒ <code>string</code> \| <code>Buffer</code>

Converts GeoJSON to WKT or WKB

**Kind**: static method of [<code>WktParserHelper</code>](#WktParserHelper)  
**Returns**: <code>string</code> \| <code>Buffer</code> - WKT or WKB

| Param   | Type                                                         | Default                      | Description                      |
| ------- | ------------------------------------------------------------ | ---------------------------- | -------------------------------- |
| GeoJSON | <code>Object</code>                                          |                              | GeoJSON to convert to WKT or WKB |
| [type]  | <code>&#x27;wkt&#x27;</code> \| <code>&#x27;wkb&#x27;</code> | <code>&#x27;wkt&#x27;</code> |                                  |

<a name="WktParserHelper.parseFromWK"></a>

### WktParserHelper.parseFromWK(item, [asFeature], [properties]) ⇒ <code>object</code>

Parses from WKT or WKB

**Kind**: static method of [<code>WktParserHelper</code>](#WktParserHelper)  
**Returns**: <code>object</code> - GeoJSON

| Param        | Type                                       | Default            | Description                                   |
| ------------ | ------------------------------------------ | ------------------ | --------------------------------------------- |
| item         | <code>string</code> \| <code>Buffer</code> |                    | WKT or WKB to convert to GeoJSON              |
| [asFeature]  | <code>boolean</code>                       | <code>false</code> |                                               |
| [properties] | <code>object</code>                        | <code>{}</code>    | Properties to embed resulting GeoJSON feature |

<a name="WktParserHelper.convertFeatureCollection"></a>

### WktParserHelper.convertFeatureCollection(GeoJSON) ⇒ <code>string</code>

Converts GeoJSON FeatureCollection to WKT GEOMETRYCOLLECTION

**Kind**: static method of [<code>WktParserHelper</code>](#WktParserHelper)  
**Returns**: <code>string</code> - WKT or WKT

| Param   | Type                | Description                                 |
| ------- | ------------------- | ------------------------------------------- |
| GeoJSON | <code>Object</code> | GeoJSON FeatureCollection to convert to WKT |
