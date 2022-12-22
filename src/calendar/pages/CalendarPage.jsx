import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { getMessagesEs } from "../../helpers";
import { localizer } from "../../helpers/calendarLocalizer";
import { CalendarModal } from "../components";
import { FabAddNewButton } from "../components/FabAddNewButton";
import { FabDeleteButton } from "../components/FabDeleteButton";

import { NavBar } from "../components/NavBar";



export const CalendarPage = () => {

  
  const { events,setActiveEvent,startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'month')
  const {openModal} = useUiStore()

  useEffect(() => {
   startLoadingEvents();
  }, [])
  

  //funcion que se encarga de dar estilo al mensage de evento seleccionado
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  //function encargad de escuchar el evento dobleclick

  const onDoubleClick = (event) => {
    openModal()
 
  };

  const onSelect = (event) => {
   
    setActiveEvent(event);
    
  };

  const onViewChange = (view) => {
    //el parametro "view" constine el nombre de la ultima vista (month,date,agenda etc.)
    localStorage.setItem("lastView",view);
    setLastView(view);
  };



  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <Calendar
          culture="es"
          defaultView={lastView}
          messages={getMessagesEs()}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100vh - 100px)" }}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChange}
        />
        <FabAddNewButton/>
      
       <FabDeleteButton/>
       
      </div>

      <CalendarModal />
    </>
  );
};
