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
            <a-flex justify="space-between">
              <h5>CATEGORÍAS:</h5>
              <PlusCircleOutlined class="icon-add-category" @click="toggleModalCategoria = true" />
            </a-flex>

            <div v-for="(item, idx) in categories" :key="idx" class="check-wrapper"
              :class="item.status == 1 && 'item-check'" @click="handleToggleCategory(item)">

              <a-spin :indicator="indicator" :spinning="item.id == spinning ? true : false"
                style="margin-left: -3px; margin-top: 1px;">
                <div class="ckeck-box" :style="{ background: item.status == 1 ? item.color : 'transparent' }">
                  <CheckOutlined v-if="item.status == 0" style="color: #fff;" />
                  <CheckOutlined v-else class="check-icon"
                    :style="{ color: item.color === 'yellow' || item.color === 'white' ? '#606060' : 'white' }" />
                </div>
              </a-spin>

              <div class="check-text">{{ item.name }}</div>
            </div>

          </div>

        </div>
      </a-col>



      <a-col :md="19">
        <a-spin :spinning="loading">


          <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
            <template v-slot:eventContent='arg'>

              <a-popover trigger="hover">





                <template #content>
                  <div class="event-tooltip">
                    <span>{{ arg.event.title }}</span>
                    <!-- <span>{{ arg.event.start }}</span> -->
                     <span>{{ arg.event.backgroundColor }}</span>
                     <span>{{ arg.event.extendedProps.description }}</span>
                     <a :href="arg.event.extendedProps.linkVideo" >Link</a>
                  </div>
                </template>






                <div>
                  <b>{{ arg.timeText }}</b>
                  <i>{{ arg.event.title }}</i>
                </div>
              </a-popover>

            </template>
          </FullCalendar>


        </a-spin>
      </a-col>
    </a-row>

    <a-modal v-model:open="toggleModal" title="Nuevo Evento" footer width="480px">
      <FormEvento :info="dateSelected" :pcategories="categories" @closeDraw="closeDraw('create-event')" />
    </a-modal>

    <a-modal v-model:open="toggleModalCategoria" title="Categoría" footer width="350px">
      <FormCategoria @closeDraw="closeDraw" />
    </a-modal>

    <!-- <pre>{{INITIAL_EVENTS}}</pre> -->
  </section>






</template>

<script setup>
import { h, ref, onMounted, watch } from 'vue';
import dayjs from 'dayjs';
import { makeRequest } from '@/utils/api.js';
import { PlusOutlined, CheckOutlined, PlusCircleOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

import FormEvento from './components/FormEventos.vue';
import FormCategoria from './components/FormCategorias.vue';

const setMonth = ref(null);
const setYear = ref(null);

const INITIAL_EVENTS = ref([]);
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
    interactionPlugin
  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: ''
  },
  buttonText: {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día'
  },
  initialView: 'dayGridMonth',
  initialEvents: INITIAL_EVENTS,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  locale: 'es',
  eventColor: '#ffcccb',
  eventBorderColor: 'transparent',
  datesSet: handleDatesSet
})

const closeDraw = (type) => {

  console.log("ksksksksk", type);


  if (type == 'create-event') {
    toggleModal.value = false
  }
  toggleModalCategoria.value = false;
  fetchData(setMonth, setYear);         // al cerrar modal de crear evento
}



function handleDatesSet(dateInfo) {
  const start = dateInfo.view.currentStart;
  const monthNumber = start.getMonth() + 1;
  const year = start.getFullYear();

  setMonth.value = monthNumber;
  setYear.value = year;

  fetchData(monthNumber, year);

}


function handleWeekendsToggle() {
  calendarOptions.value.weekends = !calendarOptions.value.weekends
}

function handleDateSelect(selectInfo) {
  let endDate = selectInfo.end;

  if (selectInfo.allDay) {
    endDate = dayjs(selectInfo.end).subtract(1, 'day').format('YYYY-MM-DD');
  } else {
    endDate = dayjs(selectInfo.end).format('YYYY-MM-DDTHH:mm');
  }

  dateSelected.value = {
    start: dayjs(selectInfo.start).format('YYYY-MM-DDTHH:mm'),
    end: endDate,
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

const handleToggleCategory = async (item) => {
  try {
    spinning.value = item.id;
    const data = await makeRequest({ url: `event/status-categories/${item.id}`, method: 'PUT' });
    // if(data.status == 200) fetchData()
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    spinning.value = 0;
  }
}

function handleEventClick(clickInfo) {
  // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //   clickInfo.event.remove()
  // }
}

function handleEvents(events) {
  // currentEvents.value = events
  // console.log("hOOOLA", events);
}

const fetchData = async () => {
  try {
    loading.value = true;

    const events = await makeRequest({ url: `event/list?month=${setMonth.value}&year=${setYear.value}`, method: 'GET' });
    INITIAL_EVENTS.value = events

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

const fetchDataCategories = async () => {
  try {
    const { data } = await makeRequest({ url: 'event/list-categories', method: 'GET' });
    categories.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}

onMounted(() => {
  fetchDataCategories();
});

watch(INITIAL_EVENTS, (newEvents) => {
  calendarOptions.value.events = newEvents;
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
.event-tooltip {

}

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

.fc-event {
  b {
    margin-right: 3px;
  }
}


.fc .fc-button {
  background-color: var(--primary) !important;
  font-size: 13px;
  border: none !important;
  cursor: pointer;

  &:focus {
    // box-shadow: rgba(40, 100, 90, 0.5) 0px 0px 0px 0.15rem;
  }
}
</style>