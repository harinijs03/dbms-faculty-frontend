import React, { useState } from 'react'
import './DefineDescription.css'
import QuestionDescription from './QuestionDescription'
import Button from './Button'
import CreateSchema from './CreateSchema'

const DefineDescription = () => {
  return (
    <div className='define-desc-contatiner'>
      <div className='header-div'>
        Question
      </div>
      <div className='ques-desc-div'>
        <QuestionDescription />
      </div>
    </div>
  )
}

export default DefineDescription
