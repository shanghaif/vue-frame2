/**
 * @desc 下拉搜索 table 不分页组件
 * https://juejin.cn/post/6844903710972182536
 */
import baseSelect from '../select/index.js';
import _isEqual from 'lodash/isEqual';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _isFunction from 'lodash/isFunction';
import _includes from 'lodash/includes';
import _assign from 'lodash/assign';
import _forEach from 'lodash/forEach';
import _has from 'lodash/has';
import _set from 'lodash/set';
import _omit from 'lodash/omit';
import _debounce from 'lodash/debounce';

const BaseSelectInputTable = {
  name: 'BaseSelectInputTable',
  extends: _assign({}, baseSelect, { watch: {} }),
  props: {
    props: {
      type: Object,
      default() {
        return {}; // defaultPageParams
      }
    },
    width: {
      type: String
    },
    // 一页分多少条
    pageSize: {
      type: Number,
      default: 10
    },
    // 是否本地搜索
    isLocalSearch: {
      type: Boolean,
      default: false
    },
    // 是否需要分页
    isPage: {
      type: Boolean,
      default: false
    },
    // 第一次载入时是否自动刷新列表数据（第一页的数据）
    isReloadGrid: {
      type: Boolean,
      default: true
    },
    // 输入内容改变后多少时间触发请求-毫秒
    delay: {
      type: Number,
      default: 300
    },
    // 过滤返回数据（该函数带一个参数'data'用来指向源数据）
    loadFilter: {
      type: Function
    }
  },
  computed: {
    elOptions() {
      const elOptions = [];
      /* if (this.vOptions) {
        this.vOptions = this.options;
      } */
      if (_isNil(this.vOptions)) {
        return;
      }
      console.log(this.vOptions);
      for (let i = 0; i < this.vOptions.length; i++) {
        const option = this.vOptions[i];
        elOptions.push(
          this.$createElement('el-option', {
            props: {
              key: option[this.valueField],
              label: option[this.displayField],
              value: option[this.valueField],
              disabled: option.disabled
            }
          })
        );
      }
      return elOptions;
    }
  },
  watch: {
    value(value, oldValue) {
      if (!_isEqual(value, oldValue) && !_isEqual(this.vValue, value)) {
        this.vValue = value;
        this._changeEvent(this.vValue);
        this._selectChangeEvent(this.vValue);
      }
    }
  },
  directives: {
    scroll: {
      bind(el, binding) {
        // 获取滚动页面DOM
        const SCROLL_DOM = el.querySelector(
          '.base-select-input-table-dropdown .el-select-dropdown__wrap'
        );
        // console.log('bbbbbbbbbbb', SCROLL_DOM);
        let scrollPosition = 0;
        SCROLL_DOM.addEventListener('scroll', function() {
          // 当前的滚动位置 减去  上一次的滚动位置
          // 如果为true则代表向上滚动，false代表向下滚动
          const flagToDirection = this.scrollTop - scrollPosition > 0;
          // 记录当前的滚动位置
          scrollPosition = this.scrollTop;
          const LIMIT_BOTTOM = 100;
          // 记录滚动位置距离底部的位置
          const scrollBottom =
            this.scrollHeight - (this.scrollTop + this.clientHeight) <
            LIMIT_BOTTOM;
          // 如果已达到指定位置则触发
          if (scrollBottom) {
            // 将滚动行为告诉组件
            binding.value(flagToDirection);
          }
          // 如果是向上滚动  并且距离顶部只有100px
          if (!flagToDirection && this.scrollTop < LIMIT_BOTTOM) {
            binding.value(flagToDirection);
            // console.log('如果是向上滚动  并且距离顶部只有100px');
          }
          // console.log(flagToDirection ? '滚动方向：下' : '滚动方向：上');
        });
      }
    }
  },
  data() {
    this.defaultPageParams = {
      pageNum: 'pageNum',
      pageSize: 'pageSize',
      results: 'results',
      totalPage: 'totalPage',
      totalRecord: 'totalRecord'
    }; // 默认的分页参数
    this.pageParams = {
      pageNum: 1, // 当前第几页
      pageSize: this.pageSize,
      results: [],
      totalPage: 1,
      totalRecord: 10
    }; // 分页参数
    this.vQueryParams = {};
    this.totalPage = 0; // 总页数
    this.current = 1; // 当前是第几页
    this.query = ''; // 输入框中的搜索内容
    return {
      vOptions: [],
      list: [],
      loading: false
    };
  },
  created() {
    // 覆盖 分页 参数
    _forEach(this.props, (value, key) => {
      if (_has(this.defaultPageParams, key)) {
        _set(this.defaultPageParams, key, value);
      }
      if (_has(this.pageParams, key)) {
        _set(this.pageParams, value, _get(this.pageParams, key));
        delete this.pageParams[key];
      }
    });
    this.debouncedLoadListData = _debounce(this.loadListData, this.delay); // 节流防止抖动
  },
  mounted() {
    if (this.isLocalSearch) {
      this.vOptions = this.options; // 本地搜索
    }
  },
  methods: {
    /**
     * @desc 获取所有数据
     * @returns Array
     */
    getList() {
      return this.list;
    },
    /**
     * @desc 获取远程服务器数据的操作
     * @param {Function} callBack - 回调函数
     * @method
     */
    loadListData(callBack) {
      if (_isEmpty(this.api) || _isNil(this.$api)) {
        return;
      }
      console.log(
        '...loadListData ',
        _assign({}, this.vQueryParams, this.pageParams)
      );
      this.$api[this.api]({
        params: _assign({}, this.vQueryParams, this.pageParams)
      })
        .then(resData => {
          if (!_isNil(this.loadFilter)) {
            resData = this.loadFilter(resData.data);
          }
          this.totalPage = _get(resData, this.defaultPageParams.totalPage, 0); // 总页数
          this.current = parseInt(
            _get(resData, this.defaultPageParams.pageNum, 0)
          ); // 当前第几页
          const list = _map(
            _get(resData, this.defaultPageParams.results, []),
            o => ({
              [this.valueField]: `${_get(o, this.valueField)}`,
              [this.displayField]: `${_get(o, this.displayField)}`
            })
          );
          this.list.push(...list);
          if (!_isNil(callBack) && _isFunction(callBack)) {
            callBack(this.list);
          }
        })
        .catch(error => {
          console.error(error);
          if (!_isNil(callBack) && _isFunction(callBack)) {
            callBack([]);
          }
        });
    },
    /**
     * @desc 设置查询参数
     * @param {Object} params - 查询对象参数
     */
    setQueryParams(params = {}) {
      this.vQueryParams = _assign({}, this.queryParams, params);
    },
    /**
     * @desc 在输入值发生变化时调用，参数为当前输入值
     * @param {String} query - 搜索的值
     */
    remoteMethod(query) {
      /* console.log(
        '在输入值发生变化时调用，参数为当前输入值',
        query,
        this.totalPage
      ); */
      if (query !== '') {
        this.loading = true;
        if (!this.isLocalSearch) {
          this.list = [];
          _set(this.pageParams, this.defaultPageParams.pageNum, 1); // 输入值变化将当前页重置到第一页
          this.$nextTick(() => {
            this.setQueryParams({ [this.displayField]: query });
            this.debouncedLoadListData(resData => {
              this.loading = false;
              this.vOptions = resData;
            });
          }); // 远程搜索
        } else {
          setTimeout(() => {
            this.loading = false;
            this.vOptions = this.options.filter(item => {
              console.log(
                query,
                _get(item, this.displayField),
                _includes(_get(item, this.displayField), query)
              );
              return _includes(_get(item, this.displayField), query);
            });
          }, this.delay);
        }
      } else {
        this.vOptions = [];
      }
      this.query = query;
    },
    /**
     * @desc 设置上一页
     */
    setLastPage() {
      _set(this.pageParams, this.defaultPageParams.pageNum, this.current - 1);
    },
    /**
     * @desc 设置下一页
     */
    setNextPage() {
      _set(this.pageParams, this.defaultPageParams.pageNum, this.current + 1);
    },
    /**
     * @desc 处理滚动行为
     * @param {Boolean} param - 滚动的方向 true代表向下滚动、false代表向上滚动
     */
    handleScroll(param) {
      /* console.log(
        '...处理滚动行为...',
        param,
        this.loading,
        param && !this.loading
      ); */
      if (this.totalPage === this.current) {
        return; // 已经滚动到最后一页
      }
      if (param && !this.loading) {
        this.loading = true;
        // 请求下一页的数据
        this.setNextPage();
        this.loadListData(resData => {
          this.loading = false;
          this.$nextTick(() => {
            this.vOptions = resData;
          });
        });
      }
      if (!param && !this.loading) {
        // 请求上一页的数据
        console.log('请求上一页的数据');
      }
    },
    /**
     * @desc 当 input 获得焦点时触发
     * @event FastComboBox#_focusEvent
     * @param {*} event
     */
    _focusEvent(event) {
      if (_isEmpty(this.vValue) && !_isEmpty(this.vOptions)) {
        this.vOptions = [];
      }
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
     * @desc 多选模式下移除tag时触发
     * @event FastComboBox#_removeTag
     * @param {*} value
     */
    _removeTag(value) {
      if (_isEmpty(this.vValue)) {
        this.vOptions = []; // 如果全部选中的属性移除了，就清空下拉面板的搜索项
      }
      if (
        _isEqual(_isNil(this.listeners), false) &&
        _has(this.listeners, 'remove-tag')
      ) {
        this.listeners['remove-tag'](value);
        return;
      }
      this.$emit('remove-tag', value);
    }
  },
  render(h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h();
    }
    const style = _assign(
      { width: this.width },
      _get(this.$props, 'ctStyle', {})
    ); // { ..._get(this.$props, 'ctStyle', {}) }
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
        ref: `${this._uid}-el-select-input-table-ref`,
        class: _assign(
          { 'base-select-input-table': true },
          _get(this.$props, 'ctCls', {})
        ),
        style,
        attrs: {
          id: this.$attrs.id
        },
        props: _assign(
          {
            filterable: true,
            remote: true,
            'reserve-keyword': true,
            'remote-method': this.remoteMethod,
            popperClass: _has(this.$attrs, 'popperClass')
              ? `base-select-input-table-dropdown ${this.$attrs.popperClass}`
              : 'base-select-input-table-dropdown',
            loading:
              _isEmpty(this.vOptions) || this.isLocalSearch
                ? this.loading
                : false
          },
          _omit(this.$attrs, ['id', 'popperClass']),
          {
            value: this.vValue
          }
        ), // { ...this.$attrs, value: this.vValue },
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
        },
        nativeOn: {
          click: () => {
            console.log('...click...', this.vValue, this.query);
          }
        },
        directives: [
          {
            name: 'scroll',
            value: this.isLocalSearch ? function() {} : this.handleScroll
          }
        ]
      },
      [
        this.elOptions,
        this.loading && !this.isLocalSearch
          ? h('i', { slot: 'prefix', class: { 'el-icon-loading': true } }, [])
          : h(), // 加载中的 icon
        this.slotElement
      ]
    );
  }
};

export default BaseSelectInputTable;
