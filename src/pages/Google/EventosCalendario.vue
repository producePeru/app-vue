<template>

  <section>
    <a-row :gutter="30">
      <a-col :md="5" class="side-left">
        <div>
          <h3>CALENDARIO</h3>

          <a-button type="primary" :icon="h(PlusOutlined)" style="margin-top: .5rem;">CREAR</a-button>

          <!-- <div class="small-calendar">
            <a-calendar v-model:value="value" :fullscreen="false" />
          </div> -->

          <!-- <div style="margin: 1.5rem 0;">
            <label>
              <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
              toggle semana
            </label>
          </div> -->

  
          <div style="margin: 2rem 0;">
            <a-flex justify="space-between" >
              <h5>CATEGORÍAS:</h5>
              <PlusCircleOutlined class="icon-add-category" @click="toggleModalCategoria = true" />
            </a-flex>

              <div 
              v-for="(item, idx) in categories" 
              :key="idx" 
              class="check-wrapper" 
              :class="item.status == 1 && 'item-check'" 
              @click="handleToggleCategory(item)">
                
              <a-spin :indicator="indicator" :spinning="item.id == spinning ? true : false" style="margin-left: -3px; margin-top: 1px;">
                <div class="ckeck-box" :style="{ background: item.status == 1 ? item.color : 'transparent' }">
                  <CheckOutlined v-if="item.status == 0" style="color: #fff;" />
                  <CheckOutlined v-else class="check-icon" :style="{ color: item.color === 'yellow' || item.color === 'white' ? '#606060' : 'white' }" />
                </div>
              </a-spin>

                <div class="check-text">{{ item.name }}</div>
              </div>
            
          </div>

        </div>
      </a-col>



      <a-col :md="19">
        <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
          <template v-slot:eventContent='arg'>
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
          </template>
        </FullCalendar>
      </a-col>
    </a-row>

    <a-modal v-model:open="toggleModal" title="Nuevo Evento" footer width="480px">
      <FormEvento :info="dateSelected" />
    </a-modal>

    <a-modal v-model:open="toggleModalCategoria" title="Categoría" footer width="350px">
      <FormCategoria @closeDraw="closeDraw" />
    </a-modal>
  </section>






</template>

<script setup>
import { h, ref, onMounted } from 'vue';
import { makeRequest } from '@/utils/api.js';
import { PlusOutlined, CheckOutlined, PlusCircleOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

import FormEvento from './components/FormEventos.vue';
import FormCategoria from './components/FormCategorias.vue';

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

function createEventId() {
  return String(eventGuid++)
}

const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]

const categories = ref(null);
const loading = ref(true);
const dateSelected = ref(null);
const categoryActive = ref(true);
const value = ref();
const toggleModal = ref(false);
const toggleModalCategoria = ref(false);
const currentEvents = ref([]);
const spinning = ref(0);

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '18px',
  }
});
const calendarOptions = ref({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin // needed for dateClick
  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  buttonText: {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día'
  },
  initialView: 'dayGridMonth',
  initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  locale: 'es',
})

const closeDraw = () => {
  toggleModalCategoria.value = false;
  fetchData();
}

function handleWeekendsToggle() {
  calendarOptions.value.weekends = !calendarOptions.value.weekends
}

function handleDateSelect(selectInfo) {
  dateSelected.value = {
    start:  selectInfo.startStr,
    end:    selectInfo.endStr,
    allDay: selectInfo.allDay
  };

  toggleModal.value = true;

  // if (title) {
  //   calendarApi.addEvent({
  //     id: createEventId(),
  //     title,
  //     start: selectInfo.startStr,
  //     end: selectInfo.endStr,
  //     allDay: selectInfo.allDay
  //   })
  // }
}

const handleToggleCategory = async(item) => {
  try {
    spinning.value = item.id;
    const data = await makeRequest({ url: `event/status-categories/${item.id}`, method: 'PUT' });
    if(data.status == 200) fetchData()
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    spinning.value = 0;
  }
}

function handleEventClick(clickInfo) {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}

function handleEvents(events) {
  currentEvents.value = events
}

const fetchData = async() => {
  try {
    loading.value = true;
    const {data} = await makeRequest({ url: 'event/list-categories', method: 'GET' });
    categories.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.side-left {
  /* background: #eaf9ff; */
  height: auto;
  padding: 1rem;
  border-radius: 4px;
}

.small-calendar {
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  margin: 1.5rem 0;
}

.check-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
}

.ckeck-box {
  border-radius: 4px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
}

.icon-add-category {
  cursor: pointer;
  width: 16px;
  height: 8px;
  display: inline-block;
  &:hover {
    color: var(--primary);
  }
}

.check-icon {
  color: white;
  font-size: 13px;
}

.check-text {
  color: #0066cc;
  font-size: 12px;
  font-weight: 400;
}

.item-check {
  background-color: #e6eff7;

  // .check-text {
  //   font-weight: 500;
  // }
}
</style>

<style lang="scss">
/* schaders */
.fc-col-header-cell-cushion,
.fc-daygrid-day-number {
  color: #000000e0;
}
.fc-daygrid-day-number {
  font-size: 12px;
}

.fc-col-header-cell-cushion {
  font-weight: 400;
  font-size: 12px;
}
</style>