import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import endpoints from "../../api/endpoints";
import { storageService } from "../../auth/storageService";
import Form, { Data, inputOption } from "../../components/accountForm/Form";
import useAuth from "../../hooks/useAuth";

const inputOptions: inputOption[] = [
    {name: "email", placeholder: "Enter organization email", type: "email", isRequired: true, hasVisibilityToggle: false},
    {name: "password", placeholder: "Enter pass", type: "password", isRequired: true, hasVisibilityToggle: true}
]

const text = {
    heading: "Welcome back", subHeading: "Enter your details to continue", action: "Sign in", loading: "Logging in"
}

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = (data: Data) => {
    if (!data.email || !data.password) return;
    setLoading(true);
    axios
      .post(endpoints.LOGIN(), data)
      .then((res) => {
        console.log(res);
        const auth = {
          auth: res.data?.auth || false,
          jwt: res.data?.jwt || null,
        };
        storageService.setData({ userId: "test", username: "test", auth });
        navigate("/dashboard");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  if (auth.auth) <Navigate to="/dashboard" />;

  return (
    <Form submitHandler={handleSubmit} 
        loading={loading} 
        error={error} inputOptions={inputOptions} 
        text={text}
    />
  );
};

export default SignIn;
