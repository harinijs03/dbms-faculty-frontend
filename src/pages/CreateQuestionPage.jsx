import React from 'react'
import './CreateQuestionPage.css'
import { useState } from 'react'
import QuestionDescription from '../components/QuestionDescription'
import CreateSchema from '../components/CreateSchema'
import InputTestCase from '../components/InputTestCase'
import { useContext,createContext } from 'react'

export const UserContext = createContext();
const CreateQuestionPage = () => {
  const [quesId,setQuesId] = useState('');
  const [activeTab,setActiveTab] = useState('description');
  const tabs = ['description','schema','testcase'];
  const [quesDesc, setQuesDesc] = useState({
    title: '',
    description: '...',
    type: '',
    subtype: '',
    marks: 0,
    schemas: [],
    parameters:[],
    expectedOutputType: '',
    referenceCode: '',
    testBlock: '',
    setupSQL: '',
    teardownSQL: '',
  })

  const [testCases,setTestCases] = useState({
    questionId: '',
    inputVariables: [],
    expectedOutput: [],
    expectedTableName: '',
    inputTables: [],
    hidden: false
  })

  return (
    <UserContext.Provider value={{quesDesc, setQuesDesc, testCases, setTestCases, quesId}}>
    <div className='main-div'>
      <div className='tab-div'>
        {
          tabs.map((tab)=>(
            <button key={tab}
                className={`tab-button ${activeTab===tab?'active':''}`}
                onClick={()=>setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase()+tab.slice(1)}
            </button>
          ))
        }
      </div>
      <div>
        {activeTab==='description'&&(
          <QuestionDescription/>
        )}
        {activeTab==='schema'&&(
          <CreateSchema/>
        )}
        {activeTab==='testcase'&&(
          <InputTestCase/>
        )}
      </div>
      <div>
        <button onClick={()=>{}}>Submit</button>
      </div>
    </div>
    </UserContext.Provider>
  )
}

export default CreateQuestionPage
