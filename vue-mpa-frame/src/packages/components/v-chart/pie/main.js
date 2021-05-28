export default {
  name: 'BasePieChart',
  data() {
    // 默认的series属性
    this.DEFAULT_SERIES = {
      name: '',
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    };

    this.DEFAULT_OPTION = {
      title: {
        text: '',
        subtext: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      }
    };

    return {};
  }
};
