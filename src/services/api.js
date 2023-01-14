import axios from 'axios';

const { API_URL } = require("./helpers.js");
const http = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export const getUser = id => {
    return http.get(`/users/${id}`);
}

export const deleteUser = id => {
    window.localStorage.removeItem("userID");

    return http.get(`/users/delete/${id}`);
}

export const getUserQuestionTags = id => {
    return http.get(`/users/tags/${id}`);
}

export const getUserAnsweredQuestions = id => {
    return http.get(`/users/answered-questions/${id}`);
}

export const registerUser = user => {
    return http.post(`/users/register`, user);
}

export const loginUser = user => {
    return http.post(`/users/login`, user);
}

export const logoutUser = () => {
    // TODO: Maybe update login/logout time-date values in database
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("username");
}

export const getQuestion = tags => {
    return http.post(`/questions`, tags);
}

export const getAnswer = id => {
    return http.get(`/answers/${id}`);
}

export const addUserAnswers = packet => {
    if(packet.userID == "New User")
    {
        const questionID = packet.questionID;
        const answerIDs = packet.answerIDs;

        const tempAnswer = {
            questionID: questionID,
            answerIDs: answerIDs
        };

        let tempAnswers = [];
        if(window.sessionStorage.getItem("tempAnswers"))
        {
            tempAnswers = JSON.parse(window.sessionStorage.getItem("tempAnswers"));

            tempAnswers = tempAnswers.filter(answer => {
                return answer.questionID != questionID;
            });
        }

        tempAnswers.push(tempAnswer);

        window.sessionStorage.setItem("tempAnswers", JSON.stringify(tempAnswers));
        window.sessionStorage.removeItem("recordedAnswers");
    }
    else
    {
        return http.post(`/users/submit-answer`, packet);
    }
}

export const addQuestion = packet => {
    return http.post(`/questions/add`, packet);
}