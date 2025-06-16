import React from 'react'
import './QuestionLineItem.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const QuestionLineItem = ({ques,handleDelete}) => {
  const navigate = useNavigate();
  return (
    <div className='question-card'>
      <div className='question-card-title'>
        {ques.title}
      </div>
      <div className='button-div'>
      <button className='question-view-button' onClick={()=>{
        navigate(`/viewquestion/${ques.id}`);
      }} >View</button>
      <button className='question-edit-button' onClick={()=>{
        navigate(`/editquestion/${ques.id}`);
      }}>Edit</button>
      <button className='question-delete-button' onClick={()=>{
        handleDelete(ques);
      }}>Delete</button>
      </div>
    </div>
  )
}

export default QuestionLineItem
