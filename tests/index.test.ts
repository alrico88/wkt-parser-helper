import { test, expect } from 'vitest';
import type {
  Feature,
  FeatureCollection,
  GeometryCollection,
  Polygon,
} from 'geojson';
import {
  featureCollectionToWkt,
  featureCollectionToWktList,
  geojsonToWkt,
  wkt3dTo2d,
  geojson3dTo2d,
  EMPTY_GEOMETRY_COLLECTION_WKT,
  wktToGeojson,
} from '../src';

const testFeature: Feature = {
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

const testPolygonWithZ: Polygon = {
  type: 'Polygon',
  coordinates: [
    [
      [-3.706512451171875, 40.420074462890625, 0],
      [-3.70513916015625, 40.420074462890625, 0],
      [-3.70513916015625, 40.42144775390625, 0],
      [-3.706512451171875, 40.42144775390625, 0],
      [-3.706512451171875, 40.420074462890625, 0],
    ],
  ],
};

const testFeatureWithZ: Feature = {
  type: 'Feature',
  geometry: testPolygonWithZ,
  properties: {},
};
const testFeatureCollectionWithZ: FeatureCollection = {
  type: 'FeatureCollection',
  features: [testFeatureWithZ],
};
const testGeometryCollectionWithZ: GeometryCollection = {
  type: 'GeometryCollection',
  geometries: [testPolygonWithZ],
};

const testFeatureWithProperties = Object.assign(testFeature, {
  properties: {
    test: 'Test',
  },
});

const testFeatureAsWkt =
  'POLYGON ((-3.706512451171875 40.420074462890625,-3.70513916015625 40.420074462890625,-3.70513916015625 40.42144775390625,-3.706512451171875 40.42144775390625,-3.706512451171875 40.420074462890625))';

const testFeatureCollection: FeatureCollection = {
  type: 'FeatureCollection',
  features: [testFeature, testFeature],
};

const testFeatureCollectionAsWkt =
  'GEOMETRYCOLLECTION(POLYGON ((-3.706512451171875 40.420074462890625,-3.70513916015625 40.420074462890625,-3.70513916015625 40.42144775390625,-3.706512451171875 40.42144775390625,-3.706512451171875 40.420074462890625)),POLYGON ((-3.706512451171875 40.420074462890625,-3.70513916015625 40.420074462890625,-3.70513916015625 40.42144775390625,-3.706512451171875 40.42144775390625,-3.706512451171875 40.420074462890625)))';

// TESTS

test('Same GeoJSON should always return same WKT', () => {
  expect(geojsonToWkt(testFeature)).toBe(testFeatureAsWkt);
});

test('Same WKT should always return same Geometry', () => {
  expect(wktToGeojson(testFeatureAsWkt)).toStrictEqual(testFeature.geometry);
});

test('Same WKT should always return same Feature, with desired properties embedded', () => {
  expect(
    wktToGeojson(testFeatureAsWkt, true, {
      test: 'Test',
    })
  ).toStrictEqual(testFeatureWithProperties);
});

test('Same GeoJSON FeatureCollection should always return same wkt GEOMETRYCOLLECTION', () => {
  expect(featureCollectionToWkt(testFeatureCollection)).toBe(
    testFeatureCollectionAsWkt
  );
});

test('Should convert GeoJSON FeatureCollection to an array of objects with WKT and properties', () => {
  const geojson: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [102.0, 0.5],
        },
        properties: {
          name: 'Sample Point',
          description: 'A point in the middle of nowhere',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [102.0, 0.0],
            [103.0, 1.0],
            [104.0, 0.0],
            [105.0, 1.0],
          ],
        },
        properties: {
          name: 'Sample LineString',
        },
      },
    ],
  };

  // Expected output
  const expected = [
    {
      wkt: 'POINT (102 0.5)',
      name: 'Sample Point',
      description: 'A point in the middle of nowhere',
    },
    {
      wkt: 'LINESTRING (102 0,103 1,104 0,105 1)',
      name: 'Sample LineString',
    },
  ];

  expect(featureCollectionToWktList(geojson)).toEqual(expected);
});

test('Support for converting and decoding shapes with Z coordinates', () => {
  expect(() => {
    return wktToGeojson(geojsonToWkt(testPolygonWithZ));
  }).not.toThrow();
});

test('Support for converting and decoding GEOJSON with Z coordinates to GEOJSON 2D -- POLYGON', () => {
  const item = geojson3dTo2d(testPolygonWithZ) as Polygon;

  expect(item.coordinates[0][0].length).toEqual(2);
  expect(item).not.toEqual(wktToGeojson(geojsonToWkt(testPolygonWithZ)));
});

test('Support for converting and decoding shapes with Z coordinates to 2D WKT -- POLYGON', () => {
  const json = wktToGeojson(
    wkt3dTo2d(geojsonToWkt(testPolygonWithZ))
  ) as Polygon;

  expect(json.coordinates[0][0].length).toEqual(2);
});

test('Support for converting and decoding GEOJSON with Z coordinates to GEOJSON 2D -- FEATURE', () => {
  const item = geojson3dTo2d(testFeatureWithZ) as Feature<Polygon>;

  expect(item.geometry.coordinates[0][0].length).toEqual(2);
  expect(item).not.toEqual(wktToGeojson(geojsonToWkt(testFeatureWithZ)));
});

test('Support for converting and decoding GEOJSON with Z coordinates to GEOJSON 2D -- FEATURE COLLECTION', () => {
  const item = geojson3dTo2d(
    testFeatureCollectionWithZ
  ) as FeatureCollection<Polygon>;

  expect(item.features[0].geometry.coordinates[0][0].length).toEqual(2);
  expect(item).not.toEqual(
    wktToGeojson(geojsonToWkt(testFeatureCollectionWithZ))
  );
});

test('Support for converting and decoding GEOJSON with Z coordinates to GEOJSON 2D -- GEOMETRY COLLECTION', () => {
  const item = geojson3dTo2d(
    testGeometryCollectionWithZ
  ) as GeometryCollection<Polygon>;

  expect(item.geometries[0].coordinates[0][0].length).toEqual(2);
  expect(item).not.toEqual(
    wktToGeojson(geojsonToWkt(testGeometryCollectionWithZ))
  );
});

test('Support for empty shapes', () => {
  expect(
    featureCollectionToWkt({ type: 'FeatureCollection', features: [] })
  ).toEqual(EMPTY_GEOMETRY_COLLECTION_WKT);
});

test('An empty GeometryCollection WKT should NOT return null', () => {
  expect(wktToGeojson(EMPTY_GEOMETRY_COLLECTION_WKT)).toEqual({
    type: 'GeometryCollection',
    geometries: [],
  });
});
