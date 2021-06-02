const toPixel = function(arr) {
  return new AMap.Pixel(arr[0], arr[1]);
};

const toSize = function(arr) {
  return new AMap.Size(arr[0], arr[1]);
};

const pixelTo = function(pixel) {
  if (Array.isArray(pixel)) return pixel;
  return [pixel.getX(), pixel.getY()];
};

const toLngLat = function(arr) {
  return new AMap.LngLat(arr[0], arr[1]);
};

const lngLatTo = function(lngLat) {
  if (!lngLat) return;
  if (Array.isArray(lngLat)) return lngLat.slice();
  return [lngLat.getLng(), lngLat.getLat()];
};

/**
 * @param arrs 二重数组 southWest, northEast
 */
const toBounds = function(arrs) {
  return new AMap.Bounds(toLngLat(arrs[0]), toLngLat(arrs[1]));
};

const commonConvertMap = {
  position: toLngLat,
  offset: toPixel,
  bounds: toBounds,
  LngLat: toLngLat,
  Pixel: toPixel,
  Size: toSize,
  Bounds: toBounds
};
const isObj = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object';
};

export {
  toPixel,
  toSize,
  pixelTo,
  toLngLat,
  lngLatTo,
  toBounds,
  commonConvertMap,
  isObj
};
