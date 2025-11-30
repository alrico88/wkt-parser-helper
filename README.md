# wkt-parser-helper

Convert and parse between Well-Known-Text (WKT) and GeoJSON

## Installation

Using npm `npm i wkt-parser-helper`

Using pnpm `pnpm i wkt-parser-helper`

## Usage

In CommonJS env

```javascript
const { wktToGeojson } = require('wkt-parser-helper');

const geojson = wktToGeojson(
  'POLYGON ((-3.706512451171875 40.420074462890625, -3.70513916015625 40.420074462890625, -3.70513916015625 40.42144775390625, -3.706512451171875 40.42144775390625, -3.706512451171875 40.420074462890625))'
);

// geojson is a Polygon Geometry
```

Using imports

```javascript
import { geojsonToWkt } from 'wkt-parser-helper';

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

const myFeatureAsWKT = geojsonToWkt(myFeature);

// myFeatureAsWKT is 'POLYGON ((-3.706512451171875 40.420074462890625, -3.70513916015625 40.420074462890625, -3.70513916015625 40.42144775390625, -3.706512451171875 40.42144775390625, -3.706512451171875 40.420074462890625))'
```

## Breaking changes

From v4.0.0 onwards, support for converting GeoJSON to WKB is dropped.

In v7.0.0, functions have been renamed:

| Previous name                             | New name                     |
| ----------------------------------------- | ---------------------------- |
| `convertGeometryToWK`                     | `geometryToWkt`              |
| `convertFeatureToWK`                      | `featureToWkt`               |
| `convertFeatureCollection`                | `featureCollectionToWkt`     |
| `convertToWK`                             | `geojsonToWkt`               |
| `convertFeatureCollectionToWktCollection` | `featureCollectionToWktList` |
| `parseFromWK`                             | `wktToGeojson`               |

## DOCS

## Variables

### EMPTY_GEOMETRY_COLLECTION_WKT

```ts
const EMPTY_GEOMETRY_COLLECTION_WKT: 'GEOMETRYCOLLECTION EMPTY' =
  'GEOMETRYCOLLECTION EMPTY';
```

Defined in: [index.ts:15](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L15)

## Functions

### featureCollectionToWkt()

```ts
function featureCollectionToWkt(featureCollection: FeatureCollection): string;
```

Defined in: [index.ts:42](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L42)

Converts a GeoJSON FeatureCollection to WKT GeometryCollection

#### Parameters

| Parameter           | Type                | Description                             |
| ------------------- | ------------------- | --------------------------------------- |
| `featureCollection` | `FeatureCollection` | The FeatureCollection to convert to WKT |

#### Returns

`string`

The GeoJSON converted to well known representation

---

### featureCollectionToWktList()

```ts
function featureCollectionToWktList<P>(
  geojson: FeatureCollection<Geometry, P>
): P & object[];
```

Defined in: [index.ts:83](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L83)

Converts a GeoJSON FeatureCollection into an array of objects where each object
contains a WKT string representing the geometry and the properties
from the original GeoJSON feature

#### Type Parameters

| Type Parameter | Description                                    |
| -------------- | ---------------------------------------------- |
| `P`            | The type of properties in the GeoJSON features |

#### Parameters

| Parameter | Type                                   | Description                                   |
| --------- | -------------------------------------- | --------------------------------------------- |
| `geojson` | `FeatureCollection`\<`Geometry`, `P`\> | The GeoJSON FeatureCollection to be converted |

#### Returns

`P` & `object`[]

An array of objects where each object contains a `wkt` string
representing the geometry and all the properties from the original GeoJSON feature

---

### featureToWkt()

```ts
function featureToWkt(geojson: Feature): string;
```

Defined in: [index.ts:33](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L33)

Converts GeoJSON Feature to WKT

#### Parameters

| Parameter | Type      | Description               |
| --------- | --------- | ------------------------- |
| `geojson` | `Feature` | Feature object to convert |

#### Returns

`string`

The GeoJSON converted to well known text representation

---

### geojson3dTo2d()

```ts
function geojson3dTo2d(geojson: GeoJSON): GeoJSON;
```

Defined in: [index.ts:140](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L140)

Parse a 3D GeoJSON into a 2D GeoJSON

#### Parameters

| Parameter | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| `geojson` | `GeoJSON` | The 3D GeoJSON to convert to 2D |

#### Returns

`GeoJSON`

The GeoJSON as 2D

---

### geojsonToWkt()

```ts
function geojsonToWkt(geojson: GeoJSON): string;
```

Defined in: [index.ts:62](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L62)

Shorthand to convert GeoJSON Features, Geometries or FeatureCollections to WKT

#### Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `geojson` | `GeoJSON` | The GeoJSON to convert |

#### Returns

`string`

The GeoJSON as WKT

---

### geometryToWkt()

```ts
function geometryToWkt(geojson: Geometry): string;
```

Defined in: [index.ts:23](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L23)

Converts GeoJSON Geometry to WKT

#### Parameters

| Parameter | Type       | Description                |
| --------- | ---------- | -------------------------- |
| `geojson` | `Geometry` | Geometry object to convert |

#### Returns

`string`

The GeoJSON converted to well known text representation

---

### wkt3dTo2d()

```ts
function wkt3dTo2d(wkt: string): string;
```

Defined in: [index.ts:195](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L195)

Parse a Z WKT into a 2D WKT

#### Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `wkt`     | `string` | The Z WKT to convert to 2D WKT |

#### Returns

`string`

The Z WKT as 2D WKT

---

### wktToGeojson()

```ts
function wktToGeojson(
  item: string,
  asFeature?: boolean,
  properties?: GeoJsonProperties
): Geometry | Feature<Geometry, GeoJsonProperties>;
```

Defined in: [index.ts:100](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L100)

Parse a WKT into a GeoJSON Feature or Geometry

#### Parameters

| Parameter     | Type                | Default value | Description                                |
| ------------- | ------------------- | ------------- | ------------------------------------------ |
| `item`        | `string`            | `undefined`   | The WKT to convert to GeoJSON              |
| `asFeature?`  | `boolean`           | `false`       | Wrap the converted geometry into a Feature |
| `properties?` | `GeoJsonProperties` | `{}`          | Metadata to embed the Feature with         |

#### Returns

`Geometry` \| `Feature`\<`Geometry`, `GeoJsonProperties`\>

The WKT as GeoJSON
