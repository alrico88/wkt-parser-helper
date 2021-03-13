# wkt-parser-helper

## Installation

Using npm `npm i wkt-parser-helper`

Using yarn `yarn add wkt-parser-helper`

## Usage

In CommonJS env

```javascript
const { parseFromWK } = require('wkt-parser-helper');

const geojson = parseFromWK(
  'POLYGON((-3.706512451171875 40.420074462890625,-3.70513916015625 40.420074462890625,-3.70513916015625 40.42144775390625,-3.706512451171875 40.42144775390625,-3.706512451171875 40.420074462890625))'
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

const myFeatureAsWKT = convertToWK(myFeature, 'wkt');

// myFeatureAsWKT is 'POLYGON((-3.706512451171875 40.420074462890625,-3.70513916015625 40.420074462890625,-3.70513916015625 40.42144775390625,-3.706512451171875 40.42144775390625,-3.706512451171875 40.420074462890625))'
```

## Table of contents

### Type aliases

- [WKType](#wktype)

### Functions

- [convertFeatureCollection](#convertfeaturecollection)
- [convertFeatureToWK](#convertfeaturetowk)
- [convertGeometryToWK](#convertgeometrytowk)
- [convertToWK](#converttowk)
- [parseFromWK](#parsefromwk)

## Type aliases

### WKType

Ƭ **WKType**: _wkt_ \| _wkb_

Defined in: index.ts:4

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

Defined in: index.ts:38

---

### convertFeatureToWK

▸ **convertFeatureToWK**(`geojson`: Feature, `type?`: [_WKType_](#wktype)): _string_ \| Buffer

Converts GeoJSON Feature to WKT or WKB

**`export`**

#### Parameters:

| Name      | Type                | Default value | Description               |
| :-------- | :------------------ | :------------ | :------------------------ |
| `geojson` | Feature             | -             | Feature object to convert |
| `type`    | [_WKType_](#wktype) | 'wkt'         | -                         |

**Returns:** _string_ \| Buffer

The GeoJSON converted to well known representation

Defined in: index.ts:28

---

### convertGeometryToWK

▸ **convertGeometryToWK**(`geojson`: Geometry, `type?`: [_WKType_](#wktype)): _string_ \| Buffer

Converts GeoJSON Geometry to WKT or WKB

**`export`**

#### Parameters:

| Name      | Type                | Default value | Description                |
| :-------- | :------------------ | :------------ | :------------------------- |
| `geojson` | Geometry            | -             | Geometry object to convert |
| `type`    | [_WKType_](#wktype) | 'wkt'         | -                          |

**Returns:** _string_ \| Buffer

The GeoJSON converted to well known representation

Defined in: index.ts:14

---

### convertToWK

▸ **convertToWK**(`geojson`: GeoJSON, `type?`: [_WKType_](#wktype)): _string_ \| Buffer

Shorthand to convert GeoJSON Features, Geometries or FeatureCollections to WKT or WKB

**`export`**

#### Parameters:

| Name      | Type                | Default value | Description            |
| :-------- | :------------------ | :------------ | :--------------------- |
| `geojson` | GeoJSON             | -             | The GeoJSON to convert |
| `type`    | [_WKType_](#wktype) | 'wkt'         | -                      |

**Returns:** _string_ \| Buffer

The GeoJSON as WKT or WKB

Defined in: index.ts:56

---

### parseFromWK

▸ **parseFromWK**(`item`: _string_ \| Buffer, `asFeature?`: _boolean_, `properties?`: GeoJsonProperties): Feature \| Geometry

Parse a WKT or WKB into a GeoJSON Feature or Geometry

**`export`**

#### Parameters:

| Name         | Type               | Default value | Description                  |
| :----------- | :----------------- | :------------ | :--------------------------- |
| `item`       | _string_ \| Buffer | -             | The WK to convert to GeoJSON |
| `asFeature`  | _boolean_          | false         | -                            |
| `properties` | GeoJsonProperties  | -             | -                            |

**Returns:** Feature \| Geometry

The WK as GeoJSON

Defined in: index.ts:76
