import { getCookie } from "./helpers";

const CSRF_TOKEN = getCookie("csrftoken");
const DRF_TOKEN = "189a4491ca26380a7ace390a2d7c4b7a3ba81fbb";
const API_URL = "http://localhost:8000/api/";

const POST_PARAMETERS = (data) => {
    return {
        method: "POST",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": CSRF_TOKEN,
            "Authorization": "Token " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(data),
    }
}

const GET_PARAMETERS = {
    method: "GET",
    mode: "cors",
    headers: {
        "Authorization": "Token " + DRF_TOKEN,
    }
}

export const getUser = (data) => {
    return fetch(API_URL + "getuser", POST_PARAMETERS(data));
}

export const getQuestion = (data) => {
    return fetch(API_URL + "questions", POST_PARAMETERS(data));
}

export const logoutUser = (token) => {
    return fetch(API_URL + "logout", POST_PARAMETERS({"Authorization": "Token " + token}));
}