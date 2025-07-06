import React from 'react'
import './InputTestCase.css'
import { useContext } from 'react'
import { UserContext } from '../pages/CreateQuestionPage'
import InputTestCaseDML from './InputTestCaseDML'

const InputTestCase = () => {
  const {quesDescc,testCases,setTestCases} = useContext(UserContext);
  return (
    <div>
      <InputTestCaseDML/>
    </div>
  )
}

export default InputTestCase
