<template>

  <section>
    <a-row :gutter="30">
      <a-col :md="5" class="side-left">
        <div>
          <h3>Calendario de eventos</h3>

          <a-button type="primary" :icon="h(PlusOutlined)" style="margin-top: .5rem;">CREAR</a-button>

          <!-- <div class="small-calendar">
            <a-calendar v-model:value="value" :fullscreen="false" />
          </div> -->

          <div style="margin: 1.5rem 0;">
            <label>
              <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
              toggle semana
            </label>
          </div>


          <div>
            <a-flex justify="space-between" style="margin: 1rem 0;">
              <h4>Filtrar por:</h4>
              <PlusCircleOutlined class="icon-add-category" />
            </a-flex>

            <div class="check-wrapper" :class="wow && 'item-check'">
              <div class="ckeck-box" :style="{ background: 'red' }">
                <CheckOutlined class="check-icon" />
              </div>
              <div class="check-text">Cumpleaños</div>
            </div>

            <div class="check-wrapper" :class="wow && 'item-check'">
              <div class="ckeck-box" :style="{ background: 'orange' }">
                <CheckOutlined class="check-icon" />
              </div>
              <div class="check-text">Feria café</div>
            </div>

            <div class="check-wrapper">
              <div class="ckeck-box" :style="{ background: '#fff' }">
                <CheckOutlined class="check-icon" />
              </div>
              <div class="check-text">Cyber wow</div>
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
  </section>






</template>

<script setup>
import { h, ref } from 'vue';
import { PlusOutlined, CheckOutlined, PlusCircleOutlined } from '@ant-design/icons-vue';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

import FormEvento from './components/FormEventos.vue';

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

const dateSelected = ref(null);
const wow = ref(true);
const value = ref();
const toggleModal = ref(false);
const currentEvents = ref([])

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

function handleWeekendsToggle() {
  calendarOptions.value.weekends = !calendarOptions.value.weekends
}

function handleDateSelect(selectInfo) {

  const endDate = new Date(selectInfo.endStr);
  endDate.setDate(endDate.getDate() - 1);
  selectInfo.end = endDate;
  const endStr = endDate.toISOString().split('T')[0];

  dateSelected.value = {
    start:  selectInfo.startStr,
    end:    endStr,
    allDay: selectInfo.allDay
  };

  toggleModal.value = true;


  // const endDate = new Date(selectInfo.end);
  // endDate.setDate(endDate.getDate() - 1);

  // // Actualizar el selectInfo con la nueva fecha de fin
  // dateSelected.value = {
  //   start: selectInfo.start,
  //   end: endDate,
  //   allDay: selectInfo.allDay
  // };

  // toggleModal.value = true;

  // console.log("select", selectInfo);

  // let title = prompt('Please enter a new title for your event')
  // let calendarApi = selectInfo.view.calendar

  // calendarApi.unselect() // clear date selection

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

function handleEventClick(clickInfo) {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}

function handleEvents(events) {
  currentEvents.value = events
}
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
  width: 15px;
  height: 5px;
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