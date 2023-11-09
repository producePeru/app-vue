<template>
  <div>
    <apexchart
      height="400"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>

    <pre>::: {{ values }}</pre>
  </div>

</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      // default: null
    },
    values: {
      type: Array,
      // default: []
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
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true
            },
          }
        },
        xaxis: {
          categories: this.categories,
        },
        title: {
          text: 'Historical Data', 
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '20px',
            color: '#333'
          },
        },
      },
      series: this.values,
    };
  },
};
</script>
