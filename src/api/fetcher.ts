import axios from "./axios"

export const getFetcher = async(url: string)  => {
    await axios.get(url).then(res => res.data)
  }