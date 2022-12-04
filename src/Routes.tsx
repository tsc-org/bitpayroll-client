import { Heading } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Activation from "./pages/Activation";
import Dashboard from "./pages/dashboard";
import Employees from "./pages/employees/Employees";
import Home from "./pages/home";
import Invite from "./pages/invite";
import NotFound from "./pages/notFound";
import SendPayment from "./pages/send/sendPayment";
import SignUp from "./pages/sign-up/signUp";
import SignIn from "./pages/signIn/signIn";
import Verification from "./pages/verification";
import Wallet from "./pages/wallet/wallet";
import Wip from "./pages/Wip";

const BaseRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/invite/:inviteCode" element={<Invite />} />
          <Route path="/activate/:token" element={<Activation />} />
          <Route path="work-in-progress" element={<Wip />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendPayment />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/employees" element={<Employees />} />

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
