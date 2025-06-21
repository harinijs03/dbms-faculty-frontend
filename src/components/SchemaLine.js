import React from 'react'
import './SchemaLine.css'

const SchemaLine = ({quesDesc,setQuesDesc}) => {
  
  const handleDeleteSchema = (name)=>{
    let filteredSchema = quesDesc.schemas.filter(schema => schema.tableName!==name);
    setQuesDesc(prev => ({
      ...prev,
      schemas: filteredSchema,
    }))
  }
  if(!quesDesc) return <p>No question schemas</p>

  return (
    <div>
      {
        quesDesc.schemas.map(schema => (
          <div className='schema-card'>
            <p>{schema.tableName}</p>
            <button onClick={()=>{
              handleDeleteSchema(schema.tableName)
            }}>Delete</button>
          </div>
        ))
      }
    </div>
  )
}

export default SchemaLine
