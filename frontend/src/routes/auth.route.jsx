import { useContext } from "react";
import { GlobalContext } from "../providers/global.provider";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoute() {
  const user = useContext(GlobalContext);

  return user ? <Outlet /> : <Navigate to={"/SignIn"} />;
}

export default AuthRoute;
