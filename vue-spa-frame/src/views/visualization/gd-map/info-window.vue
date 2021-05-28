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
        <base-amap-info-window
          vid="info-window-1"
          :position="window.position"
          :content="window.content"
          :template="window.template"
          :contentRender="window.contentRender"
          :events="window.events"
          ><!-- <div :style="slotStyle">
            <b>Hello {{ count }} times</b>
            <button @click="onClick">Add</button>
          </div> --></base-amap-info-window
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
    const center = [120.168251, 30.252115];
    return {
      params: {
        vid: 'amapDemo',
        center,
        zoom: 12,
        zooms: [7, 20],
        viewMode: '3D',
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
      slotStyle: {
        padding: '2px 8px',
        background: '#eee',
        color: '#333',
        border: '1px solid #aaa'
      },
      window: {
        position: center,
        // content: '<span style="color: red;">content</span>'
        // template: '<button>template</button>'
        contentRender: (h, self) => {
          return h('div', {}, ['render函数']);
        },
        events: {
          open: () => {
            console.log('窗口打开事件');
          },
          close: () => {
            console.log('窗口关闭事件');
          }
        }
      },
      count: 0
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
      // 单纯手动添加一个 marker 点
      /* var infoWindow = new AMap.InfoWindow({
        anchor: 'top-left',
        content: '这是信息窗体！这是信息窗体！'
      });

      infoWindow.open(amap, [120.379936, 30.293005]); */
    },
    onClick() {
      this.count += 1;
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
