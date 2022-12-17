import { configureStore } from "@reduxjs/toolkit";
import { uiSlice,cale, calendarSlice } from "./";



export const store = configureStore({
    reducer:{
        ui:uiSlice.reducer,
        calendar:calendarSlice.reducer
    }
})