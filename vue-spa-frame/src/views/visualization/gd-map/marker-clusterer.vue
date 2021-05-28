<template>
  <div :class="$style.box">
    <div class="absolute mb-10">
      <div>聚合点效果切换</div>
      <el-button type="text" @click="addCluster(0)">默认样式</el-button
      ><el-button type="text" @click="addCluster(1)">自定义图标</el-button
      ><el-button type="text" @click="addCluster(2)">完全自定义</el-button>
      <div class="mt-10">
        如果只是需要修改marker的 styles 样式，可以直接修改响应式数据 styles 对象
      </div>
    </div>
    <base-amap
      v-bind="params"
      @AMAP_READY_EVENT="onAampReadyEvent"
      @complete="onComplete"
      ref="map"
      :amap-manager="amapManager"
      :plugin="plugin"
    >
      <base-amap-marker-clusterer
        ref="base-amap-marker-clusterer-ref"
        :styles="styles"
        :zoomOnClick="true"
        :events="events"
        @drawComplete="onDrawComplete"
      ></base-amap-marker-clusterer>
    </base-amap>
  </div>
</template>

<script>
import { BaseAmap } from '@packages/components/index.js';
const amapManager = new BaseAmap.AMapManager();
export default {
  data() {
    this.amapManager = amapManager; // 地图管理对象
    this.markers = [];
    return {
      params: {
        vid: 'amapDemo',
        center: [120.168251, 30.252115],
        zoom: 4,
        zooms: [4, 20],
        viewMode: '3D',
        pitch: 0,
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
        }
      ],
      styles: [
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/blue.png',
          size: [32, 32],
          offset: [-16, -16]
        },
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/green.png',
          size: [32, 32],
          offset: [-16, -16]
        },
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/orange.png',
          size: [36, 36],
          offset: [-18, -18]
        },
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/red.png',
          size: [48, 48],
          offset: [-24, -24]
        },
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/darkRed.png',
          size: [48, 48],
          offset: [-24, -24]
        }
      ],
      events: {
        // 点击事件
        click: (cluster, lnglat, target, markers) => {
          console.log(cluster, lnglat, target, markers);
        }
      }
    };
  },
  created() {
    this.$nextTick(() => {
      const that = this;
      setTimeout(() => {
        for (var i = 0; i < window.chinaPoints.length; i += 1) {
          // 添加点的方式 1
          /* const marker = new AMap.Marker({
            position: window.chinaPoints[i].lnglat,
            content:
              '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
            offset: new AMap.Pixel(-15, -15)
          });
          marker.on('click', function(p) {
            that.$message({
              message: p.lnglat.lng + ' ' + p.lnglat.lat,
              type: 'success'
            });
          });
          this.markers.push(marker); */
          // 添加点的方式 2
          this.markers.push({
            lnglat: window.chinaPoints[i].lnglat,
            event: {
              click: function(p) {
                that.$message({
                  message: p.lnglat.lng + ' ' + p.lnglat.lat,
                  type: 'success'
                });
              }
            }
          });
        }
        // 通过 addMarkers 方法来手动添加点（添加点的方式 1）
        /* this.$refs['base-amap-marker-clusterer-ref'].addMarkers(
          this.markers,
          true
        ); */
        // （添加点的方式 2）
        this.$refs['base-amap-marker-clusterer-ref'].addPointMarkers(
          this.markers,
          true
        );
      }, 1500);
    });
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
    onDrawComplete(amapComponent) {
      console.log('聚合点绘制完成', amapComponent);
    },
    // 聚合点的自定义绘制
    _renderClusterMarker(context) {
      const count = this.markers.length;
      var factor = Math.pow(context.count / count, 1 / 18);
      var div = document.createElement('div');
      var Hue = 180 - factor * 180;
      var bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
      var fontColor = 'hsla(' + Hue + ',100%,20%,1)';
      var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
      var shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
      div.style.backgroundColor = bgColor;
      var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
      div.style.width = div.style.height = size + 'px';
      div.style.border = 'solid 1px ' + borderColor;
      div.style.borderRadius = size / 2 + 'px';
      div.style.boxShadow = '0 0 1px ' + shadowColor;
      div.innerHTML = context.count;
      div.style.lineHeight = size + 'px';
      div.style.color = fontColor;
      div.style.fontSize = '14px';
      div.style.textAlign = 'center';
      context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
      context.marker.setContent(div);
    },
    addCluster(type) {
      if (type === 1) {
        // 自定义图标
        const styles = [
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/blue.png',
            size: [32, 32],
            offset: [-16, -16]
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/green.png',
            size: [32, 32],
            offset: [-16, -16]
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/orange.png',
            size: [36, 36],
            offset: [-18, -18]
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/red.png',
            size: [48, 48],
            offset: [-24, -24]
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/darkRed.png',
            size: [48, 48],
            offset: [-24, -24]
          }
        ];
        this.$refs['base-amap-marker-clusterer-ref'].draw({
          styles,
          renderClusterMarker: undefined
        });
        // 如果只是单独修改marker样式，可以直接修改响应式数据 styles
        // this.styles = 上面的那个 styles 变量;
      } else if (type === 2) {
        // 完全自定义
        this.$refs['base-amap-marker-clusterer-ref'].draw({
          styles: [],
          renderClusterMarker: this._renderClusterMarker
        });
      } else {
        // 默认样式
        this.$refs['base-amap-marker-clusterer-ref'].draw({
          styles: [],
          renderClusterMarker: undefined
        });
      }
    }
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;

  > div:first-child {
    right: 130px;
    bottom: 40px;
    z-index: 1000;
    box-sizing: border-box;
    width: 300px;
    height: 120px;
    padding: 20px;
    background-color: rgba(255, 255, 255);
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
