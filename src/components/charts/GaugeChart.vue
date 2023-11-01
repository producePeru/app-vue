<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GaugeChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

use([
  CanvasRenderer,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

// provide(THEME_KEY, 'dark');

const gaugeData = [
  {
    value: 20,
    name: 'Perfect',
    title: {
      offsetCenter: ['0%', '-20rem']
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '4rem']
    }
  },

 
];

const option = ref({
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          borderWidth: 1,
          borderColor: 'red'
        }
      },
      axisLine: {
        lineStyle: {
          width: 20
        }
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false,
        distance: 50
      },
      data: gaugeData,
      title: {
        fontSize: 14
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 14,
        color: 'inherit',
        borderColor: 'inherit',
        borderRadius: 20,
        borderWidth: 1,
        formatter: '{value}%'
      }
    }
  ]
})

// setInterval(function () {
//   gaugeData[0].value = +(Math.random() * 100).toFixed(2);
//   gaugeData[1].value = +(Math.random() * 100).toFixed(2);
//   gaugeData[2].value = +(Math.random() * 100).toFixed(2);
//   myChart.setOption<echarts.EChartsOption>({
//     series: [
//       {
//         data: gaugeData,
//         pointer: {
//           show: false
//         }
//       }
//     ]
//   });
// }, 2000);








// const option = ref({
//   title: {
//     text: 'Traffic Sources',
//     left: 'center',
//   },
//   tooltip: {
//     trigger: 'item',
//     formatter: '{a} <br/>{b} : {c} ({d}%)',
//   },
//   legend: {
//     orient: 'vertical',
//     left: 'left',
//     data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
//   },
//   series: [
//     {
//       name: 'Traffic Sources',
//       type: 'pie',
//       radius: '55%',
//       center: ['50%', '60%'],
//       data: [
//         { value: 335, name: 'Direct' },
//         { value: 310, name: 'Email' },
//         { value: 234, name: 'Ad Networks' },
//         { value: 135, name: 'Video Ads' },
//         { value: 1548, name: 'Search Engines' },
//       ],
//       emphasis: {
//         itemStyle: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 0, 0, 0.5)',
//         },
//       },
//     },
//   ],
// });


</script>

<style scoped>
.chart {
  height: 300px;
  border: 1px solid red                      ;
}
</style>
