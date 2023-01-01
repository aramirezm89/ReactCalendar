
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDeleteButton = () => {

   
    const { startDeletingEvent,selectedEvent } = useCalendarStore();
    const {isDateModalOpen} = useUiStore();

    const handleDelete = () =>{
      
      startDeletingEvent();
    }
  
  return (
    <>
      <button className="btn btn-danger fab-danger" onClick={handleDelete} style={{display:(selectedEvent && !isDateModalOpen)?'':'none'}}>
        <i className="fa fa-trash-alt"></i>
      </button>
    </>
  );
}
