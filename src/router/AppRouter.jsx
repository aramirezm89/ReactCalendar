/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CalendarRoutes } from "../calendar/routes/CalendarRoutes";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  
  const {status,checkAuthToken} =useAuthStore()

  useEffect(() => {
   checkAuthToken()
  }, [])
  


  if(status === 'checking'){
    return (
      <h3>Cargando...</h3>
    )
  }
  return (
    <Routes>
      {/* TODO :
        validar authStatus y mostrar rutas segun ese estado
    */}

      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to="./auth" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarRoutes />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
