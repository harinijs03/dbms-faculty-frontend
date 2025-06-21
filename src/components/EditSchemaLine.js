import React from 'react'
import './EditSchemaLine.css'

const EditSchemaLine = ({newQues,setNewQues}) => {
  if(!newQues||!Array.isArray(newQues.schemas)) return <p>Loading...</p>

  const handleSchemaChange = (e,schemain)=>{
    const {value} = e.target;
    setNewQues(prev=> {
      const updatedSchema = [...prev.schemas];
      updatedSchema[schemain] = {
        ...updatedSchema[schemain],
        tableName: value
      }
      return {
        ...prev,
        schemas: updatedSchema
      }
    })
  }

  const handleColChange = (e, colIndex, schemaIndex) => {
  const { name, value } = e.target;
  setNewQues(prev => {
    const updatedSchemas = [...prev.schemas];
    const updatedColumns = [...updatedSchemas[schemaIndex].columns];
    updatedColumns[colIndex] = {
      ...updatedColumns[colIndex],
      [name]: value
    };
    updatedSchemas[schemaIndex] = {
      ...updatedSchemas[schemaIndex],
      columns: updatedColumns
    };
    return {
      ...prev,
      schemas: updatedSchemas
    };
  });
};


  const RenderSchemTables = (schema,schemaIndex)=>{
    if(!schema) return <p>No schema</p>
    const table = [];
    schema.columns.map((col,colIndex) => (
      table.push(<div key={colIndex}>
        <input value={col.columnName}
        onChange = {(e)=>{
          handleColChange(e,colIndex,schemaIndex)
        }}
        name="columnName"></input>
        <select value={col.type}
        onChange={(e) => handleColChange(e, colIndex, schemaIndex)}
        name="type">
          <option>select type</option>
          <option value="number">number</option>
          <option value="varchar">varchar</option>
        </select>
      </div>)
    ))
    return table;
  }

  return (
    <div className='edit-schema-div'>
      {
        newQues.schemas.map((schema,schemaIndex) => (
          <div key={schemaIndex}>
            <p>Table: {schemaIndex+1}</p>
            <input value={schema.tableName} 
            name="tableName"
            onChange={(e)=>handleSchemaChange(e,schemaIndex)}/>
            <div>
              {
                RenderSchemTables(schema,schemaIndex)
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default EditSchemaLine
