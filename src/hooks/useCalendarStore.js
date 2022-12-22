import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { convertDateEvents } from "../helpers/converDateEvents";
import { onAddEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { useAuthStore } from "./useAuthStore";
export const useCalendarStore = () => {
 
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const {user} = useAuthStore();
    const dispatch =  useDispatch()

    const setActiveEvent = (event) =>{
     dispatch(onSetActiveEvent(event))
    }

    const startLoadingEvents = async () =>{
        const {data} = await calendarApi.get('/calendar');

       const events = convertDateEvents(data.events);

        dispatch(onLoadEvents(events));
    }

    const startSavingEvent = async (event) =>{
       
        if(event._id){
            //actualizar
            dispatch(onUpdateEvent(event))
        }else{
            //crear
           const {data} =  await calendarApi.post('/calendar',event);
           console.log(data); 

          dispatch(onAddEvent({...event,_id:data.evento._id,user}));
        }
    }

    const startDeletingEvent = () =>{
        dispatch(onDeleteEvent());
    }
    return {
      events,
      activeEvent,
      setActiveEvent,
      startSavingEvent,
      startDeletingEvent,
      startLoadingEvents,
      selectedEvent : !!activeEvent
    };
}
