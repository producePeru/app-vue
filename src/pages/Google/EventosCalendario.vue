<template>

  <section>
    <a-row :gutter="16">
      <a-col :md="5" class="side-left">
        <div>
          <h3>Calendario de eventos</h3>
          <div class='demo-app-sidebar-section'>
            <label>
              <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
              toggle weekends
            </label>
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

    <a-modal v-model:open="toggleModal" title="Nuevo Evento" footer>
      <FormEvento />
    </a-modal>
  </section>






</template>

<script setup>
import { ref } from 'vue'
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
  toggleModal.value = true;

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

<style scoped>
.side-left {
  background: #eaf9ff;
  height: auto;
  padding: 1rem;
  border-radius: 4px;
}


/* schaders */
.fc-col-header-cell-cushion,
.fc-daygrid-day-number {
  color: #000000e0;
}

.fc-col-header-cell-cushion {
  font-weight: 400;
  font-size: 13px;
}



</style>
