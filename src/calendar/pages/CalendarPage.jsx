import { addHours } from "date-fns";
import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMessagesEs } from "../../helpers";
import { localizer } from "../../helpers/calendarLocalizer";
import { CalendarEventBox } from "../components";

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
    console.log({ doubleClick: event });
  };

  const onSelect = (event) => {
    console.log({ select: event });
  };

  const onViewChange = (view) => {
    
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
    </>
  );
};
