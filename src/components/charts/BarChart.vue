<template>
  <div>
    <apexchart
      height="400"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
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
          categories: [1991, 1992, 1993, 1994, 1995, 1996],
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
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60],
        },
      ],
    };
  },
};
</script>
