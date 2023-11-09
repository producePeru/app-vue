<template>
  <div>
    <apexchart
     
      height="325"
      type="radialBar"
      :options="chartOptions"
      :series="series"
    ></apexchart>

    <div class="progress-info">
      <div class="info-item">
        <span>Meta al 2024</span>
        <h3>5000</h3>
        <span>100 %</span>
      </div>
      <div class="info-item">
        <span>Meta al 2024</span>
        <h3>5000</h3>
        <span>53 %</span>
      </div>
      <div class="info-item">
        <span>Meta al 2024</span>
        <h3>5000</h3>
        <span>53 %</span>
      </div>
    </div>
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
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        // responsive: [{
        //   breakpoint: 400,
        //   options: {
        //     chart: {
        //       width: '90%'
        //     }
        //   }
        // }],
        labels: ['Cricket'],
        title: {
          text: 'Progress Chart',
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
      series: [70],
    };
  },
};
</script>

<style lang="scss" scoped>
.progress-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // border: 1px solid red;
  margin-bottom: 1.5rem;
  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      font-size: 22px;
    }
  }
}
</style>