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

  // const [loading, setLoading] = useState(true)

  const previouslyAuthenticated = useRef(false)

  if (!auth.auth?.auth) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  if (auth.auth?.jwt && previouslyAuthenticated.current === false) {
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
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default RequireAuth;
