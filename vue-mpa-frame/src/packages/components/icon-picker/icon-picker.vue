<template>
  <div class="base-icon-picker" :style="{ width: this.width }">
    <el-input v-model="inputVal" type="text" :readonly="true" clearable>
      <el-popover
        v-model="visible"
        slot="prepend"
        placement="right"
        width="350"
        trigger="click"
        popper-class="base-icon-picker-popper"
      >
        <div class="icon-tab-outer">
          <!--其它的 icon 字体图-->
          <i
            class="font-icon"
            v-for="(item, index) in otherIcons"
            :key="`${index}-a`"
            :class="item"
            :style="{ 'font-size': size }"
            @click="choose(item, 'other-icon')"
          />
          <!--静态资源图-->
          <i
            class="font-icon"
            v-for="(item, index) in pngIcons"
            :key="`${index}-b`"
            @click="choose(item)"
          >
            <img :src="item" alt="" :style="{ width: size, height: size }" />
          </i>
          <!--iconfont symbol 图-->
          <base-svg-icon
            v-for="(item, index) in iconList"
            :key="index"
            :iconname="item"
            :size="size"
            @click="choose(item, 'symbol')"
          />
          <!--组件化 svg 图-->
          <i
            v-for="(item, index) in svgIconList"
            :key="`${index}-c`"
            @click="choose(item, 'svg')"
          >
            <component
              v-bind:is="item.component"
              :style="{ width: size, height: size }"
            />
          </i>
        </div>
        <el-button slot="reference">
          <template v-if="inputVal">
            <!--静态资源图-->
            <i
              class="font-icon"
              v-if="/\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/.test(inputVal)"
            >
              <img
                :src="inputVal"
                alt=""
                :style="{ width: size, height: size }"
              />
            </i>
            <!--其它的 icon 字体图-->
            <i
              class="font-icon"
              :style="{ 'font-size': size }"
              :class="svgStr2Str(inputVal, 'other-icon-')"
              v-else-if="
                otherIcons.indexOf(svgStr2Str(inputVal, 'other-icon-')) != -1
              "
            ></i>
            <!--组件化 svg 图-->
            <component
              v-else-if="inputVal.includes('svg-')"
              v-bind:is="findSvg(svgStr2Str(inputVal, 'svg-'))"
              :style="{ width: size, height: size }"
            ></component>
            <!--iconfont symbol 图-->
            <base-svg-icon
              :iconname="svgStr2Str(inputVal, 'symbol-')"
              :size="size"
              v-else
            />
          </template>
          <span v-else>
            <span class="icon-placeolder">请选择</span>
          </span>
        </el-button>
      </el-popover>
      <i
        slot="suffix"
        class="el-input__icon el-icon-circle-close clear-icon"
        @click="onClear"
      ></i>
    </el-input>
  </div>
</template>
<script>
import _find from 'lodash/find';
import _get from 'lodash/get';
/**
 * @desc 图标选择器
 * @example
 * 外部加载 svg 图
 * import icons from '@/plugins/icons.js';
 * <base-icon-picker ref="myIconPicker"></base-icon-picker>
 * this.$nextTick(() => {
 *  this.$refs.myIconPicker.addSvg(icons);
 * });
 */
export default {
  name: 'BaseIconPicker',
  model: {
    prop: 'value',
    event: 'iconVal'
  },
  props: {
    width: {
      type: String
    },
    value: [String, Object],
    iconList: {
      type: Array,
      default() {
        return [];
      }
    },
    // icon 图表的尺寸
    size: {
      type: String,
      default: '16px'
    }
  },
  data() {
    return {
      inputVal: this.value,
      visible: false,
      svgIconList: [],
      otherIcons: [], // 其它字体图 比如：element icon
      pngIcons: [] // 静态资源图，比如：/static/images/1.png
    };
  },
  watch: {
    value(val, oldVal) {
      this.inputVal = val;
    }
  },
  created() {},
  methods: {
    inputChange() {
      // console.log(this);
      // this.$emit('input', this.$event.target.value);
    },
    choose(item, type) {
      if (type === 'svg') {
        item = `svg-${item.name}`;
      } else {
        item = type ? `${type}-${item}` : item;
      }
      this.$emit('iconVal', item);
      this.visible = false;
    },
    /**
     * @desc 去除 svg- 字符
     */
    svgStr2Str(val, replaceText) {
      return val.replace(replaceText, '');
    },
    /**
     * @desc 名称获取 svg 对象
     */
    findSvg(val) {
      const oSvg = _find(this.svgIconList, o => o.name === val);
      return _get(oSvg, 'component');
    },
    /**
     * @desc 清除已选择的图标
     */
    onClear() {
      if (this.inputVal.length > 0) {
        this.$emit('iconVal', '');
      }
    },
    /**
     * @desc 添加 svg组件 icon图
     */
    addSvgComponent(icons = []) {
      this.svgIconList = icons;
      /* for (let i = 0, len = icons.length; i < len; i++) {
        if (!_find(this.svgIconList, o => o.name === icons[i].name)) {
          this.svgIconList.push(icons[i]);
        }
      } */
    },
    /**
     * @desc 添加 icon图表，比如：element icon
     */
    addIcons(icons = []) {
      this.otherIcons = icons;
    },
    /**
     * @desc 添加 静态资源图片
     */
    addPngIcons(icons = []) {
      this.pngIcons = icons;
    }
  }
};
</script>
