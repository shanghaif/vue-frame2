<template>
  <div :class="$style.box">
    <div class="toolbar">
      <el-button type="primary" plain v-on:click="toggleVisible"
        >切换第一个marker点</el-button
      >
      <el-button type="primary" plain v-on:click="changePosition">
        改变marker点的坐标
      </el-button>
      <el-button type="primary" plain v-on:click="addMarker">
        添加marker点
      </el-button>
      <el-button type="primary" plain v-on:click="chnageDraggle"
        >改变拖拽</el-button
      >
      <el-button type="primary" plain v-on:click="addHandMarker"
        >手动添加一个原生的marker</el-button
      >
      <el-button type="primary" plain v-on:click="removeMarker"
        >移除marker</el-button
      >
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
        <base-amap-marker
          :vid="'component-marker' + index"
          v-for="(marker, index) of markers"
          :key="index"
          :position="marker.position"
          :events="marker.events"
          :visible="marker.visible"
          :draggable="marker.draggable"
          :template="marker.template"
          :contentRender="marker.contentRender"
          :shadow="marker.shadow"
          :icon="marker.icon"
          :title="marker.title"
          :label="marker.label"
        >
          <template v-if="index === 0">
            <div>
              <span>插槽slot的marker点-可拖动</span>
              <img
                src="/static/images/avatar.gif"
                alt=""
                style="width: 40px; height: 40px;"
                @click="onMarkerSlotClick"
              />
            </div>
          </template>
        </base-amap-marker>
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
      ],
      markers: [
        {
          position: [119.733525, 30.260569],
          visible: true,
          draggable: true,
          events: {
            click: e => {
              console.log('click marker', e);
            },
            dragend: e => {
              console.log('---event---: dragend');
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            }
          }
        },
        {
          position: [121.418602, 29.892537],
          title: '我是title',
          template: '<span>template模板 marker</span>',
          label: {
            offset: [20, 20],
            // eslint-disable-next-line quotes
            content: "<div class='info'>我是 marker 的 label 标签</div>"
          }
        },
        {
          position: [119.960616, 28.79642],
          contentRender: (h, instance) => {
            return h('span', {}, ['render函数 marker']);
          },
          events: {
            mouseover(e) {
              e.target.setzIndex(200); // 鼠标移动到 marker点上修改 marker 点的图层等级
            },
            mouseout(e) {
              e.target.setzIndex(100);
            },
            click(e) {
              console.log('这里是click事件');
            }
          }
        },
        {
          position: [121.102605, 29.243153],
          // icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png',
          icon: new AMap.Icon({
            image:
              '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png',
            size: new AMap.Size(32, 32), // 图标大小
            imageSize: new AMap.Size(32, 32)
          }),
          offset: [-13, -30],
          title: '我是title'
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
    onComplete(amap) {
      console.log('地图加载完成', amap.getCenter());

      // amap.panBy(-310, -120); // 地图偏移
      var endIcon = new AMap.Icon({
        size: new AMap.Size(25, 34),
        image:
          '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        imageSize: new AMap.Size(135, 40),
        imageOffset: new AMap.Pixel(-95, -3)
      });

      // 将 icon 传入 marker
      var endMarker = new AMap.Marker({
        position: new AMap.LngLat(120.840443, 30.387757),
        icon: endIcon,
        offset: new AMap.Pixel(-13, -30)
      });

      // 将 markers 添加到地图
      amap.add([endMarker]);
    },
    /**
     * @desc 插槽marker点击事件
     */
    onMarkerSlotClick(e) {
      console.log('插槽marker点击事件', e);
    },
    /**
     * @desc 改变marker点的坐标
     */
    changePosition() {
      if (this.markers.length >= 3) {
        const position = this.markers[3].position;
        this.markers[3].position = [position[0] + 0.2, position[1] - 0.2];
      }
    },
    /**
     * @desc 添加 marker 点
     */
    addMarker() {
      const marker = {
        position: [
          120.155018 + (Math.random() - 0.5) * 0.3,
          30.29622 + (Math.random() - 0.5) * 0.4
        ]
      };
      this.markers.push(marker);
    },
    /**
     * @desc 移除节点
     */
    removeMarker() {
      if (!this.markers.length) return;
      this.markers.splice(this.markers.length - 1, 1);
    },
    /**
     * @desc 手动添加一个marker点
     */
    addHandMarker() {
      const amap = amapManager.getMap();
      var endIcon = new AMap.Icon({
        size: new AMap.Size(25, 34),
        image:
          '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        imageSize: new AMap.Size(135, 40),
        imageOffset: new AMap.Pixel(-95, -3)
      });

      // 将 icon 传入 marker
      var endMarker = new AMap.Marker({
        position: new AMap.LngLat(120.168251, 30.252115),
        icon: endIcon,
        offset: new AMap.Pixel(-13, -30)
      });

      // 将 markers 添加到地图
      amap.add([endMarker]);
    },
    /**
     * @desc 切换显示/隐藏
     */
    toggleVisible() {
      if (this.markers.length > 0) {
        const visableVar = this.markers[0].visible;
        this.markers[0].visible = !visableVar;
      }
    },
    /**
     * @desc 切换拖拽
     */
    chnageDraggle() {
      if (this.markers.length > 0) {
        const draggable = this.markers[0].draggable;
        this.markers[0].draggable = !draggable;
      }
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
