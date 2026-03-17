import axios from "axios";

export const axiosApi = axios.create({
    baseURL: "https://my-plovo-app-default-rtdb.europe-west1.firebasedatabase.app/"
})