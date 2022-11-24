
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Layout from "../layout";
import useAuth from "../hooks/useAuth";
import { useRef } from "react";
import endpoints from "../api/endpoints";
import axios from "../api/axios";

const RequireAuth = () => {
  const { auth, clearAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate()

  const previouslyAuthenticated = useRef(false)

  if (!auth.auth?.auth) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  if (auth.auth?.jwt && !previouslyAuthenticated.current) {
    if (!auth.isActive) {
      return <Navigate to={"/login"} state={{ from: location }} replace />;
    }
    axios.get(endpoints.REQUEST_VERIFICATION())
      .then(res => {
        if (!res.data.auth) {
          clearAuth()
        }
        else {
          previouslyAuthenticated.current = true
        }
      })
      .catch(err => {
        console.log("Verification Error", {err})
        clearAuth()
      })
  }
  // this should be a spash screen or a suspense
  if (!auth.userId) return null
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default RequireAuth;
