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
- [convertGeoJSONFeatureCollectionToWktCollection](#convertGeoJSONFeatureCollectionToWktCollection)
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

---

### convertGeoJSONFeatureCollectionToWktCollection

▸ **convertGeoJSONFeatureCollectionToWktCollection**<P\>(`geojson`: _FeatureCollection_<Geometry, P\>): P & { `wkt`: _string_ }[]

Converts a GeoJSON FeatureCollection into an array of objects where each object
contains a WKT (Well-Known Text) string representing the geometry and the properties
from the original GeoJSON feature

#### Type parameters:

| Name | Description                                    |
| :--- | :--------------------------------------------- |
| `P`  | The type of properties in the GeoJSON features |

#### Parameters:

| Name      | Type                              | Description                                   |
| :-------- | :-------------------------------- | :-------------------------------------------- |
| `geojson` | _FeatureCollection_<Geometry, P\> | The GeoJSON FeatureCollection to be converted |

**Returns:** P & { `wkt`: _string_ }[]

)[]} An array of objects where each object contains a `wkt` string
representing the geometry and all the properties from the original GeoJSON feature

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
