import { upperCamelCase } from '../utils/upper-camel-case.js';
import VueAMap, { lazyAMapApiLoaderInstance } from '../index.js';
import CONSTANTS from '../utils/constant.js';
import { commonConvertMap } from '../utils/convert-helper.js';
import eventHelper from '../utils/event-helper.js';
import _has from 'lodash/hasIn';

export default {
  data() {
    return {
      unwatchFns: []
    };
  },
  mounted() {
    if (lazyAMapApiLoaderInstance) {
      lazyAMapApiLoaderInstance.load().then(() => {
        if (this.__contextReady) {
          // eslint-disable-next-line no-useless-call
          this.__contextReady.call(this, this.convertProps());
        }
      });
    }
    this.$amap = this.$amap || this.$parent.$amap;
    if (this.$amap) {
      this.register();
    } else {
      this.$on(CONSTANTS.AMAP_READY_EVENT, map => {
        this.$amap = map;
        this.register();
      });
    }
  },
  destroyed() {
    this.unregisterEvents();
    if (!this.$amapComponent) return;

    this.$amapComponent.setMap && this.$amapComponent.setMap(null);
    this.$amapComponent.close && this.$amapComponent.close();
    this.$amapComponent.editor && this.$amapComponent.editor.close();
    this.unwatchFns.forEach(item => item());
    this.unwatchFns = [];
  },
  methods: {
    /**
     * @desc 转换props
     * @returns Object
     */
    convertProps() {
      const props = {};
      if (this.$amap) {
        props.map = this.$amap; // 添加地图对象到组件内
      }
      const {
        $options: { propsData = {} },
        propsRedirect
      } = this;
      const obj = Object.keys(propsData).reduce((res, _key) => {
        let key = _key;
        const propsValue = this.convertSignalProp(key, propsData[key]);
        if (propsValue === undefined) {
          return res;
        }
        if (propsRedirect && propsRedirect[_key]) {
          key = propsRedirect[key];
        }
        props[key] = propsValue;
        return res;
      }, props);
      return obj;
    },
    convertSignalProp(key, sourceData) {
      let converter = '';
      let type = '';
      if (this.amapTagName) {
        try {
          const name = upperCamelCase(this.amapTagName).replace(/^El/, '');
          const componentConfig = VueAMap[name] || '';

          type = componentConfig.props[key].$type;
          converter = commonConvertMap[type];
        } catch (e) {}
      }

      if (type && converter) {
        return converter(sourceData);
      } else if (this.converters && this.converters[key]) {
        return this.converters[key].call(this, sourceData);
      } else {
        const convertFn = commonConvertMap[key];
        if (convertFn) return convertFn(sourceData);
        return sourceData;
      }
    },
    /**
     * @desc 获取地图示例
     * @returns Object
     */
    getInstance() {
      return this.$amapComponent;
    },
    register() {
      const res =
        this.__initComponent && this.__initComponent(this.convertProps());
      if (res && res.then) {
        res.then(instance => this.registerRest(instance)); // promise
      } else {
        this.registerRest(res);
      }
    },
    registerRest(instance) {
      if (!this.$amapComponent && instance) {
        this.$amapComponent = instance;
      }
      this.registerEvents();
      this.initProps();
      this.setPropWatchers();
      this.registerToManager();
      if (this.events && this.events.init) {
        this.events.init(
          this.$amapComponent,
          this.$amap,
          this.amapManager || this.$parent.amapManager
        );
      }
    },
    registerEvents() {
      this.setEditorEvents && this.setEditorEvents();
      if (!this.$options.propsData) return;
      // 注册事件
      if (this.$options.propsData.events && !_isNil(this.$amapComponent)) {
        for (const eventName in this.events) {
          eventHelper.addListener(
            this.$amapComponent,
            eventName,
            this.events[eventName]
          );
        }
      }

      if (this.$options.propsData.onceEvents && !_isNil(this.$amapComponent)) {
        for (const eventName in this.onceEvents) {
          eventHelper.addListenerOnce(
            this.$amapComponent,
            eventName,
            this.onceEvents[eventName]
          );
        }
      }
    },
    initProps() {
      const props = ['editable', 'visible'];

      props.forEach(propStr => {
        if (this[propStr] !== undefined) {
          const handleFun = this.getHandlerFun(propStr);
          handleFun &&
            handleFun.call(
              this.$amapComponent,
              this.convertSignalProp(propStr, this[propStr])
            );
        }
      });

      // this.printReactiveProp();
    },
    setPropWatchers() {
      const {
        propsRedirect,
        $options: { propsData = {} }
      } = this;
      Object.keys(propsData).forEach(prop => {
        let handleProp = prop;
        if (propsRedirect && propsRedirect[prop]) {
          handleProp = propsRedirect[prop];
        }
        const handleFun = this.getHandlerFun(handleProp);
        if (!handleFun && prop !== 'events') return;
        // watch props
        const unwatch = this.$watch(prop, nv => {
          if (prop === 'events') {
            this.unregisterEvents();
            this.registerEvents();
            return;
          }
          if (
            handleFun &&
            !_isNil(this.$amapComponent) &&
            handleFun === this.$amapComponent.setOptions
          ) {
            return handleFun.call(this.$amapComponent, {
              [handleProp]: this.convertSignalProp(prop, nv)
            });
          }

          handleFun.call(
            this.$amapComponent || this,
            this.convertSignalProp(prop, nv)
          );
        });

        // collect watchers for destroyed
        this.unwatchFns.push(unwatch);
      });
    },
    registerToManager() {
      const manager = this.amapManager || this.$parent.amapManager;
      if (manager && this.vid !== undefined) {
        manager.setComponent(this.vid, this.$amapComponent);
      }
    },
    unregisterEvents() {
      eventHelper.clearListeners(this.$amapComponent);
    },
    getHandlerFun(prop) {
      if (this.handlers && this.handlers[prop]) {
        return this.handlers[prop];
      }
      if (_has(this.$amapComponent, `set${upperCamelCase(prop)}`)) {
        return this.$amapComponent[`set${upperCamelCase(prop)}`];
      }
      if (
        !_has(this.$amapComponent, `set${upperCamelCase(prop)}`) &&
        _has(this.$amapComponent, 'setOptions')
      ) {
        return this.$amapComponent.setOptions;
      }
      /* return (
        this.$amapComponent[`set${upperCamelCase(prop)}`] ||
        this.$amapComponent.setOptions
      ); */
    }
  }
};
