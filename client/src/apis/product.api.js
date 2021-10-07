import { getRequest } from "../utils/axiosHelper.utils";


export const loginApi = (data) => {
    return postRequest("users/login", data);
}