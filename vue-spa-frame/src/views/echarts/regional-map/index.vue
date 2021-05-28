<template>
  <div class="mapContent"><div id="map" class="map"></div></div>
</template>

<script>
import echarts from 'echarts';

// 默认地图数据为 湖北省 武汉市 江下区
export default {
  data() {
    return {
      contrastMap: {
        1: 'provinceData',
        2: 'cityData',
        3: 'countyData'
      }, // 对照表
      mapLevel: 1, // 1、省 2、市 3、区县
      provinceData: [
        { name: '武汉市', value: 396 },
        { name: '黄石市', value: 66 },
        { name: '十堰市', value: 222 },
        { name: '宜昌市', value: 688 },
        { name: '襄阳市', value: 75 },
        { name: '鄂州市', value: 121 },
        { name: '荆门市', value: 91 },
        { name: '孝感市', value: 479 },
        { name: '荆州市', value: 34 },
        { name: '黄冈市', value: 631 },
        { name: '咸宁市', value: 1203 },
        { name: '随州市', value: 988 },
        { name: '神农架林区', value: 631 },
        { name: '天门市', value: 1203 },
        { name: '潜江市', value: 988 },
        { name: '仙桃市', value: 988 },
        { name: '恩施土家族苗族自治州', value: 693 }
      ], // 省级数据
      cityData: [
        { name: '江安区', value: 396 },
        { name: '江汉区', value: 66 },
        { name: '硚口区', value: 222 },
        { name: '汉阳区', value: 688 },
        { name: '武昌区', value: 75 },
        { name: '青山区', value: 121 },
        { name: '洪山区', value: 91 },
        { name: '东西湖区', value: 479 },
        { name: '汉南区', value: 34 },
        { name: '蔡甸区', value: 631 },
        { name: '江夏区', value: 1203 },
        { name: '黄陂区', value: 988 },
        { name: '新洲区', value: 631 }
      ], // 市级需求
      countyData: [], // 区县数据
      currentCity: 'hubei'
    };
  },
  created() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    /**
     * @description 初始化地图
     */
    initMap(maxVal, mapData) {
      this.myChart = null;
      const url = `/static/plugins/map/${this.currentCity}.json`;
      const chartDom = document.getElementById('map');
      const dataList = this[this.contrastMap[this.mapLevel]];

      const geoCoordMap = {};

      const convertData = function(data) {
        var res = [];

        for (let i = 0; i < data.length; i++) {
          const geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }

        return res;
      };

      this.myChart = echarts.init(chartDom);

      this.$axios.get(url).then(res => {
        echarts.registerMap('hbs', res.data);

        const mapFeatures = echarts.getMap('hbs').geoJson.features;
        this.myChart.hideLoading();
        mapFeatures.forEach(function(v) {
          // 地区名称
          const name = v.properties.name;
          // 地区经纬度
          geoCoordMap[name] = v.properties.center;
        });

        const option = {
          title: {
            text: '地图',
            top: '2%',
            textStyle: {
              color: '#000',
              fontSize: 16
            }
          },
          visualMap: [
            {
              min: 0,
              max: 1000,
              show: false,
              //   text: ['High', 'Low'],
              realtime: false,
              calculable: false,
              seriesIndex: [0],
              inRange: {
                color: [
                  'rgb(202,249,130)',
                  'rgb(129,211,248)',
                  'rgb(255,255,128)',
                  'rgb(128,255,255)',
                  'rgb(0,255,255)',
                  'rgb(128,128,255)',
                  'rgb(236,128,141)',
                  'rgb(194,128,255)',
                  'rgb(245,154,35)',
                  'rgb(112,182,3)',
                  'rgb(0,182,128)',
                  'rgb(99,0,191)'
                ]
              }
            },
            {
              min: 0,
              max: 1000,
              seriesIndex: 1,
              show: true,
              splitNumber: 4,
              right: '2%',
              inRange: {
                color: ['#FF6464', '#FFA85A', '#FFEC6F', '#8BBCFE'].reverse()
              },
              formatter: function(value) {
                return '';
              }
            }
          ],
          geo: {
            map: 'hbs',
            show: false,
            roam: true,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            }
          },
          series: [
            {
              // 地图块的相关信息
              type: 'map',
              map: 'hbs',
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 12,
                    fontWeight: 400,
                    color: 'rgb(0,0,0) '
                  }
                }
              },
              data: dataList
            },
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'pin',
              symbolSize: [40, 40],
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#000',
                    fontSize: 10,
                    fontWeight: 600
                  },
                  formatter(value) {
                    return value.data.value[2];
                  }
                }
              },
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  color: 'pink' // 标志颜色
                }
              },
              zlevel: 6,
              data: convertData(dataList)
            }
          ]
        };

        this.myChart.setOption(option, true);

        // this.myChart.on('click', params => {
        //   const { name, adcode } = params.data;
        //   this.cityCode = adcode;
        //   this.city = name;
        // });
      });
    },
    /**
     * @description 为图表计算高度
     * @param { object } container 父容器
     * @param { object }  charts 图像dom
     * @param { number } proportion 高度占比
     */
    chartssize({ container, charts, widthPercent, heightPercent }) {
      function getStyle(el, name) {
        if (window.getComputedStyle) {
          return window.getComputedStyle(el, null);
        } else {
          return el.currentStyle;
        }
      }

      if (widthPercent && widthPercent > 0) {
        const parentWidth = getStyle(container, 'width').width;
        const width = `${parentWidth.slice(0, -2) * widthPercent}px`;

        charts.style.width = width;
      }

      if (heightPercent && heightPercent > 0) {
        const parenttHeight = getStyle(container, 'height').height;
        const height = `${parenttHeight.slice(0, -2) * heightPercent}px`;

        charts.style.height = height;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mapContent {
  width: 100%;

  .map {
    width: 1400px;
    height: 900px;
  }
}
</style>
