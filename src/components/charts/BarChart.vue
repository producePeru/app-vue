<template>
  <div>
    <apexchart
    :height="height"
    type="bar"
    :options="chartOptions"
    :series="series" />
  </div>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    categories: {
      type: Array,
      default: []
    },
    values: {
      type: Array,
      default: []
    },
    height: {
      type: Number,
      default: 300
    }
  },

  data() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
          toolbar: {
            show: true, 
            tools: {
              download: true
            },
          }
        },
        xaxis: {
          categories: this.categories,
        },
        title: {
          text: this.title, 
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '18px',
            color: '#333'
          },
        },
      },
      series: this.values,
    };
  },
};
</script>
