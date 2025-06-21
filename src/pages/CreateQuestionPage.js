import React from 'react'
import './CreateQuestionPage.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import CreateSchema from '../components/CreateSchema'
import SchemaLine from '../components/SchemaLine'

const CreateQuestionPage = () => {
  const [quesDesc, setQuesDesc] = useState({
    title: '',
    description: '',
    statement: '',
    type: '',
    marks: 0,
    schemas: [],
  });
  const [rowsNum,setRowsNum] = useState(0);
  const [colsNum,setColsNum] = useState(0);
  const [columns,setColumns] = useState([{
        columnName:'',
        type: ''
  }]);
  const [tableName,setTableName] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create new question object with UUID
    // const questionWithId = {
    //   ...quesDesc,
    //   id: uuidv4() // Generate new UUID
    // };

    // setQuesDesc(questionWithId);

    try {
      // Use the new object directly in the API call
      const res = await axios.post('http://localhost:5001/api/createquesdesc', quesDesc);
      let data = res.data;
      if (data.msg) {
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

  const handleAddSchema = () => {
    setQuesDesc(prev => ({
      ...prev,
      schemas: [
        ...prev.schemas,
        {
          tableName: tableName,
          columns: [...columns],
        }
      ]
    }));
    setColumns([{columnName: '', type: ''}]);
    setTableName('');
  }

  const RenderSchema = ()=>{
    if(!columns) return <p>No schema has been added.</p>
    return <SchemaLine quesDesc={quesDesc} setQuesDesc={setQuesDesc}/>
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
        
        <p>Question Type</p>
        <select value={quesDesc.type} onChange={(e) => handleInputChange(e,'type')}
          className='questype-dropdown'>
          <option>Select Type</option>
          <option value="DDL">DDL</option>
          <option value="DML">DML</option>
          <option value="PLSQL">PL/SQL</option>
        </select>
        
        <p>Marks</p>
        <input 
          type="number" 
          placeholder='Marks' 
          className='marks-box'
          value={quesDesc.marks}
          onChange={(e) => handleInputChange(e, 'marks')}
        />

        <p>Schema</p>
        <div className='createschema-div'>
          <CreateSchema rowsNum={rowsNum} colsNum={colsNum} setRowsNum={setRowsNum} 
        setColsNum={setColsNum} columns={columns} setColumns={setColumns}
        tableName={tableName} setTableName={setTableName}/>
        <button className='addschema-button'
          type='button'
          onClick={(e)=>{
            handleAddSchema();
          }}>Add Schema</button>
        <div>
          {
            RenderSchema()
          }
        </div>
        </div>
        <input type="submit" className='submit-button' value="save"/>
      </form>
    </div>
  )
}

export default CreateQuestionPage