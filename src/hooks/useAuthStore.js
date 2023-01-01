import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(onChecking());
      const { data } = await calendarApi.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);

      //token-init-date para poder saber si el token aun es activo y no volver a generar
      localStorage.setItem("token.init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    try {
      dispatch(onChecking());
      const { data } = await calendarApi.post("auth/new", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      //token-init-date para poder saber si el token aun es activo y no volver a generar
      localStorage.setItem("token.init-date", new Date().getTime());

      dispatch(onLogin({ name: data.usuario.name, uid: data.usuario._id }));
    } catch (error) {
      const { response } = error;

      console.log(response);

      dispatch(onLogout(response.data.message));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  //utilizada en AppRouter
  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());
    try {
      const { data } = await calendarApi.get("/auth/renew");
      
      localStorage.setItem("token", data.token);

      //token-init-date para poder saber si el token aun es activo y no volver a generar
      localStorage.setItem("token.init-date", new Date().getTime());

     
      dispatch(onLogin({user:data.usuario.name,uid: data.usuario._id}));
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("token.init-date");
      console.log(error);
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token.init-date");
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };
  return {
    // propiedades
    status,
    user,
    errorMessage,
    //metodos
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
