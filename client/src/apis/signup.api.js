import { postRequest } from "../utils/axiosHelper.utils";


export const signup = (data) => {
    return postRequest("users/signup", data);
}