import React from "react";
import { authType, userAuth } from "../context/authContext";
import useAuth from "../hooks/useAuth";

// setAuth: React.Dispatch<React.SetStateAction<userAuth>>

export const storageService = {
    getData: () => {
        const data = localStorage.getItem("data");
        return data ? JSON.parse(data) : null;
    },
    setData: (content: authType) => {
        localStorage.setItem("data", JSON.stringify(content));
    },
    removeData: () => {
        const clearedData: authType = {
            auth: false,
            jwt: null
        }
        localStorage.setItem("data", JSON.stringify(clearedData));
    },
}