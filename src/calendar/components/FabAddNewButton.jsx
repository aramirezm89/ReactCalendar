import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNewButton = () => {

    const {openModal}  = useUiStore();
    const {setActiveEvent}  = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
          title: "",
          notes: "",
          start: new Date(),
          end: addHours(new Date(), 2),
          bgColor: "#fafafa",
          user: {
            id: "123",
            name: "Antonio",
          },
        });
        openModal()
    }
  return (
    <>
      <button className="btn btn-primary fab" onClick={handleClickNew}>
        <i className="fa-thin fa-plus"></i>
      </button>
    </>
  );
}
