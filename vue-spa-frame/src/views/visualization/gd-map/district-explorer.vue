<template>
  <div :class="$style.box">
    <div class="toolbar">
      <div>
        <el-button type="primary" @click="getMap" plain>获取map</el-button>
        <el-button type="primary" @click="changeBackColor" plain
          >修改浙江省行政区划背景色</el-button
        >
        <el-button type="primary" @click="changeCounty" plain
          >切换到杭州市</el-button
        >
        <el-button type="primary" @click="showCounty" plain
          >显示浙江省所有区县</el-button
        >
        <el-button type="primary" @click="showProvinceCounty" plain
          >显示浙江省</el-button
        >
      </div>
      <div :class="[$style.mt8, $style.mb10]">
        <span>点击每个行政区划会显示 infoWindow 弹框</span>
      </div>
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
        <base-amap-district-explorer
          ref="base-amap-district-explorer-ref"
          :eventSupport="true"
          :events="events"
          :adcode="adcode"
          :colorFilter="colorFilter"
          :colors="colors"
        />
        <base-amap-marker
          vid="component-marker"
          :position="marker.position"
          v-for="(marker, index) of markers"
          :key="index"
          ><div
            :class="$style.cityMarkerCls"
            :style="{ backgroundColor: index === 3 ? '#fd9b57' : false }"
          >
            {{ marker.cityName }}
          </div></base-amap-marker
        >
        <base-amap-info-window
          vid="info-window-1"
          :position="window.position"
          :events="window.events"
          :visible="window.visible"
          ><div :style="slotStyle">
            <b>Hello {{ window.city }}-{{ count }} times</b>
            <button @click="onClick">Add</button>
          </div></base-amap-info-window
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
    // 测试数据
    this.dataList = [
      { code: '330100', value: 56 },
      { code: '330200', value: 200 },
      { code: '330300', value: 20 },
      { code: '330400', value: 57 },
      { code: '330500', value: 250 },
      { code: '330600', value: 330 },
      { code: '330700', value: 500 },
      { code: '330800', value: 445 },
      { code: '330900', value: 324 },
      { code: '331000', value: 78 },
      { code: '331100', value: 178 }
    ];
    return {
      params: {
        vid: 'amapDemo',
        center: [120.168251, 30.252115],
        zoom: 7.5,
        zooms: [7.5, 20],
        viewMode: '3D',
        pitch: 0,
        events: {
          init: (a, b, c) => {
            console.log('事件注册完成后的init事件', a, b, c);
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
      adcode: ['330000'],
      events: {
        /* featureMouseover: (e, feature) => {
          console.log('featureMouseover');
        },
        featureMouseout: (e, feature) => {
          console.log('featureMouseout');
        }, */
        featureClick: (e, feature) => {
          console.log('featureClick', e, feature, feature.properties.adcode);
          this.count = 0;
          this.window.city = feature.properties.name;
          this.window.position = feature.properties.center;
          if (feature.properties.adcode !== this.window.adcode) {
            this.window.visible = true;
          } else {
            this.window.visible = !this.window.visible;
          }
          this.window.adcode = feature.properties.adcode;
        }
      },
      colors: [
        '#3366cc',
        '#dc3912',
        '#ff9900',
        '#109618',
        '#990099',
        '#0099c6',
        '#dd4477',
        '#66aa00',
        '#b82e2e',
        '#316395',
        '#994499',
        '#22aa99',
        '#aaaa11',
        '#6633cc',
        '#e67300',
        '#8b0707',
        '#651067',
        '#329262',
        '#5574a6',
        '#3b3eac'
      ],
      markers: [
        {
          position: [120.205736, 30.252583],
          cityName: '杭州'
        },
        {
          position: [121.614171, 29.86657],
          cityName: '宁波'
        },
        {
          position: [120.75665, 30.755443],
          cityName: '嘉兴市'
        },
        {
          position: [120.106016, 30.861276],
          cityName: '湖州市'
        },
        {
          position: [120.592376, 30.016358],
          cityName: '绍兴市'
        },
        {
          position: [119.658615, 29.068983],
          cityName: '金华市'
        },
        {
          position: [118.871196, 28.97049],
          cityName: '衢州市'
        },
        {
          position: [122.203783, 29.999919],
          cityName: '舟山市'
        },
        {
          position: [121.421108, 28.666757],
          cityName: '台州市'
        },
        {
          position: [119.926121, 28.468198],
          cityName: '丽水市'
        }
      ],
      window: {
        position: [120.168251, 30.252115],
        visible: false,
        events: {
          open: () => {
            console.log('窗口打开事件');
          },
          close: () => {
            console.log('窗口关闭事件');
          }
        }
      },
      slotStyle: {
        padding: '2px 8px',
        background: '#eee',
        color: '#333',
        border: '1px solid #aaa'
      },
      count: 0
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
    onComplete(amap) {
      console.log('地图加载完成', amap.getCenter());
    },
    getMap() {
      console.log(this.amapManager._componentMap);
      console.log(this.amapManager._map);
    },
    changeBackColor() {
      this.colors = [
        '#3366cc',
        '#3B6667',
        '#dd4477',
        '#109618',
        '#990099',
        '#0099c6',
        '#66aa00',
        '#dc3912',
        '#316395',
        '#ff9900',
        '#1E1E1E',
        '#3B6667'
      ];
      this.$refs['base-amap-district-explorer-ref'].redraw();
    },
    changeCounty() {
      this.adcode = ['330100']; // 杭州市
      setTimeout(() => {
        this.params.zoom = 9;
      }, 500);
    },
    showCounty() {
      this.adcode = [
        '330100',
        '330200',
        '330300',
        '330400',
        '330500',
        '330600',
        '330700',
        '330800',
        '330900',
        '331000',
        '331100'
      ];
    },
    showProvinceCounty() {
      this.adcode = ['330000'];
    },
    /**
     * @desc 颜色过滤器
     */
    colorFilter(feature, i) {
      const adcode = feature.properties.adcode;
      const oData = _find(this.dataList, v => v.code === adcode + '');
      if (_isNil(oData)) {
        return this.colors[i % this.colors.length];
      }
      if (oData.value <= 100) {
        return { fillColor: this.colors[0] };
      }
      if (oData.value > 100 && oData.value <= 300) {
        return { fillColor: this.colors[1] };
      }
      if (oData.value > 300 && oData.value <= 400) {
        return { fillColor: this.colors[2] };
      }
      if (oData.value > 400) {
        return { fillColor: this.colors[10] };
      }
      return { fillColor: this.colors[4] };
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
    height: 70px;
    margin-bottom: 5px;
    border-bottom: 1px solid rgba(126, 128, 132);
  }
  > div:nth-child(2) {
    flex: 1;
  }
  .city-marker-cls {
    width: 50px;
    padding: 5px;
    color: white;
    text-align: center;
    background: rgba(84, 178, 255);
    border-radius: 10px;
  }
}
</style>
