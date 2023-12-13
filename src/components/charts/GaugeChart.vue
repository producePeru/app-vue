<template>
  <div>
    <apexchart
      height="250"
      type="radialBar"
      :options="chartOptions"
      :series="series"
    ></apexchart>

    <div class="progress-info">
      <div class="info-item">
        <span>Meta al 2024</span>
        <a-tag class="porcentage-tag" color="success"><h3>{{ meta }}</h3></a-tag>
        <span>100 %</span>
      </div>

      <div class="info-item">
        <span>Avance</span>
        <a-tag class="porcentage-tag" color="processing"><h3>{{ avance }}</h3></a-tag>
        <span>{{ porcentage[0] }} % </span>
      </div>

      <div class="info-item">
        <span>Brecha</span>
        <a-tag class="porcentage-tag" color="warning"><h3>{{ meta - avance }}</h3></a-tag>
        <span>{{ 100 - porcentage[0] }} %</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Number,
      default: 0
    },
    avance: {
      type: Number,
      default: 0
    },
    porcentage: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
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
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        labels: ['Total'],
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
      series: this.porcentage,
    };
  }
};
</script>

<style lang="scss" scoped>
.progress-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // border: 1px solid red;
  // margin-bottom: 1.5rem;
  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .porcentage-tag {
      margin: .2rem 0;
    }
    h3 {
      font-size: 22px;
      margin: 0;
      padding: 4px;
    }
  }
}
</style>