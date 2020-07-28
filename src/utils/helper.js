import {_getUsers, _getQuestions} from './DATA';

export function getData () {
    return Promise.all([_getUsers, _getQuestions])
    .then(({recivedUsers, recivedQuestions}) => {
        return {
            users: recivedUsers,
            questions: recivedQuestions
        };
    });
};


