import { authType, userAuth } from "../context/authContext";


export const storageService = {
    getData: () => {
        const data = localStorage.getItem("data");
        return data ? JSON.parse(data) : null;
    },
    setData: (content: userAuth) => {
        localStorage.setItem("data", JSON.stringify(content));
    },
    removeData: () => {
        localStorage.removeItem("data");
    },
    // dataToNull: () => {
    //     localStorage.setItem("data", null)
    // },
    // setUser: (content) => {
    //     localStorage.setItem("user", JSON.stringify(content));
    // },
    // getUser: () => {
    //     const user = localStorage.getItem("user");
    //     return user ? JSON.parse(user) : null;
    // }
}