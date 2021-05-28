<template>
  <div class="base-time-axios_box" ref="timeAxios">
    <div class="details" :style="{ height: config.height + 20 + 'px' }">
      <div
        @mouseover="onTabHover(key)"
        @mouseleave="onLevel(key)"
        :class="['main-details-tab', isHoverMap[key] ? 'active' : '']"
        ref="myDetails"
        v-for="(item, key, index) in dataMap"
        :key="index"
        :style="{
          transform:
            'translateX(' +
            (index * width + index * 20 - start * (width + 18)) +
            'px)'
        }"
      >
        <div
          class="tabMain"
          :style="{
            width: width + 'px',
            height: config.height + 'px',
            background: styleConfig.backgroundColor,
            borderColor: isHoverMap[key]
              ? styleConfig.hightColor
              : styleConfig.borderColor,
            boxShadow: isHoverMap[key]
              ? '0 2px 15px 0 ' + styleConfig.boxShadowColor
              : ''
          }"
          ref="tabmain"
        >
          <div class="tabStyle">
            <div class="title">
              <div class="radio-style"></div>
              <div class="titleWb">{{ key }}</div>
              <div class="icon">
                <i class="el-icon-date"></i>
              </div>
            </div>
            <div
              class="main-style"
              :style="{ height: config.height - 40 + 'px' }"
            >
              <div v-for="(sys, i) in item" :key="i" class="details-info">
                <div class="wb-style">{{ sys.text }}</div>
                <div class="text-style">{{ sys.detail }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="time-axios">
      <div class="time-main">
        <ul>
          <div
            class="li-line-style"
            :style="{ background: styleConfig.lineBorderColor }"
          ></div>
          <li>
            <i
              @click="onChangeTab('start')"
              :style="{
                cursor: start === 0 ? 'not-allowed' : 'pointer',
                color: start !== 0 ? 'rgba(0, 0, 0, 0.65)' : '#ddd'
              }"
              class="el-icon-arrow-left"
            ></i>
          </li>
          <template v-for="(v, index) in currentInfo">
            <li :key="index" :class="hoverText === v ? 'active' : ''">
              <div class="text-li">
                <div class="sy-radius">
                  <div
                    class="radus-des"
                    :style="{
                      borderColor: isHoverMap[v]
                        ? styleConfig.hightColor
                        : styleConfig.lineBorderColor
                    }"
                  >
                    <div class="radius"></div>
                  </div>
                </div>
                <div
                  class="year"
                  :style="{
                    color: isHoverMap[v]
                      ? styleConfig.hightColor
                      : styleConfig.lineTextColor
                  }"
                >
                  {{ v }}
                </div>
              </div>
            </li>
          </template>

          <li>
            <i
              @click="onChangeTab('end')"
              :style="{
                cursor: end === allLength - 1 ? 'not-allowed' : 'pointer',
                color: end !== allLength - 1 ? 'rgba(0, 0, 0, 0.65)' : '#ddd'
              }"
              class="el-icon-arrow-right"
            ></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * @description 时间轴历史信息展示组件
 * @author beixian.huang
 * @param {dataMap|object} 事件历史信息 -  必须
 * 示例：
 * {
 *  2015-01-05:[
 *    {
 *      text:'事件'， // 标题
 *      details:"公司成立" // 内容详细信息
 *    }，
 *    {
 *      text:'事件'， // 标题
 *      details:"公司成立" // 内容详细信息
 *    }，
 *    ...
 *  ],
 *    2015-01-09:[
 *    {
 *      text:'事件'， // 标题
 *      details:"公司成立" // 内容详细信息
 *    }，
 *    {
 *      text:'事件'， // 标题
 *      details:"公司成立" // 内容详细信息
 *    }，
 *    ...
 *  ]
 * }
 * @param {config|object} 配置项信息 - 非必须
 * 示例：
 *  {
 *    height: 180 , // 区块的正常高度
 *    count：4 // 默认显示多少个
 *  }
 * @param {styleConfig|object} 样式主体 - 非必须
 * {
 *   hightColor: '#1890ff',    // 高亮颜色-鼠标hover高亮颜色
          boxShadowColor: 'rgba(197, 234, 255, 1)', // 高亮的边框阴影颜色
          fontColor: 'rgba(29, 31, 37, 0.35)',  // 字体颜色
          borderColor: 'rgba(244, 243, 243, 1)',  // 边框颜色
          backgroundColor: '#fff',    // 背景颜色
          lineBorderColor: '#dbdbdb',   // 时间线的边框颜色
          lineTextColor: 'rgba(0,0,0,.65)'  // 时间线的文字颜色
 * }
 */
export default {
  name: 'BaseTimeAxiosHistory',
  props: {
    dataMap: {
      type: Object,
      default: () => {
        return {};
      }
    },
    config: {
      type: Object,
      default: () => {
        return {
          height: 180,
          count: 4
        };
      }
    },
    styleConfig: {
      type: Object,
      default: () => {
        return {
          hightColor: '#1890ff',
          boxShadowColor: 'rgba(197, 234, 255, 1)',
          fontColor: 'rgba(29, 31, 37, 0.35)',
          borderColor: 'rgba(244, 243, 243, 1)',
          backgroundColor: '#fff',
          lineBorderColor: '#dbdbdb',
          lineTextColor: 'rgba(0,0,0,.65)'
        };
      }
    }
  },
  data() {
    return {
      hisDeatils: [],
      currentInfo: [],
      start: 0,
      end: 0,
      allLength: 0,
      stCount: 0,
      interval: null,
      width: 0,
      hoverText: '',
      isHoverMap: {}
    };
  },
  watch: {
    start(v) {
      this.currentInfo = this.getCurrentInfo(v, this.end);
    },
    end() {
      this.currentInfo = this.getCurrentInfo(this.start, this.end);
    }
  },
  created() {},
  mounted() {
    const count = this.config.count;
    this.width = (this.$refs.timeAxios.clientWidth - 40) / count - 20;
    for (const key in this.dataMap) {
      this.isHoverMap[key] = false;
    }
    this.allLength = Object.keys(this.dataMap).length;
    const data = this.groupingArray(this.dataMap, count);
    this.hisDeatils = this.currentInfo;
    this.stCount = count;
    this.start = 0;
    this.end = count - 1;
    this.currentInfo = data[0];
    this.initInterval();
  },
  methods: {
    /**
     * @description 定时设置
     */
    initInterval() {
      if (this.interval !== null) {
        return false;
      }
      this.interval = setInterval(() => {
        const len = this.allLength;
        if (this.end !== len - 1) {
          this.end++;
          this.start++;
        } else {
          this.end = this.stCount - 1;
          this.start = 0;
        }
      }, 5000);
    },
    /**
     * @description 数据分组
     */
    groupingArray(data, num) {
      const result = [];
      var arr = Object.keys(data);
      for (var i = 0; i < arr.length; i += num) {
        const mapIndexArr = arr.slice(i, i + num);
        const mapInfo = {};
        for (const v of mapIndexArr) {
          mapInfo[v] = data[v];
        }
        result.push(mapInfo);
      }
      return result;
    },
    /**
     * @description 数据展示筛选
     */
    getCurrentInfo(start, end) {
      const data = [];
      let i = 0;
      for (const key in this.dataMap) {
        if (i >= start && i <= end) {
          data.push(key);
        }
        i++;
      }
      return data;
    },
    /**
     * @description 上一个，下一个切换点击
     */
    onChangeTab(type) {
      const len = this.allLength;
      if (type === 'end' && this.end !== len - 1) {
        this.end++;
        this.start++;
      }
      if (type === 'start' && this.start !== 0) {
        this.start--;
        this.end--;
      }
    },
    /**
     * @description 鼠标hover事件处理
     */
    onTabHover(key) {
      this.hoverText = key;
      clearInterval(this.interval);
      this.interval = null;
      this.isHoverMap[key] = true;
    },
    /**
     * @description 鼠标level事件处理
     */
    onLevel(item) {
      this.hoverText = '';
      this.initInterval();
      this.isHoverMap[item] = false;
    }
  },
  destroyed() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
};
</script>
