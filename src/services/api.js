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

export const getAnswer = id => {
    return http.get(`/answers/${id}`);
}

export const addUserSelectAnswer = packet => {
    if(packet.userID == "New User")
    {
        const questionID = packet.questionID;
        const answerIDs = packet.answerIDs;

        const tempAnswer = {
            type: "Select",
            questionID: questionID,
            answerIDs: answerIDs
        };

        addTempAnswer(tempAnswer);
    }
    else
    {
        return http.post(`/users/submit-select-answer`, packet);
    }
}

export const addUserSliderAnswer = packet => {
    if(packet.userID == "New User")
    {
        const questionID = packet.questionID;
        const sliderValue = packet.value;
        const answerTag = packet.tag;

        const tempAnswer = {
            type: "Slider",
            questionID: questionID,
            sliderValue: sliderValue,
            answerTag: answerTag
        };

        addTempAnswer(tempAnswer);
    }
    else
    {
        return http.post(`/users/submit-slider-answer`, packet);
    }
}

export const addUserTextAnswer = packet => {
    if(packet.userID == "New User")
    {
        const questionID = packet.questionID;
        const answers = packet.answers;

        const tempAnswer = {
            type: "Text Input",
            questionID: questionID,
            answers: answers
        };
    }
    else
    {
        return http.post(`/users/submit-text-answer`, packet);
    }
}

export const getQuestionsByTag = tags => {
    return http.post(`/questions`, tags);
}

export const addQuestion = packet => {
    return http.post(`/questions/add`, packet);
}

export const getQuestionByQuestion = question => {
    return http.get(`/questions/${question}`);
}

export const updateQuestion = packet => {
    return http.post(`/questions/update`, packet);
}

export const deleteQuestionAndAnswers = id => {
    return http.get(`/questions/delete/${id}`);
}

export const addQuestionTagSuggestions = packet => {
    return http.post('/question-tag-suggestions/add', packet);
}

const addTempAnswer = tempAnswer => {
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