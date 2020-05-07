import React from 'react';
import {Link} from 'react-router-dom';

import '../style/App.css';
import '../style/responsive.css';

class QuestionList extends React.Component {
  render (){
    return (
      <div className="listContainer">
        <ul className="list">
        {answeredQuestions.map(question => {
            {/* sau questions.filter(listoption)
            
            pentru sortarea listei 
            arr.sort(compareFunction(a,b){return a-b;});
            arr.map() */}
            return (
              <li key={question.id}>
                 <Link className="openQuestion" to=`/questions/:${questionId}`>Question</Link>
              </li>
            )            
          })
        }
        </ul>
        </div>
    )
  }
}

export default QuestionList;