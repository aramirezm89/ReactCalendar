import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCalendarStore } from "./useCalendarStore";
import { useUiStore } from "./useUiStore";


export const useFormModal = (initialState = {}) => {

    const [formState, setFormState] = useState(initialState)
    const {activeEvent} = useCalendarStore()
    useEffect(() => {
    if(activeEvent !==null){
      setFormState({...activeEvent})
    }
    }, [activeEvent])
    
    const [submitForm, setSubmitForm] = useState(false);

   const {closeModal} = useUiStore();

   const onInputChange = ({target}) =>{
    const {value,name} = target;
    setFormState({
        ...formState,
        [name] : value
    })
   }

   const onDateChange = (date, name) => [
    
     setFormState({
       ...formState,
       [name]: date,
     }),
   ];

     const onSubmitForm = (event) => {
       event.preventDefault();
       setSubmitForm(true);

       const dateDifference = differenceInSeconds(formState.end, formState.start);
    
     
       if (isNaN(dateDifference) || dateDifference < 0) {
         Swal.fire(
           "Error",
           "hora final menor a la hora de inicio o fecha no valida",
           "error"
         );

         return;
       }

       if (!formState.title) {
         Swal.fire("Error", "El titulo es obligatorio", "error");
         return;
       }

       //TODO:cerrarModal

      closeModal();
     };


   const onResetForm = () =>{
    
    setFormState(initialState)
   }
  return {
    formState,
    ...formState,
    onInputChange,
    onResetForm,
    onDateChange,
    onSubmitForm,
    submitForm
  }
}
