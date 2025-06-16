import React from 'react'
import './CreateQuestionPage.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'

const CreateQuestionPage = () => {
  const [quesDesc, setQuesDesc] = useState({
    id: '',
    title: '',
    description: '',
    statement: '',
    inputFormat: '',
    outputFormat: '',
    marks: 0,
    testcases: [],
  });
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create new question object with UUID
    const questionWithId = {
      ...quesDesc,
      id: uuidv4() // Generate new UUID
    };

    setQuesDesc(questionWithId);

    try {
      // Use the new object directly in the API call
      const res = await axios.post('http://localhost:5001/api/createquesdesc', questionWithId);
      
      if (res.data.msg) {
        navigate('/questionpool');
      }
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  }

  // Helper function to handle input changes
  const handleInputChange = (e, field) => {
    setQuesDesc(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  }

  return (
    <div>
      <h2>Question Details</h2>
      <form onSubmit={handleSubmit}>
        <p>Title</p>
        <input 
          type="text" 
          placeholder='Question Title' 
          className='title-box'
          value={quesDesc.title}
          onChange={(e) => handleInputChange(e, 'title')}
        />
        
        <p>Description</p>
        <textarea 
          className='desc-box'
          value={quesDesc.description}
          onChange={(e) => handleInputChange(e, 'description')}
          placeholder='Description'
        />
        
        <p>Statement</p>
        <textarea 
          className='qstatement-box'
          value={quesDesc.statement}
          onChange={(e) => handleInputChange(e, 'statement')}
          placeholder='Question Statement'
        />
        
        <p>Input format</p>
        <textarea 
          className='iformat-box'
          value={quesDesc.inputFormat}
          onChange={(e) => handleInputChange(e, 'inputFormat')}
          placeholder='Input format'
        />
        
        <p>Output format</p>
        <textarea 
          className='oformat-box'
          value={quesDesc.outputFormat}
          onChange={(e) => handleInputChange(e, 'outputFormat')}
          placeholder='Output format'
        />
        
        <p>Marks</p>
        <input 
          type="number" 
          placeholder='Marks' 
          className='marks-box'
          value={quesDesc.marks}
          onChange={(e) => handleInputChange(e, 'marks')}
        />
        
        <input type="submit" className='submit-button' value="save"/>
      </form>
    </div>
  )
}

export default CreateQuestionPage