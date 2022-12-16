import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../../store";



export const useUiStore = () =>{

    const { isDateModalOpen } = useSelector((state) => state.ui);
    
    const dispatch = useDispatch();
    const openModal = () =>{
         dispatch(onOpenDateModal())
    }
    const closeModal = () => {
      dispatch(onCloseDateModal());
    };

    return {
        isDateModalOpen,
        closeModal,
        openModal
    }
}