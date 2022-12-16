import { addHours } from "date-fns/esm";
import esEs from "date-fns/locale/es";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import { useUiStore } from "../../auth/hooks";
import { useFormModal } from "../../auth/hooks/useFormModal";
import { onCloseDateModal } from "../../store/ui/uiSlice";
import "./modal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  //redux
  const { isDateModalOpen, closeModal, openModal } = useUiStore();


  //form
  const {  onInputChange, formState,onDateChange,onSubmitForm,submitForm } = useFormModal({
    startDate: new Date(),
    endDate: addHours(new Date(),2),
    title: "",
    notes: "",
  });

  const { startDate, endDate, title, notes } = formState;

//closeModal
  const onCloseModal = () => {
    closeModal()
  };

  return (
    <>
      <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={2000}
        style={customStyles}
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmitForm}>
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DatePicker
              dateFormat="Pp"
              showTimeInput
              timeInputLabel="Hora:"
              locale={esEs}
              className="form-control "
              selected={startDate}
              onChange={(date) => onDateChange(date, "startDate")}
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              showTimeInput
              timeInputLabel="Hora:"
              dateFormat="Pp"
              minDate={startDate}
              locale={esEs}
              className="form-control"
              selected={endDate}
              onChange={(date) => onDateChange(date, "endDate")}
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={
                submitForm && title.length === 0
                  ? "form-control is-invalid"
                  : "form-control"
              }
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={title}
              onChange={onInputChange}
            />
            {submitForm && !title && (
              <small className="text-danger">Campo obligatorio</small>
            )}
          </div>

          <div className="form-group mb-2">
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={notes}
              onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </>
  );
};
