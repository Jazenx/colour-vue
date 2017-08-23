<template>
  <div :class="className" :id="id" :style="{height:height,width:width}">
  </div>
</template>

<script>
import echarts from 'echarts';
// import 'assets/echarts/map/china';
import 'echarts/map/js/china.js';
import { getWeiboData } from 'api/tiger';
export default {
  name: 'tigerChinaMap',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '1000px'
    },
    height: {
      type: String,
      default: '800px'
    }
  },
  data() {
    return {
      chart: null,
      weibo: []
    }
  },
  mounted() {
    this.getWeiboList();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose();
    this.chat = null;
  },
  methods: {
    getWeiboList() {
      getWeiboData()
        .then(response => {
          this.weibo = response.data;
          this.initChart();
        })
        .catch(err => console.log(err))
    },
    showData() {
      console.log(this.weibo);
    },
    initChart() {
      console.log(this.weibo);
      this.weibo = this.weibo.map(serieData => {
        let px = serieData[0] / 1000;
        let py = serieData[1] / 1000;
        const res = [[px, py]];

        for (let i = 2; i < serieData.length; i += 2) {
          const dx = serieData[i] / 1000;
          const dy = serieData[i + 1] / 1000;
          const x = px + dx;
          const y = py + dy;
          res.push([x.toFixed(2), y.toFixed(2), 1]);
          px = x;
          py = y;
        }
        return res;
      });
      console.log(this.weibo);
      this.chart = echarts.init(document.getElementById(this.id));
      const option = {
        backgroundColor: '#404a59',
        title: {
          text: '中国热点图',
          subtext: 'From Jason',
          sublink: '',
          left: 'center',
          top: 'top',
          textStyle: {
            color: '#fff'
          }
        },
        // tooltip: {},
        legend: {
          left: 'left',
          data: ['弱', '中', '强'],
          textStyle: {
            color: '#ccc'
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [{
          name: '弱',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          large: true,
          itemStyle: {
            normal: {
              shadowBlur: 2,
              shadowColor: 'rgba(37, 140, 249, 0.8)',
              color: 'rgba(37, 140, 249, 0.8)'
            }
          },
          data: this.weibo[0]
        }, {
          name: '中',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          large: true,
          itemStyle: {
            normal: {
              shadowBlur: 2,
              shadowColor: 'rgba(14, 241, 242, 0.8)',
              color: 'rgba(14, 241, 242, 0.8)'
            }
          },
          data: this.weibo[1]
        }, {
          name: '强',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          large: true,
          itemStyle: {
            normal: {
              shadowBlur: 2,
              shadowColor: 'rgba(255, 255, 255, 0.8)',
              color: 'rgba(255, 255, 255, 0.8)'
            }
          },
          data: this.weibo[2]
        }]
      }
      this.chart.setOption(option);
    }
  }
}
</script>