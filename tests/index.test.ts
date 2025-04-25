import { test, expect } from 'vitest';
import type { Feature, FeatureCollection } from 'geojson';
import {
  convertFeatureCollection,
  convertFeatureCollectionToWktCollection,
  convertToWK,
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
    })
  ).toStrictEqual(testFeatureWithProperties);
});

test('Same GeoJSON FeatureCollection should always return same wkt GEOMETRYCOLLECTION', () => {
  expect(convertFeatureCollection(testFeatureCollection)).toBe(
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

  expect(convertFeatureCollectionToWktCollection(geojson)).toEqual(expected);
});
