/**
 * @desc 地图管理类
 */
export default class AMapManager {
  constructor() {
    this._componentMap = new Map();
    this._map = null;
  }

  setMap(map) {
    this._map = map;
  }

  /**
   * @desc 返回地图实例
   * @returns Object
   */
  getMap() {
    return this._map;
  }

  setComponent(id, component) {
    this._componentMap.set(id, component);
  }

  getComponent(id) {
    return this._componentMap.get(id);
  }

  getChildInstance(id) {
    return this.getComponent(id);
  }

  removeComponent(id) {
    this._componentMap.delete(id);
  }
}
