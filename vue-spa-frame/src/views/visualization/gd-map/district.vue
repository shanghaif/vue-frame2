<template>
  <div :class="$style.box">
    <div class="toolbar">
      <el-button type="primary" @click="onChangeBlock" plain
        >修改地市行政区域背景色</el-button
      >
      <el-button type="primary" @click="onChangeCounty" plain
        >地市/区县区划图</el-button
      >
      <el-button type="primary" @click="onChangeProvince" plain>{{
        provinceText
      }}</el-button>
      <span :class="[$style.inBlock, $style.ml30]"
        >注意：需要在html页面中手动引入
        `https://a.amap.com/Loca/static/mock/adcodes.js`</span
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
        <base-amap-district
          v-bind="districtParams"
          ref="base-amap-district-ref"
        />
        <base-amap-marker v-bind="marker"
          ><div :class="$style.myMarkerCls">
            <div>组件：</div>
            <div>自定义marker点</div>
          </div></base-amap-marker
        >
      </base-amap>
    </div>
  </div>
</template>

<script>
import _toNumber from 'lodash/toNumber';
import _isNil from 'lodash/isNil';
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
        dragEnable: true,
        scrollWheel: true,
        doubleClickZoom: true,
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
            const province = this.$refs['base-amap-district-ref'].getProvince();
            const px = e.pixel;
            const props = province.getDistrictByContainerPos(px); // 拾取所在位置的行政区
            console.log('props', props);
            if (_isNil(props)) {
              this.$message({
                message: '点击在行政区域外部了',
                type: 'warning'
              });
              return;
            }
            const cityName = props.NAME_CHN;
            const adcode = props.adcode_cit;
            this.$message({
              message: cityName,
              type: 'success'
            });
            this.$refs['base-amap-district-ref'].setStyles({
              fill: props => {
                if (props.adcode + '' === adcode + '') {
                  return 'yellow';
                }
                return this.$refs['base-amap-district-ref'].colors[
                  props.adcode + ''
                ];
              }
            });
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
      districtParams: {
        adcode: '330000',
        depth: 1,
        vid: 'dasdasd-vid',
        zIndex: 7.5
      },
      marker: {
        position: [119.483643, 28.828322],
        draggable: true
      },
      provinceText: '安徽省'
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
    /**
     * @desc 修改行政区域背景色-事件
     */
    onChangeBlock() {
      const that = this;
      let data = [];
      console.log(this.districtParams.adcode);
      if (this.districtParams.adcode === '330000') {
        data = [
          { entNum: 12, areaCode: '330100', areaName: '杭州市' },
          { entNum: 16, areaCode: '330200', areaName: '宁波市' },
          { entNum: 3, areaCode: '330300', areaName: '温州市' },
          { entNum: 7, areaCode: '330400', areaName: '嘉兴市' },
          { entNum: 9, areaCode: '330500', areaName: '湖州市' },
          { entNum: 7, areaCode: '330600', areaName: '绍兴市' },
          { entNum: 6, areaCode: '330700', areaName: '金华市' },
          { entNum: 2, areaCode: '330800', areaName: '衢州市' },
          { entNum: 12, areaCode: '330900', areaName: '舟山市' },
          { entNum: 14, areaCode: '331000', areaName: '台州市' },
          { entNum: 26, areaCode: '331100', areaName: '丽水市' }
        ];
      }
      if (this.districtParams.adcode === '340000') {
        data = [
          { entNum: 12, areaCode: '340100', areaName: '合肥市' },
          { entNum: 16, areaCode: '340200', areaName: '芜湖市' },
          { entNum: 3, areaCode: '340300', areaName: '蚌埠市' },
          { entNum: 7, areaCode: '340400', areaName: '淮南市' },
          { entNum: 9, areaCode: '340500', areaName: '马鞍山市' },
          { entNum: 7, areaCode: '340600', areaName: '淮北市' },
          { entNum: 6, areaCode: '340700', areaName: '铜陵市' },
          { entNum: 2, areaCode: '340800', areaName: '安庆市' },
          { entNum: 12, areaCode: '341000', areaName: '黄山市' },
          { entNum: 14, areaCode: '341100', areaName: '滁州市' },
          { entNum: 26, areaCode: '341200', areaName: '阜阳市' },
          { entNum: 2, areaCode: '341300', areaName: '宿州市' },
          { entNum: 12, areaCode: '341500', areaName: '六安市' },
          { entNum: 14, areaCode: '341600', areaName: '亳州市' },
          { entNum: 26, areaCode: '341700', areaName: '池州市' },
          { entNum: 26, areaCode: '341800', areaName: '宣城市' }
        ];
      }
      this.$refs['base-amap-district-ref'].setStyles({
        fill: function(props) {
          const value = _get(
            _find(data, v => {
              return _toNumber(v.areaCode) === _toNumber(props.adcode);
            }),
            'entNum',
            0
          );
          return that.getColor(value);
        }
      });
    },
    /**
     * @desc 将市的区划修改为区县的区划
     */
    onChangeCounty() {
      if (this.districtParams.depth === 1) {
        this.districtParams.depth = 2;
      } else {
        this.districtParams.depth = 1;
      }
    },
    /**
     * @desc 切换到 安徽 省
     */
    onChangeProvince() {
      if (this.districtParams.adcode === '330000') {
        this.districtParams.adcode = '340000';
        this.amapManager
          .getMap()
          .setZoomAndCenter(7.5, [117.224242, 31.820687]);
        this.provinceText = '浙江省';
        return;
      }
      if (this.districtParams.adcode === '340000') {
        this.districtParams.adcode = '330000';
        this.amapManager.getMap().setZoomAndCenter(7.5, this.params.center);
        this.provinceText = '安徽省';
      }
    },
    getColor(val) {
      if (val <= 3) {
        return 'rgba(255,205,66,0.8)';
      } else if (val > 3 && val <= 10) {
        return 'rgba(77,140,244,0.8)';
      } else {
        return 'rgba(27,161,96,0.8)';
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
  .my-marker-cls {
    width: 120px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid gray;
    border-radius: 5px;
    > div {
      padding: 5px;
    }
  }
}
</style>
