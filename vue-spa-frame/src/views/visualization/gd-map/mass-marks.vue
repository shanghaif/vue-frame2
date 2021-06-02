<template>
  <div :class="$style.box">
    <div>
      <el-button type="primary" @click="onClear">清除海量点</el-button>
      <el-button type="primary" @click="onChange">切换显示/隐藏</el-button>
      <el-button type="primary" @click="onUpdateStyle">修改style样式</el-button>
    </div>
    <base-amap
      v-bind="params"
      @AMAP_READY_EVENT="onAampReadyEvent"
      @complete="onComplete"
      ref="map"
      :amap-manager="amapManager"
      :plugin="plugin"
    >
      <base-amap-mass-marks
        v-bind="mass"
        ref="base-amap-mass-marks-ref"
      ></base-amap-mass-marks>
    </base-amap>
  </div>
</template>

<script>
import { BaseAmap } from '@packages/components/index.js';

const amapManager = new BaseAmap.AMapManager();
export default {
  data() {
    this.amapManager = amapManager; // 地图管理对象
    return {
      params: {
        vid: 'amapDemo',
        center: [120.168251, 30.252115],
        zoom: 5,
        zooms: [5, 20],
        events: {
          init: (a, b, c) => {
            console.log('事件注册完成后的init事件', a, b, c);
            console.log(a.getCenter());
            console.log(this.$refs.map.getInstance());
            a.getCity(result => {
              console.log(result);
            });
          },
          moveend: () => {
            console.log('map moveend');
          },
          zoomchange: () => {
            console.log('map zoomchange');
          },
          click: e => {
            console.log('map clicked');
          }
        }
      },
      plugin: [
        'Scale', // 比例尺
        {
          pName: 'ToolBar', // 地图工具条插件
          liteStyle: true,
          events: {
            zoomchanged(o) {
              console.log('zoomchanged', o);
            }
          }
        },
        {
          pName: 'MapType', // 地图类型切换插件
          defaultType: 0,
          events: {
            init(o) {
              console.log(o); // 控件的init事件，自定义事件
            }
          }
        }
      ],
      mass: {
        opacity: 0.8,
        zIndex: 10,
        cursor: 'pointer',
        data: [],
        mapStyle: [
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/mass0.png',
            anchor: [6, 6],
            size: [11, 11]
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
            anchor: [4, 4],
            size: [7, 7]
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/mass2.png',
            anchor: [3, 3],
            size: [5, 5]
          }
        ],
        show: true,
        events: {
          complete: e => {
            console.log('海量点加载完成');
          },
          click: e => {
            console.log('海量点click');
          }
        }
      }
    };
  },
  created() {
    this.$nextTick(this.load);
  },
  methods: {
    load() {
      setTimeout(() => {
        this.mass.data = window.citys; // https://a.amap.com/jsapi_demos/static/citys.js
      }, 500);
    },
    /**
     * @desc 地图初始化完成
     */
    onAampReadyEvent(amap) {
      console.log('地图初始化完成', amap.getCenter());
    },
    /**
     * @desc 地图加载完成
     */
    onComplete(amap) {
      console.log('地图加载完成', amap.getCenter());
    },
    /**
     * @desc 清除海量点
     */
    onClear() {
      this.$refs['base-amap-mass-marks-ref'].clear();
    },
    /**
     * @desc 切换隐藏/显示
     */
    onChange() {
      this.mass.show = !this.mass.show;
    },
    /**
     * @desc 修改style样式
     */
    onUpdateStyle() {
      this.mass.mapStyle = [
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
          anchor: [6, 6], // new AMap.Pixel(6, 6),
          size: [11, 11] // new AMap.Size(11, 11)
        },
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/mass0.png',
          anchor: [4, 4], // new AMap.Pixel(4, 4),
          size: [7, 7] // new AMap.Size(7, 7)
        },
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/mass2.png',
          anchor: [3, 3], // new AMap.Pixel(3, 3),
          size: [5, 5] // new AMap.Size(5, 5)
        }
      ];
      console.log('this.mass.mapStyle', this.mass.mapStyle);
    }
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;
  .flex-column;
  > div:first-child {
    height: 50px;
    margin-bottom: 5px;
    border-bottom: 1px solid rgba(126, 128, 132);
  }
  > div:nth-child(2) {
    flex: 1;
  }
}
</style>
