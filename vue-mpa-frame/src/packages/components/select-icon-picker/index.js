/**
 * @desc 下拉图标选择器-只能单选
 */
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _set from 'lodash/set';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import _assign from 'lodash/assign';
import _has from 'lodash/has';
import _isString from 'lodash/isString';

const BaseSelectIconPicker = {
  name: 'BaseSelectIconPicker',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'selectChange'
  },
  props: {
    // v-model
    value: {
      type: String,
      required: true
    },
    // 数据
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    // svg component 静态数据
    svgIconsOptions: {
      type: Array,
      default() {
        return [];
      }
    },
    width: {
      type: String,
      default: 'auto'
    },
    ctStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    ctCls: {
      type: Object,
      default() {
        return {};
      }
    },
    displayField: {
      type: String,
      default: 'name'
    },
    valueField: {
      type: String,
      default: 'id'
    },
    isRender: {
      type: Boolean,
      default: true
    },
    isDisplay: {
      type: Boolean,
      default: true
    },
    listeners: {
      type: Object,
      default: () => {}
    },
    // 图标的尺寸
    svgSize: {
      type: String,
      default: '16px'
    }
  },
  data() {
    this.vValue = this.value;
    return {
      vOptions: this.options,
      iconPicture: this.value
    };
  },
  computed: {
    elOptions() {
      const elOptions = [];
      const h = this.$createElement;
      if (this.options) {
        this.vOptions = this.options;
      }
      if (_isNil(this.vOptions)) {
        return;
      }
      for (let i = 0; i < this.vOptions.length; i++) {
        let option = this.vOptions[i];
        if (_isString(option)) {
          option = {
            [this.displayField]: option,
            [this.valueField]: `symbol-${option}`
          };
        }
        elOptions.push(
          this.$createElement(
            'el-option',
            {
              props: {
                key: option[this.valueField],
                label: option[this.displayField],
                value: option[this.valueField],
                disabled: option.disabled
              }
            },
            [
              this.getIconNode(_get(option, this.valueField)),
              h('span', { style: 'float: right' }, [
                _get(option, this.displayField)
              ])
            ]
          )
        );
      }
      for (let i = 0; i < this.svgIconsOptions.length; i++) {
        const option = {
          [this.displayField]: this.svgIconsOptions[i].name,
          [this.valueField]: `svg-${this.svgIconsOptions[i].name}`
        };
        elOptions.push(
          this.$createElement(
            'el-option',
            {
              props: {
                key: option[this.valueField],
                label: option[this.displayField],
                value: option[this.valueField],
                disabled: option.disabled
              }
            },
            [
              this.getIconNode(_get(option, this.valueField)),
              h('span', { style: 'float: right' }, [
                _get(option, this.displayField)
              ])
            ]
          )
        );
      }
      return elOptions;
    },
    slotElement() {
      return this.$createElement('template', { slot: 'prefix' }, [
        this.getIconNode(this.iconPicture)
      ]);
    }
  },
  watch: {
    value(value, oldValue) {
      if (!_isEqual(value, oldValue) && !_isEqual(this.vValue, value)) {
        this.vValue = value;
        this.iconPicture = this.vValue;
        this._changeEvent(this.vValue);
        this._selectChangeEvent(this.vValue);
      }
    }
  },
  methods: {
    /**
     * @desc 选中值发生变化时触发
     * @event FastComboBox#_changeEvent
     * @param {Array} value - 选中项
     */
    _changeEvent(value) {
      const v = value;
      this.iconPicture = value;
      if (
        _isEqual(_isNil(this.listeners), false) &&
        _has(this.listeners, 'change')
      ) {
        this.listeners.change(v);
        return;
      }
      this.$emit('change', v);
    },
    /**
     * @desc 下拉框出现/隐藏时触发
     * @event FastComboBox#_visibleChangeEvent
     * @param {boolean} value
     */
    _visibleChangeEvent(value) {
      if (
        _isEqual(_isNil(this.listeners), false) &&
        _has(this.listeners, 'visible-change')
      ) {
        this.listeners['visible-change'](value);
        return;
      }
      this.$emit('visible-change', value);
    },
    /**
     * @desc 多选模式下移除tag时触发
     * @event FastComboBox#_removeTag
     * @param {*} value
     */
    _removeTag(value) {
      if (
        _isEqual(_isNil(this.listeners), false) &&
        _has(this.listeners, 'remove-tag')
      ) {
        this.listeners['remove-tag'](value);
        return;
      }
      this.$emit('remove-tag', value);
    },
    /**
     * @desc 可清空的单选模式下用户点击清空按钮时触发
     * @event FastComboBox#_clearEvent
     */
    _clearEvent() {
      if (
        _isEqual(_isNil(this.listeners), false) &&
        _has(this.listeners, 'clear')
      ) {
        this.listeners.clear();
        return;
      }
      this.$emit('clear');
    },
    /**
     * @desc 当 input 失去焦点时触发
     * @event FastComboBox#_blurEvent
     * @param {*} event
     */
    _blurEvent(event) {
      if (
        _isEqual(_isNil(this.listeners), false) &&
        _has(this.listeners, 'blur')
      ) {
        this.listeners.blur(event);
        return;
      }
      this.$emit('blur', event);
    },
    /**
     * @desc 当 input 获得焦点时触发
     * @event FastComboBox#_focusEvent
     * @param {*} event
     */
    _focusEvent(event) {
      if (
        _isEqual(_isNil(this.listeners), false) &&
        _has(this.listeners, 'focus')
      ) {
        this.listeners.focus(event);
        return;
      }
      this.$emit('focus', event);
    },
    /**
     * @desc 下拉选择项发生改变时
     * @event FastInput#_selectChangeEvent
     * @param {Array} value - 选中项
     */
    _selectChangeEvent(value) {
      const v = value;
      if (
        _isEqual(_isNil(this.listeners), false) &&
        _has(this.listeners, 'selectChange')
      ) {
        this.listeners.selectChange(v);
        return;
      }
      // v-model
      this.$emit('selectChange', v);
    },
    /**
     * @desc 手动执行刷新数据操作
     * @method
     * @param {Object} params - 查询条件
     */
    reload(params = {}) {
      if (!_isEmpty(this.api)) {
        _assign(this.vQueryParams, params);
        this._fetchList();
      }
    },
    /**
     * @desc iconUrl->VNode
     */
    getIconNode(iconUrl) {
      if (_includes(iconUrl, 'svg-')) {
        // svg图
        const curUrl = iconUrl.replace('svg-', '');
        const svgObj = _find(this.svgIconsOptions, o => o.name === curUrl);
        if (!_isNil(svgObj)) {
          iconUrl = this.$createElement(_get(svgObj, 'component', 'span'), {
            style: {
              width: this.svgSize,
              height: this.svgSize,
              marginRight: '5px'
            }
          });
        } else {
          // iconUrl = this.$createElement('i', {}, []);
        }
      } else if (/\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/.test(iconUrl)) {
        // 静态资源图
        iconUrl = this.$createElement('img', {
          style: { marginRight: '5px' },
          attrs: { src: iconUrl, width: this.svgSize, height: this.svgSize }
        });
      } else if (iconUrl.indexOf('symbol-') !== -1) {
        // symbol 图
        iconUrl = this.$createElement(
          'base-svg-icon',
          {
            style: { marginRight: '5px' },
            props: {
              size: this.svgSize,
              iconname: iconUrl.replace('symbol-', '')
            }
          },
          []
        );
      } else {
        iconUrl = this.$createElement('i', { class: iconUrl });
      }
      return iconUrl;
    }
  },
  render(h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h();
    }
    const style = _assign({}, _get(this.$props, 'ctStyle', {})); // { ..._get(this.$props, 'ctStyle', {}) }
    if (this.width !== 'auto') {
      style.width = this.width;
    }
    // v-show
    if (_isEqual(this.isDisplay, false)) {
      _set(style, 'display', 'none');
    }
    return h(
      'el-select',
      {
        ref: `${this._uid}-el-select-ref`,
        class: _assign({ 'base-select': true }, _get(this.$props, 'ctCls', {})),
        style,
        attrs: {
          id: this.$attrs.id
        },
        props: _assign({}, this.$attrs, {
          value: this.vValue,
          multiple: false
        }), // { ...this.$attrs, value: this.vValue },
        on: {
          change: this._changeEvent,
          'visible-change': this._visibleChangeEvent,
          'remove-tag': this._removeTag,
          clear: this._clearEvent,
          blur: this._blurEvent,
          focus: this._focusEvent,
          input: val => {
            // v-model
            this.vValue = val;
            this._selectChangeEvent(this.vValue);
          }
        }
      },
      [this.elOptions, this.slotElement]
    );
  }
};
export default BaseSelectIconPicker;
