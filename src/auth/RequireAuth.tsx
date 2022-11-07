import { Navigate, Outlet, useLocation } from "react-router-dom";
import Layout from "../layout";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth)
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default RequireAuth;
