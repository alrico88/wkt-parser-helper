import {Feature, FeatureCollection} from 'geojson';
import {convertFeatureCollection, convertToWK, parseFromWK} from '../src';

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

const testFeatureAsWkt
  = 'POLYGON ((-3.706512451171875 40.420074462890625, -3.70513916015625 40.420074462890625, -3.70513916015625 40.42144775390625, -3.706512451171875 40.42144775390625, -3.706512451171875 40.420074462890625))';

const testFeatureCollection: FeatureCollection = {
  type: 'FeatureCollection',
  features: [testFeature, testFeature],
};

const testFeatireCollectionAsWkt
  = 'GEOMETRYCOLLECTION(POLYGON ((-3.706512451171875 40.420074462890625, -3.70513916015625 40.420074462890625, -3.70513916015625 40.42144775390625, -3.706512451171875 40.42144775390625, -3.706512451171875 40.420074462890625)),POLYGON ((-3.706512451171875 40.420074462890625, -3.70513916015625 40.420074462890625, -3.70513916015625 40.42144775390625, -3.706512451171875 40.42144775390625, -3.706512451171875 40.420074462890625)))';

// TESTS

test('Same GeoJSON should always return same WKT', () => {
  expect(convertToWK(testFeature)).toBe(testFeatureAsWkt);
});

test('Same WKT should always return same Geometry', () => {
  expect(parseFromWK(testFeatureAsWkt)).toStrictEqual(testFeature.geometry);
});

test('Same WKT should always return same Feature, with desired properties embedded', () => {
  expect(parseFromWK(testFeatureAsWkt, true, {
      test: 'Test',
    })).toStrictEqual(testFeatureWithProperties);
});

test('Same GeoJSON FeatureCollection should always return same wkt GEOMETRYCOLLECTION', () => {
  expect(convertFeatureCollection(testFeatureCollection)).toBe(testFeatireCollectionAsWkt);
});
