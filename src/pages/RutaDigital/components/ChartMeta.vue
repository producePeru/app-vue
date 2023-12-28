<template>
  <div class="report-box">
    <div class="title">
      <h4>Avance de MYPE registrados</h4>
    </div>
    
    <apexchart type="radialBar" height="200" :options="chartOptions" :series="series" />
    
    <div class="info">
      <div>
        <span class="info-head">Meta al <b>{{ total.year }}</b></span>
        <a-tag color="success" class="info-tag">{{ total.meta }}</a-tag>
      </div>  
      <div>
        <span class="info-head">Avance <b>{{ total.porcAvance }}%</b></span>
        <h3>{{ total.avance }}</h3>
      </div>  
      <div>
        <span class="info-head">Brecha <b>{{ total.porcBrecha }}%</b></span>
        <a-tag color="warning" class="info-tag">{{ total.brecha }}</a-tag>
      </div>  
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['total'])

const chartOptions = {
  chart: {
    id: 'radial-bar-chart',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%',
      },
      dataLabels: {
        name: {
          fontSize: '22px',
        },
        value: {
          fontSize: '16px',
        },
        total: {
          show: true,
          label: 'Total',
          formatter: function () {
            return  `${props.total.porcAvance}%`;
          },
        },
      },
    },
  },
  labels: ['Categoria 1'],
};

const series = [props.total.porcAvance];
</script>

<style lang="scss" scoped>
.radial {
  text-align: center;
  margin: .6rem 0 1.5rem 0;
}
.info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  &-head {
    display: block;
    margin-bottom: .4rem;
    b {
      display: block;
    }
  }
  .info-tag {
    font-size: 16px;
    font-weight: 500;
  }
}
</style>