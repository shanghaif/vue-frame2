/**
 * @desc 事件帮助类
 */
class EventHelper {
  constructor() {
    /**
     * listener has表
     * {
     *  instance: {
     *              eventName: [...handlers]
     *            }
     * }
     */
    this._listener = new Map();
  }

  addListener(instance, eventName, handler, context) {
    if (!AMap.event) throw new Error('please wait for Map API load');
    const listener = AMap.event.addListener(
      instance,
      eventName,
      handler,
      context
    );
    if (!this._listener.get(instance)) this._listener.set(instance, {});
    const listenerMap = this._listener.get(instance);
    if (!listenerMap[eventName]) listenerMap[eventName] = [];
    listenerMap[eventName].push(listener);
  }

  removeListener(instance, eventName, handler) {
    if (!AMap.event) throw new Error('please wait for Map API load');
    if (
      !this._listener.get(instance) ||
      !this._listener.get(instance)[eventName]
    )
      return;
    const listenerArr = this._listener.get(instance)[eventName];
    if (handler) {
      const Lindex = listenerArr.indexOf(handler);
      AMap.event.removeListener(listenerArr[Lindex]);
      listenerArr.splice(Lindex, 1);
    } else {
      listenerArr.forEach(listener => {
        AMap.event.removeListener(listener);
      });
      this._listener.get(instance)[eventName] = [];
    }
  }

  addListenerOnce(instance, eventName, handler, context) {
    return AMap.event.addListenerOnce(instance, eventName, handler, context);
  }

  trigger(instance, eventName, args) {
    return AMap.event.trigger(instance, eventName, args);
  }

  clearListeners(instance) {
    const listeners = this._listener.get(instance);
    if (!listeners) return;
    Object.keys(listeners).map(eventName => {
      this.removeListener(instance, eventName);
    });
  }
}
let eventHelper = null;
eventHelper = eventHelper || new EventHelper();

export default eventHelper;
