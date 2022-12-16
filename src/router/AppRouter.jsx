import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CalendarRoutes } from "../calendar/routes/CalendarRoutes";

export const AppRouter = () => {
  const status = "authenticated" /* "not-authenticated" */;
  return (
    <Routes>
      {/* TODO :
        validar authStatus y mostrar rutas segun ese estado
    */}

      {status === "not-authenticated" ? (
        <Route path="/auth/*" element={<AuthRoutes />} />
      ) : (
        <Route path="/*" element={<CalendarRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="./auth" />} />
    </Routes>
  );
};
