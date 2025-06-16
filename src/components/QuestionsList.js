import React from 'react'
import QuestionLineItem from './QuestionLineItem'

const QuestionsList = ({ques,handleDelete}) => {
  return (
    <div style={{marginBottom: '10px'}}>
      <QuestionLineItem ques={ques} handleDelete={handleDelete}/>
    </div>
  )
}

export default QuestionsList
