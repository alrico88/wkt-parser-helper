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

## Functions

### convertFeatureCollection()

```ts
function convertFeatureCollection(featureCollection: FeatureCollection): string;
```

Defined in: [index.ts:43](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L43)

Converts a GeoJSON FeatureCollection to WKT GeometryCollection

#### Parameters

| Parameter           | Type                | Description                             |
| ------------------- | ------------------- | --------------------------------------- |
| `featureCollection` | `FeatureCollection` | The FeatureCollection to convert to WKT |

#### Returns

`string`

The GeoJSON converted to well known representation

#### Export

---

### convertFeatureCollectionToWktCollection()

```ts
function convertFeatureCollectionToWktCollection<P>(
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

### convertFeatureToWK()

```ts
function convertFeatureToWK(geojson: Feature): string;
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

#### Export

---

### convertGeometryToWK()

```ts
function convertGeometryToWK(geojson: Geometry): string;
```

Defined in: [index.ts:22](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L22)

Converts GeoJSON Geometry to WKT

#### Parameters

| Parameter | Type       | Description                |
| --------- | ---------- | -------------------------- |
| `geojson` | `Geometry` | Geometry object to convert |

#### Returns

`string`

The GeoJSON converted to well known text representation

#### Export

---

### convertToWK()

```ts
function convertToWK(geojson: GeoJSON): string;
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

#### Export

---

### convertWkTo2DWk()

```ts
function convertWkTo2DWk(wkt: string): string;
```

Defined in: [index.ts:190](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L190)

Parse a Z WKT into a 2D WKT

#### Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `wkt`     | `string` | The Z WKT to convert to 2D WKT |

#### Returns

`string`

The Z WKT as 2D WKT

#### Export

---

### convertZGeojsonTo2D()

```ts
function convertZGeojsonTo2D(geojson: GeoJSON): GeoJSON;
```

Defined in: [index.ts:126](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L126)

Parse a Z WKT into a 2D GeoJSON Feature or Geometry

#### Parameters

| Parameter | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `geojson` | `GeoJSON` | The WKT to convert to GeoJSON |

#### Returns

`GeoJSON`

The WKT as 2D GeoJSON

#### Export

---

### parseFromWK()

```ts
function parseFromWK(
  item: string,
  asFeature?: boolean,
  properties?: GeoJsonProperties
): Geometry | Feature<Geometry, GeoJsonProperties>;
```

Defined in: [index.ts:101](https://github.com/alrico88/wkt-parser-helper/blob/master/src/index.ts#L101)

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

#### Export
