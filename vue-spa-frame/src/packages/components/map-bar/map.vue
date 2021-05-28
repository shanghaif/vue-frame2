<template>
  <div class="map-main-style">
    <div class="myMap" :id="mapId"></div>
    <div class="countInfo">
      <div class="radius"></div>
      <div class="label-style">{{ countName }}</div>
    </div>
  </div>
</template>

<script>
/**
 * @description 地图-地图柱状图（目前仅支持单维度，能够支持各种地方数据地图）
 * @author huangbeixian
 * @date 2021/02/23
 * @example <Map :mapData="mapData" countName="亩均税收（万元/亩）"></map>
 * @param {mapData|Array} 柱状图数据信息 - 必须
 *[
        { name: '广州市', value: 300 },
        { name: '深圳市', value: 200 },
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
      ]
  *@param {countName|string} 维度名称 - 必须
  *@param {mapUrl|string} 地图底层的数据json请求地址 - 必须，默认为广东地图，  支持全部的地方数据 （注意：获取地方数据可以于http://datav.aliyun.com/tools/atlas/#&lat=30.37018632615852&lng=106.68898666525287&zoom=3.5下载）
  *@param {mapName|string} 地图的名字，- 非必须，例如：广东/浙江/北京/上海 -  必须，默认为“广东”
  *@param {mapCenterPos|Object} 地图的位置信息 - 非必须，一般用于需要调整柱状图的所在位置所设，可以调整其对应位置的经纬度。注意：其名字必须与地图json内的名字一致，若不配置，即默认就是地图json内的中心质点经纬度
  *@param {zoom|Number} 缩放比例，可以根据其具体的容器做调整 - 非必须，默认为0.65
  *@param {scale|Number} 倾斜角，值越大其倾斜度越大，无倾斜角（平面其值为1） - 非必须，默认为1.25
  *@param {styleConfig|Object} 地图样式设置 - 非必须。
  * areaConfig: {     // 区域颜色设置
            isLinear: true, // 是否渐变
            areaColorType: 'linear-gradient', // 渐变类型，支持echarts的各种渐变类型
            areaColor: [  // 若是isLinear为true,则这里需要设置渐变色值，为false则固定色值
              {
                offset: 0,
                color: 'RGBA(0,7,15,1)'
              },
              {
                offset: 0.2,
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
          shadowConfig: {    // 阴影设置
            border: {      // 边框阴影
              color: 'rgba(93,158,254,.4)',   // 边框颜色
              width: 5,     // 边框宽度 
              shadowColor: '#6FFDFF',  // 阴影颜色
              shadowWidth: 10   // 阴影长度
            },
            bg: {   // 背景阴影
              color: 'rgba(0,14,25,1)',  // 颜色
              offsetY: 15,   // 偏移角度
              shadowWidth: 10   // 阴影宽度
            }
          }
  *@param {barConfig|Object} 3D柱状图样式设置 - 非必须。
  *{
      barColor: '#ffe400', // 柱体颜色
          barTopColor: '#d9bb73',  // 柱体顶部颜色，若是为平面，则其颜色不做设置
          barBottomColor: '#f4a224', // 柱体底部颜色，若是为平面，则其颜色不做设置
          barBottomShadowColor: 'rgba(0,12,15,0.8)' // 柱体底部投影颜色，若是为平面，则其颜色不做设置
  }
 */
import echarts from 'echarts';
const gdMapPos = {
  广州市: [113.507649675, 23.5200491021],
  东莞市: [113.863433991, 23.1930238154],
  中山市: [113.422060021, 22.7451775145],
  云浮市: [111.750945959, 23.1379756855],
  佛山市: [112.934025635, 23.2350948405],
  惠州市: [114.51065808, 23.3135398524],
  揭阳市: [116.079500855, 23.3479994669],
  梅州市: [116.126403098, 24.304570606],
  汕头市: [116.588650288, 23.4839084533],
  汕尾市: [115.572924289, 23.1787305002],
  江门市: [112.578125341, 22.2751167835],
  河源市: [114.913721476, 24.2572508505],
  深圳市: [114.025973657, 22.7960535462],
  清远市: [112.940773349, 24.3984685504],
  湛江市: [110.065067263, 21.2574631038],
  潮州市: [116.830075991, 23.9618116765],
  珠海市: [113.262447026, 22.2369146461],
  肇庆市: [112.37965337, 23.5786632829],
  茂名市: [110.831245331, 22.1682257188],
  阳江市: [111.677009756, 22.0715173045],
  韶关市: [113.594461107, 25.1029603119]
};
export default {
  props: {
    // 地图柱状图的统计维度数据
    mapData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    countName: {
      type: String,
      default: ''
    },
    mapUrl: {
      type: String,
      default: '/static/plugins/map/chart-map/guangdong.json'
    },
    mapName: {
      type: String,
      default: '广东'
    },
    mapCenterPos: {
      type: Object,
      default: () => {
        return null;
      }
    },
    isShowBarLable: {
      type: Boolean,
      default: false
    },
    zoom: {
      type: Number,
      default: 0.65
    },
    scale: {
      type: Number,
      default: 1.25
    },
    styleConfig: {
      type: Object,
      default: () => {
        return {
          areaConfig: {
            isLinear: true, // 是否渐变
            areaColorType: 'linear-gradient', // 渐变类型，支持echarts的各种渐变类型
            areaColor: [
              {
                offset: 0,
                color: 'RGBA(0,7,15,1)'
              },
              {
                offset: 0.2,
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
              shadowColor: '#6FFDFF',
              shadowWidth: 10
            },
            bg: {
              color: 'rgba(0,14,25,1)',
              offsetY: 15,
              shadowWidth: 10
            }
          }
        };
      }
    },
    barConfig: {
      type: Object,
      default: () => {
        return {
          barColor: '#ffe400',
          barTopColor: '#d9bb73',
          barBottomColor: '#f4a224',
          barBottomShadowColor: 'rgba(0,12,15,0.8)'
        };
      }
    }
  },
  data() {
    return {
      mapId: parseInt(Math.random() * 1000) + '_map'
    };
  },
  created() {},
  mounted() {
    this.initMap();
  },
  methods: {
    /**
     * @description 初始化地图
     */
    initMap() {
      var myChart = echarts.init(document.getElementById(this.mapId));
      let areaConfig = {};
      if (this.styleConfig.areaConfig.isLinear) {
        areaConfig = {
          type: this.styleConfig.areaConfig.areaColorType
            ? this.styleConfig.areaConfig.areaColorType
            : 'linear-gradient',
          x: 0,
          y: 0,
          x2: 500,
          y2: 0,
          colorStops: this.styleConfig.areaConfig.areaColor,
          global: true
        };
      } else {
        areaConfig = this.styleConfig.areaConfig.areaColor;
      }
      const zoom = this.zoom;
      const scale = this.scale;
      this.$axios.get(this.mapUrl).then(res => {
        const geoJson = res.data;
        echarts.registerMap(this.mapName, geoJson);
        const option = {
          legend: {
            show: false
          },
          geo: this.setMapGeo(),
          series: [
            {
              name: this.mapName + '地图',
              type: 'map',
              map: this.mapName,
              aspectScale: scale,
              zoom: zoom,
              showLegendSymbol: false,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  areaColor: areaConfig,
                  borderColor: '#0bf2f4',
                  borderWidth: 1
                },
                emphasis: {
                  areaColor: areaConfig
                }
              },
              layoutCenter: ['50%', '50%'],
              layoutSize: '180%',
              markPoint: {
                symbol: 'none'
              },
              data: []
            }
          ]
        };
        myChart.setOption(option);
        setTimeout(() => {
          this.renderEachCity(myChart, geoJson);
        }, 0);
      });
    },
    /**
     * @description 柱状图统计
     */
    renderEachCity(myChart, geoJson) {
      var option = {
        xAxis: [],
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (params.value) {
              return params.name + '：' + params.value;
            }
          }
        },
        yAxis: [],
        grid: [],
        series: []
      };
      // 读取是否有特殊的位置配置经纬度信息
      const geoCoordMap = this.getGeoCoordMap(geoJson);
      const labelStatus = this.isShowBarLable;
      const barStyle = this.barConfig;
      const mapDataMax = this.getMaxValue(this.mapData);
      echarts.util.each(this.mapData, function(item, idx) {
        if (geoCoordMap[item.name]) {
          var geoCoord = geoCoordMap[item.name];
          var coord = myChart.convertToPixel('geo', geoCoord);
          const id = idx + 1 + '';
          option.xAxis.push({
            id: id,
            gridId: id,
            type: 'category',
            name: item.name,
            show: false,
            nameLocation: 'middle',
            nameGap: 3,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false,
              onZero: false,
              lineStyle: {
                color: '#666'
              }
            },
            data: [item.name],
            z: 100
          });
          option.yAxis.push({
            id: id,
            gridId: id,
            show: false,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#1C70B6'
              }
            },
            min: 0,
            max: mapDataMax,
            z: 100
          });
          option.grid.push({
            id: id,
            width: 30,
            height: 40,
            left: coord[0] - 15,
            top: coord[1] - 25,
            z: 100
          });
          const _option = [
            {
              id: id + 'top',
              xAxisId: id,
              yAxisId: id,
              name: '',
              type: 'pictorialBar',
              symbolSize: [12, 5],
              symbolOffset: [0, -3],
              symbolPosition: 'end',
              z: 12,
              label: {
                normal: {
                  show: labelStatus,
                  position: 'top',
                  formatter: param => {
                    return param.name.replace('市', '') + '：' + param.value;
                  },
                  fontSize: 14,
                  backgroundColor: '#000e19',
                  color: '#0adee0',
                  padding: 8
                }
              },
              color: barStyle.barTopColor ? barStyle.barTopColor : '#ffe400',
              data: [item.value]
            },
            {
              id: id + 'end',
              xAxisId: id,
              yAxisId: id,
              name: '',
              type: 'pictorialBar',
              symbolSize: [12, 5],
              symbolOffset: [0, 3],
              z: 14,
              color: barStyle.barBottomColor
                ? barStyle.barBottomColor
                : barStyle.barTopColor,
              data: [item.value]
            },
            {
              id: id + 'endBottom',
              xAxisId: id,
              yAxisId: id,
              name: '',
              type: 'pictorialBar',
              symbolSize: [20, 5],
              symbolOffset: [0, 5],
              z: 12,
              color: barStyle.barBottomShadowColor
                ? barStyle.barBottomShadowColor
                : barStyle.barTopColor,
              data: [item.value]
            },
            {
              id: id,
              xAxisId: id,
              yAxisId: id,
              type: 'bar',
              barWidth: '12',
              barGap: '10%',
              barCateGoryGap: '10%',
              itemStyle: {
                normal: {
                  color: barStyle.barColor
                    ? barStyle.barColor
                    : barStyle.barTopColor
                }
              },
              data: [item.value]
            }
          ];
          option.series = option.series.concat(_option);
        }
      });
      myChart.setOption(option);
    },
    getMaxValue(data) {
      const values = [];
      if (data.length) {
        for (const item of data) {
          values.push(item.value);
        }
      }
      let max = 0;
      if (values) {
        max = Math.max.apply(null, values);
      }
      return max;
    },
    /**
     * @description 地图叠加效果
     */
    setMapGeo() {
      const zoom = this.zoom;
      const scale = this.scale;
      let borderShadowConfig = {
        borderColor: 'rgba(11,242,244,.4)',
        borderWidth: 3,
        shadowColor: '#6FFDFF',
        shadowOffsetY: 0,
        shadowBlur: 10,
        areaColor: 'rgba(11,242,244,.4)'
      };
      if (
        this.styleConfig.shadowConfig &&
        this.styleConfig.shadowConfig.border
      ) {
        const borderConfigs = this.styleConfig.shadowConfig.border;
        borderShadowConfig = {
          borderColor: borderConfigs.color
            ? borderConfigs.color
            : 'rgba(11,242,244,.4)',
          borderWidth: borderConfigs.width ? borderConfigs.width : 3,
          shadowColor: borderConfigs.shadowColor
            ? borderConfigs.shadowColor
            : '#6FFDFF',
          shadowOffsetY: 0,
          shadowBlur: borderConfigs.shadowWidth
            ? borderConfigs.shadowWidth
            : 10,
          areaColor: borderConfigs.color
            ? borderConfigs.color
            : 'rgba(11,242,244,.4)'
        };
      }
      let yyShadowConfig = {
        borderColor: 'rgba(0,14,25,1)',
        shadowColor: 'rgba(0,14,25,1)',
        shadowOffsetY: 15,
        shadowBlur: 8,
        areaColor: 'rgba(0,14,25,1)'
      };
      if (this.styleConfig.shadowConfig && this.styleConfig.shadowConfig.bg) {
        const bgOptions = this.styleConfig.shadowConfig.bg;
        const bgColor = bgOptions.color ? bgOptions.color : 'rgba(0,14,25,1)';
        yyShadowConfig = {
          borderColor: bgColor,
          shadowColor: bgColor,
          shadowOffsetY: bgOptions.offsetY ? bgOptions.offsetY : 15,
          shadowBlur: bgOptions.shadowWidth ? bgOptions.shadowWidth : 8,
          areaColor: bgColor
        };
      }
      const geoConfig = [
        {
          map: this.mapName,
          aspectScale: scale,
          zoom: zoom,
          layoutCenter: ['50%', '50%'],
          layoutSize: '180%',
          show: true,
          roam: false,
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: borderShadowConfig
          },
          emphasis: {
            areaColor: borderShadowConfig.borderColor
          }
        },
        {
          type: 'map',
          map: this.mapName,
          zlevel: -1,
          aspectScale: scale,
          zoom: zoom,
          layoutCenter: ['50%', '52.1%'],
          layoutSize: '180%',
          roam: false,
          silent: true,
          itemStyle: {
            normal: yyShadowConfig
          }
        }
      ];
      return geoConfig;
    },
    /**
     * @description 获取特殊位置配置信息
     */
    getGeoCoordMap(geoJson) {
      let gdGeoCoordMap = {};
      if (this.mapCenterPos === null) {
        if (this.mapName === '广东') {
          gdGeoCoordMap = gdMapPos;
        } else {
          if (geoJson && geoJson.features) {
            for (const item of geoJson.features) {
              if (
                item.properties &&
                item.properties.name &&
                item.properties.centroid
              ) {
                gdGeoCoordMap[item.properties.name] = item.properties.centroid;
              }
            }
          }
        }
      } else {
        gdGeoCoordMap = this.mapCenterPos;
      }
      return gdGeoCoordMap;
    }
  }
};
</script>
