<template>
  <div class="timeAxios" ref="timeAxios">
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
  name: 'timeAxiosHistory',
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

<style lang="less" scoped>
/* stylelint-disable */
.timeAxios {
  position: relative;
  width: 100%;
  height: 100%;
  .details {
    position: relative;
    width: calc(100% - 40px);
    height: auto;
    margin: 20px 20px;
    overflow: hidden;
    // display: flex;
    // justify-content: center;
    .main-details-tab {
      position: absolute;
      top: 1px;
      z-index: 999;
      display: inline-block;
      padding-left: 5px;
      transition: transform 0.5s;
    }
    .tabMain {
      display: inline-block;
      cursor: pointer;
      background-color: rgb(255, 255, 255, 1);
      border: 1px solid rgba(244, 243, 243, 1);
      border-radius: 2px;
      transition: transform 0.5s;
      .tabStyle {
        padding: 10px;
        .title {
          height: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(244, 243, 243, 1);
          .radio-style {
            float: left;
            width: 8px;
            height: 8px;
            margin: 4px 5px 0 0;
            background-color: #e5e5e5;
            border-radius: 50%;
          }
          .titleWb {
            float: left;
            font-size: 14px;
          }
          .icon {
            float: right;
            i {
              font-size: 16px;
              color: #e5e5e5;
            }
          }
        }
        .main-style {
          overflow: auto;
        }
        .details-info {
          padding: 5px;
          border-bottom: 1px solid rgba(244, 243, 243, 1);
          .date-style {
            font-size: 12px;
            line-height: 20px;
            color: rgba(29, 31, 37, 0.65);
          }
          .text-style {
            font-size: 12px;
            line-height: 25px;
            color: rgba(29, 31, 37, 0.65);
          }
          .wb-style {
            font-size: 12px;
            line-height: 25px;
            color: rgba(29, 31, 37, 0.35);
          }
        }
        .details-info:last-child {
          border-style: none;
        }
      }
    }
  }
  .main-details-tab.active {
    z-index: 9999;
    .tabMain {
      margin-top: 3px;
      border: 1px solid rgba(66, 147, 244, 1);
      box-shadow: 0 2px 15px 0 rgba(197, 234, 255, 1);
      transform: translateY(5px) scale(1.05);
      .tabStyle {
        .radio-style {
          background-color: rgba(66, 147, 244, 1) !important;
        }
        .icon {
          i {
            color: rgba(66, 147, 244, 1) !important;
          }
        }
      }
    }
  }
  .time-axios {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    .time-main {
      position: relative;
      width: auto;
    }
    ul {
      padding: 0;
      list-style: none;
      .li-line-style {
        position: absolute;
        top: 17.5px;
        left: 50px;
        z-index: 1;
        width: calc(100% - 100px);
        height: 1px;
        background: #e5e5e5;
      }
      li {
        position: relative;
        z-index: 99;
        float: left;
        padding: 0 25px;
        text-align: center;
        cursor: pointer;

        .text-li {
          position: relative;
          width: 100%;
          height: 80px;
        }
        .sy-radius {
          position: absolute;
          z-index: 199;
          width: 100%;
          height: 8px;
          .radus-des {
            width: 12px;
            height: 12px;

            /* margin-top: -5px; */
            margin: auto;
            margin-top: -3px;
            background: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 50%;
          }
          .radius {
            width: 8px;
            height: 8px;
            margin: auto;
            margin-top: 2px;
            background-color: #e5e5e5;
            border-radius: 50%;
          }
        }
        .year {
          padding-top: 15px;
          color: rgba(0, 0, 0, 0.65);
        }
        i {
          font-size: 18px;
          line-height: 0px;
          color: rgba(0, 0, 0, 0.65);
          cursor: pointer;
        }
      }
      li.active {
        .radus-des {
          width: 14px;
          height: 14px;
          margin-top: -4px;
          border-color: rgba(66, 147, 244, 1);
        }
        .radius {
          width: 10px;
          height: 10px;
          background: rgba(66, 147, 244, 1);
        }
        .year {
          font-size: 14px;
          color: rgba(66, 147, 244, 1);
        }
      }
    }
  }
}
</style>
