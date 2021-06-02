<template>
  <div :class="$style.box">
    <div class="toolbar"></div>
    <div>
      <base-amap
        v-bind="params"
        @AMAP_READY_EVENT="onAampReadyEvent"
        @complete="onComplete"
        ref="map"
        :amap-manager="amapManager"
        :plugin="plugin"
      >
        <base-amap-circle-marker
          v-for="(marker, index) of markers"
          :key="index"
          v-bind="marker"
        ></base-amap-circle-marker>
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
        zoom: 12,
        zooms: [12, 20],
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
      markers: [
        {
          center: [120.359814, 30.314956],
          radius: 10 + Math.random() * 10, // 3D视图下，CircleMarker半径不要超过64px
          strokeColor: 'white',
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: 'rgba(0,0,255,1)',
          fillOpacity: 0.5,
          zIndex: 12,
          bubble: true
        },
        {
          center: [120.168251, 30.252115],
          radius: 20,
          fillOpacity: 1,
          fillColor: 'rgba(0,0,255,1)',
          draggable: true,
          events: {
            click: () => {
              alert('click');
            },
            dragstart: () => {
              console.log('dragstart');
            },
            dragging: () => {
              console.log('dragging');
            },
            dragend: () => {
              console.log('dragend');
            }
          }
        }
      ]
    };
  },
  methods: {
    /**
     * @desc 地图初始化完成
     */
    onAampReadyEvent(amap) {
      console.log('地图初始化完成', amap.getCenter());
    },
    /**
     * @desc 地图加载完成
     */
    onComplete(amap) {}
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
