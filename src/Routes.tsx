import { Heading } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import SendPayment from "./pages/send/SendPayment";
import SignUp from "./pages/sign-up/signUp";
import SignIn from "./pages/signIn/signIn";
import Verification from "./pages/verification";
import Wip from "./pages/Wip";

const BaseRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="work-in-progress" element={<Wip />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendPayment />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

// const TestLoading = () => {
//   return (
//     <div>
//       <Heading fontSize="2xl">Loading!!!!!!!!</Heading>
//     </div>
//   );
// };

export default BaseRoutes;
