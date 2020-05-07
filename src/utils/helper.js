import {_getUsers, _getQuestions} from './DATA'; 

export function getData () => {
    return Promise.all([_getUsers(), _getQuestions()])
    .then(([users, questions]) => {
            {users: recivedUsers,
            questions: recivedQuestions,
            }
    });    
};


