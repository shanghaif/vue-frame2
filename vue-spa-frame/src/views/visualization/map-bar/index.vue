<template>
  <div>
    <div class="map-style">
      <Map
        :mapData="mapData"
        countName="亩均税收（万元/亩）"
        mapUrl="/static/plugins//map/guangdong.json"
        mapName="广东"
        :zoom="0.6"
      ></Map>
    </div>
    <div class="map-style">
      <Map
        :mapData="chinaMapData"
        countName="亩均税收（万元/亩）"
        mapUrl="/static/plugins//map/china.json"
        mapName="全国"
        :isShowBarLable="true"
        :zoom="0.6"
        :scale="1.1"
        :styleConfig="styleConfig"
        :barConfig="barConfig"
      ></Map>
    </div>
  </div>
</template>
<script>
/**
 * @description 大屏-省视图
 */
import Map from '@packages/components/map-bar';

export default {
  components: { Map },
  data() {
    return {
      mapData: [
        { name: '广州市', value: 10 },
        { name: '深圳市', value: 90 },
        { name: '佛山市', value: 1200 },
        { name: '中山市', value: 390 },
        { name: '云浮市', value: 380 },
        { name: '惠州市', value: 160 },
        { name: '揭阳市', value: 460 },
        { name: '梅州市', value: 670 },
        { name: '汕头市', value: 350 },
        { name: '汕尾市', value: 390 },
        { name: '江门市', value: 400 },
        { name: '河源市', value: 430 },
        { name: '深圳市', value: 300 },
        { name: '清远市', value: 300 },
        { name: '湛江市', value: 300 },
        { name: '潮州市', value: 300 },
        { name: '珠海市', value: 300 },
        { name: '肇庆市', value: 300 },
        { name: '茂名市', value: 300 },
        { name: '阳江市', value: 300 },
        { name: '韶关市', value: 300 },
        { name: '东莞市', value: 300 }
      ],
      chinaMapData: [
        { name: '广东省', value: 80 },
        { name: '山西省', value: 20 },
        { name: '北京市', value: 100 },
        { name: '广西省', value: 390 },
        { name: '河北省', value: 390 },
        { name: '辽宁省', value: 390 }
      ],
      styleConfig: {
        areaConfig: {
          isLinear: true, // 是否渐变
          areaColorType: 'linear-gradient', // 渐变类型，支持echarts的各种渐变类型
          areaColor: [
            {
              offset: 0,
              color: 'RGBA(0,32,80,1)'
            },
            {
              offset: 0.5,
              color: 'RGBA(0,88,221,1)'
            },
            {
              offset: 1,
              color: 'RGBA(8,113,223,1)'
            }
          ]
        },
        shadowConfig: {
          border: {
            color: 'rgba(93,158,254,.4)',
            width: 5,
            shadowColor: '#5d9efe',
            shadowWidth: 20
          },
          bg: {
            color: 'rgba(255,255,255,.8)',
            offsetY: 15,
            shadowWidth: 10
          }
        }
      },
      barConfig: {
        barColor: '#75ffff',
        barTopColor: '#00d7d8',
        barBottomColor: '#2ad8d8',
        barBottomShadowColor: 'rgba(0,12,15,0.8)'
      }
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.map-style {
  position: relative;
  float: left;
  width: 49%;
  height: 700px;
  background-color: rgb(32, 52, 70);
}
.map-style:last-child {
  margin-left: 2%;
}
</style>
