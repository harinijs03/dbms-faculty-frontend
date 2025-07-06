import React, { useContext, useState } from 'react'
import './QuestionDescription.css'
import CreateSchema from './CreateSchema';
import { postQuestion } from '../services/questionServices';
import { UserContext } from '../pages/CreateQuestionPage'

const QuestionDescription = () => {
  const {quesDesc,setQuesDesc} = useContext(UserContext);
  
  const handleInputChange = (e,name)=>{
      const value = e.target.value;
      setQuesDesc(prev=>{
        const updated = {...prev};
        updated[name] = value;
        return updated;
      })
  }
  return (
    <div className='container-div'>
        <p>Title</p>
        <input 
          type="text" 
          placeholder='Question Title' 
          className='title-box'
          value={quesDesc.title}
          onChange={(e) => handleInputChange(e,'title')}
        />
        
        <p>Description</p>
        <textarea 
          className='desc-box'
          value={quesDesc.description}
          onChange={(e) => handleInputChange(e, 'description')}
          placeholder='Description'
        />
        
        <p>Question Type</p>
        <select value={quesDesc.type} onChange={(e) => setQuesDesc((prev)=>({
          ...prev, 
          type: e.target.selectedOptions[0].parentNode.label,
          subtype: e.target.value
        }))}
          className='questype-dropdown'>
          <option value="">Select Type</option>
          <optgroup label="DDL">
            <option value="create">CREATE</option>
            <option value="alter">ALTER</option>
            <option value="truncate">CREATE</option>
            <option value="drop">DROP</option>
          </optgroup>
          <optgroup label="DML">
            <option value="insert">INSERT</option>
            <option value="other">OTHER</option>
          </optgroup>
          <optgroup label="PL/SQL">
            <option value="trigger">TRIGGER</option>
            <option value="other">OTHER</option>
          </optgroup>
        </select>

        <select onChange={(e)=>handleInputChange(e,'expectedOutputType')}>
          <option value="">--Expected Output--</option>
          <option value="dbms_output">SERVER OUTPUT</option>
          <option value="table">TABLE</option>
          <option value="return_value">RETURN VALUE</option>
        </select>
        
        <p>Marks</p>
        <input 
          type="number" 
          placeholder='Marks' 
          className='marks-box'
          value={quesDesc.marks}
          onChange={(e) => handleInputChange(e, 'marks')}
        />
        <p>Expected Output Type</p>
        <select value={quesDesc.expectedOutputType} onChange = {(e)=>handleInputChange(e,'expectedOutputType')}>
          <option value="">--Select output type--</option>
          <option value="table_data">TABLE DATA</option>
          <option value="return_value">RETURN_VALUE</option>
          <option value="query_output">QUERY OUTPUT</option>
        </select>
    </div>
  )
}

export default QuestionDescription
