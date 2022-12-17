import { useDispatch, useSelector } from "react-redux"
import { onAddEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../../store";

export const useCalendarStore = () => {
 
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const dispatch =  useDispatch()

    const setActiveEvent = (event) =>{
     dispatch(onSetActiveEvent(event))
    }

    const startSavingEvent = async (event) =>{
       
        if(event._id){
            //actualizar
            dispatch(onUpdateEvent(event))
        }else{
            //crear
             dispatch(onAddEvent({...event,_id:new Date().getTime()}));
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
      selectedEvent : !!activeEvent
    };
}
