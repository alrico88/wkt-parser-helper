import { test, expect } from 'vitest';
import type { Feature, FeatureCollection, Polygon } from 'geojson';
import {
  convertFeatureCollection,
  convertFeatureCollectionToWktCollection,
  convertToWK,
  convertWkTo2DWk,
  convertZGeojsonTo2D,
  parseFromWK,
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
  expect(convertToWK(testFeature)).toBe(testFeatureAsWkt);
});

test('Same WKT should always return same Geometry', () => {
  expect(parseFromWK(testFeatureAsWkt)).toStrictEqual(testFeature.geometry);
});

test('Same WKT should always return same Feature, with desired properties embedded', () => {
  expect(
    parseFromWK(testFeatureAsWkt, true, {
      test: 'Test',
    }),
  ).toStrictEqual(testFeatureWithProperties);
});

test('Same GeoJSON FeatureCollection should always return same wkt GEOMETRYCOLLECTION', () => {
  expect(convertFeatureCollection(testFeatureCollection)).toBe(
    testFeatureCollectionAsWkt,
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

  expect(convertFeatureCollectionToWktCollection(geojson)).toEqual(expected);
});

test('Support for converting and decoding shapes with Z coordinates', () => {
  expect(() => {
    return parseFromWK(convertToWK(testPolygonWithZ));
  }).not.toThrow();
});

test('Support for converting and decoding GEOJSON with Z coordinates to GEOJSON 2D', () => {
  const item = convertZGeojsonTo2D(testPolygonWithZ) as Polygon;

  expect(item.coordinates[0][0].length).toEqual(2);
  expect(item).not.toEqual(parseFromWK(convertToWK(testPolygonWithZ)));
});

test('Support for converting and decoding shapes with Z coordinates to 2D WKT', () => {
  const json = parseFromWK(
    convertWkTo2DWk(convertToWK(testPolygonWithZ)),
  ) as Polygon;

  expect(json.coordinates[0][0].length).toEqual(2);
});
