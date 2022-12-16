import { addHours } from "date-fns";
import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch } from "react-redux";
import { useUiStore } from "../../auth/hooks";
import { getMessagesEs } from "../../helpers";
import { localizer } from "../../helpers/calendarLocalizer";
import { onOpenDateModal } from "../../store/ui/uiSlice";
import { CalendarModal } from "../components";

import { NavBar } from "../components/NavBar";

const events = [
  {
    title: "Cumpleaños del jefe",
    notes: "Hay que comprar el pastel",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      id: "123",
      name: "Antonio",
    },
  },
];

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'month')
  const {openModal} = useUiStore()

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
      </div>

      <CalendarModal/>
    </>
  );
};
