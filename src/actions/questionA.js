export const ADD_ANSWER_TO_STATE = "ADD_ANSWER_TO_STATE"
export const ADD_QUESTION_TO_STATE = "ADD_QUESTION_TO_STATE"
export const SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION"
export const ADD_QUESTIONS_TO_STATE = "ADD_QUESTIONS_TO_STATE"
export const SET_WANTED_QUESTIONS_LIST = "SET_WANTED_QUESTIONS_LIST"
export const SET_QUESTIONS_LIST_STATUS = "SET_QUESTIONS_LIST_STATUS"

export const addQuestionsToState = (questions) => ({
    type: "ADD_QUESTIONS_TO_STATE",
    payload: questions
});

export const setWantedQuestionsList = (wantedQuestionsList) => ({
    type: "SET_WANTED_QUESTIONS_LIST",
    payload: wantedQuestionsList
});

export const addAnswerToState = (answer) => ({
    type: "ADD_ANSWER_TO_STATE",
    payload: answer
});

export const setQuestionsListStatus = (status) => ({
    type: "SET_QUESTIONS_LIST_STATUS",
    payload: status
});

export const addQuestionToState = (question) => ({
    type: "ADD_QUESTION_TO_STATE",
    payload: question
});

export const setCurrentQuestion = (questionId) => ({
    type: "SET_CURRENT_QUESTION",
    payload: questionId
});