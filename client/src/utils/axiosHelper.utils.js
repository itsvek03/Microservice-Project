import axios from "axios";
import config from "./config.json";

const axiosHelper = axios.create({
    baseURL: `${config.protocol}://${config.hostName}:${config.serverPort}/api`,
});

axiosHelper.defaults.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

export default axiosHelper;

export function getRequest(URL, config) {
    return axiosHelper.get(`/${URL}`, config);
}

export function postRequest(URL, payload, config) {
    console.log("URL")
    return axiosHelper.post(`/${URL}`, payload, config);
}

