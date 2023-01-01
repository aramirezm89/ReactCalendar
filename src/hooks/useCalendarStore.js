import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
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
       
      try {
          if (event._id) {
            //actualizar
            
            await calendarApi.put(`/calendar/${event._id}`, event);
            dispatch(onUpdateEvent({ ...event, user }));
            return
          }

          //crear
          const { data } = await calendarApi.post("/calendar", event);
          console.log(data);

          dispatch(onAddEvent({ ...event, _id: data.evento._id, user }));
        
          
      } catch (error) {
        console.log(error);
        Swal.fire('Error al guardar',error.response.data.msg,'error')
      }
    }

    const startDeletingEvent = async () =>{

        try {
          if(activeEvent){
            await calendarApi.delete(`/calendar/${activeEvent._id}`)
              Swal.fire("Eliminado",'Evento eliminado', "success");
             dispatch(onDeleteEvent());

          }
        } catch (error) {
          console.log(error);
            Swal.fire("Error al eliminar el evento", error.response.data.msg, "error");
        }
       
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
