<template>
  <div :class="$style.box">
    <div class="toolbar">
      <el-button type="primary" @click="getMap()" plain>获取map</el-button>
    </div>
    <div>
      <base-amap
        v-bind="params"
        @AMAP_READY_EVENT="onAampReadyEvent"
        @complete="onComplete"
        ref="map"
        :amap-manager="amapManager"
        :plugin="plugin"
      >
      </base-amap>
    </div>
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
        zoom: 7.5,
        zooms: [7.5, 20],
        viewMode: '3D',
        pitch: 0,
        dragEnable: false,
        scrollWheel: false,
        doubleClickZoom: false,
        panBy: [-310, -120], // 地图偏移
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
      ]
    };
  },
  methods: {
    /**
     * @desc 地图对象
     */
    getMap() {
      console.log(this.amapManager._componentMap);
      console.log(this.amapManager._map);
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
