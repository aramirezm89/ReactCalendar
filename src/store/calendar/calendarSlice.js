import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

/* const tempEvent = {
  _id: new Date().getTime(),
  title: "Cumpleaños del jefe",
  notes: "Hay que comprar el pastel",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    id: "123",
    name: "Antonio",
  },
};
 */
const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onLoadEvents: (state, { payload = []}) => {
      state.isLoadingEvents = false;
      payload.forEach(event => {
        const exists = state.events.some(dbEvent => dbEvent._id === event._id);

        if(!exists){
          state.events.push(event);
        }
      });
      state.activeEvent = null;
    },
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (e) => e._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },
  },
});

export const {
  onSetActiveEvent,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} = calendarSlice.actions;
