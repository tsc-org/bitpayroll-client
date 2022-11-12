import { storageService } from "../auth/storageService";
import axios from "./axios";

export default function setupAxios() {
  axios.interceptors.request.use(
    (config) => {
      let data = storageService.getData()
      config.headers = config.headers ?? {}
      config.url = config.url ?? ''
      if (data) {
        // Exclude auth header on login endpoint
        // if (data?.auth?.jwt && !config?.url.includes('login')) {
        //   config.headers.Authorization = `Bearer ${data.auth.jwt}`;
        // }
        if (data?.jwt) {
          config.headers.Authorization = `Bearer ${data.jwt}`;
        }
      }
      // Final check to make sure login endpoint has no Auth header
      // if (config.url.includes('login') && config.headers.Authorization) {
      //   delete config.headers.Authorization
      // }

      return config;
    },
    err => {
      Promise.reject(err)
    }
  );
}