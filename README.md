# wkt-parser-helper

Convert and parse between Well-Known-Text (WKT) and GeoJSON

## Installation

Using npm `npm i wkt-parser-helper`

Using yarn `yarn add wkt-parser-helper`

## Usage

In CommonJS env

```javascript
const { parseFromWK } = require('wkt-parser-helper');

const geojson = parseFromWK(
  'POLYGON ((-3.706512451171875 40.420074462890625, -3.70513916015625 40.420074462890625, -3.70513916015625 40.42144775390625, -3.706512451171875 40.42144775390625, -3.706512451171875 40.420074462890625))'
);

// geojson is a Polygon Geometry
```

Using imports

```javascript
import { convertToWK } from 'wkt-parser-helper';

const myFeature: Feature = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-3.706512451171875, 40.420074462890625],
        [-3.70513916015625, 40.420074462890625],
        [-3.70513916015625, 40.42144775390625],
        [-3.706512451171875, 40.42144775390625],
        [-3.706512451171875, 40.420074462890625],
      ],
    ],
  },
};

const myFeatureAsWKT = convertToWK(myFeature);

// myFeatureAsWKT is 'POLYGON ((-3.706512451171875 40.420074462890625, -3.70513916015625 40.420074462890625, -3.70513916015625 40.42144775390625, -3.706512451171875 40.42144775390625, -3.706512451171875 40.420074462890625))'
```

## Breaking changes

From v4.0.0 onwards, support for converting GeoJSON to WKB is dropped.

## Table of contents

### Functions

- [convertFeatureCollection](#convertfeaturecollection)
- [convertFeatureToWK](#convertfeaturetowk)
- [convertGeometryToWK](#convertgeometrytowk)
- [convertToWK](#converttowk)
- [parseFromWK](#parsefromwk)

## Functions

### convertFeatureCollection

▸ **convertFeatureCollection**(`featureCollection`: FeatureCollection): _string_

Converts a GeoJSON FeatureCollection to WKT GeometryCollection

**`export`**

#### Parameters:

| Name                | Type              | Description                             |
| :------------------ | :---------------- | :-------------------------------------- |
| `featureCollection` | FeatureCollection | The FeatureCollection to convert to WKT |

**Returns:** _string_

The GeoJSON converted to well known representation

Defined in: [index.ts:34](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L34)

---

### convertFeatureToWK

▸ **convertFeatureToWK**(`geojson`: Feature): _string_

Converts GeoJSON Feature to WKT

**`export`**

#### Parameters:

| Name      | Type    | Description               |
| :-------- | :------ | :------------------------ |
| `geojson` | Feature | Feature object to convert |

**Returns:** _string_

The GeoJSON converted to well known text representation

Defined in: [index.ts:24](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L24)

---

### convertGeometryToWK

▸ **convertGeometryToWK**(`geojson`: Geometry): _string_

Converts GeoJSON Geometry to WKT

**`export`**

#### Parameters:

| Name      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `geojson` | Geometry | Geometry object to convert |

**Returns:** _string_

The GeoJSON converted to well known text representation

Defined in: [index.ts:13](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L13)

---

### convertToWK

▸ **convertToWK**(`geojson`: GeoJSON): _string_

Shorthand to convert GeoJSON Features, Geometries or FeatureCollections to WKT or WKB

**`export`**

#### Parameters:

| Name      | Type    | Description            |
| :-------- | :------ | :--------------------- |
| `geojson` | GeoJSON | The GeoJSON to convert |

**Returns:** _string_

The GeoJSON as WKT

Defined in: [index.ts:51](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L51)

---

### parseFromWK

▸ **parseFromWK**(`item`: _string_, `asFeature?`: _boolean_, `properties?`: GeoJsonProperties): Feature \| Geometry

Parse a WKT or WKB into a GeoJSON Feature or Geometry

**`export`**

#### Parameters:

| Name         | Type              | Default value | Description                   |
| :----------- | :---------------- | :------------ | :---------------------------- |
| `item`       | _string_          | -             | The WKT to convert to GeoJSON |
| `asFeature`  | _boolean_         | false         | -                             |
| `properties` | GeoJsonProperties | -             | -                             |

**Returns:** Feature \| Geometry

The WKT as GeoJSON

Defined in: [index.ts:71](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L71)
