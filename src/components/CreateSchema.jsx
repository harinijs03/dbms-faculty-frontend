import React, { useEffect, useState } from 'react'
import Button from './Button'
import { UserContext } from '../pages/CreateQuestionPage';
import { useContext } from 'react';
import './CreateSchema.css'

const CreateSchema = () => {
  const {quesDesc,setQuesDesc} = useContext(UserContext);
  const [colsNum,setColsNum] = useState(0);
  const [tableName,setTableName] = useState('');
  const [columns,setColumns] = useState([]);
  useEffect(()=>{
    setColumns(prev=>{
      const updated = [...prev];
      if(updated.length<colsNum){
        updated.push({
          columnName: '',
          columnType: '',
          constraints: [],
          checkCondition: '',
          referenceTable: '',
          referenceColumn: ''
        });
      }
      return updated;
    })
  },[colsNum])

  const updateColumn = (index, field, value)=>{
    setColumns(prev=>{
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  }

  const handleConstraintChange = (index, constraint) => {
    setColumns(prev => {
      const updated = [...prev];
      const col = { ...updated[index] }; 

      if (constraint === 'primary key') {
        const pk = prev.some((c, i) =>
          i !== index && c.constraints.includes('primary key')
        );
        if (pk) {
          alert('Only one column can be marked as Primary Key.');
          return prev;
        }
      }

      let newConstraints = [...col.constraints];

      if (newConstraints.includes(constraint)) {
        newConstraints = newConstraints.filter(c => c !== constraint);

        if (constraint === 'foreign key') {
          col.referenceTable = '';
          col.referenceColumn = '';
        }
      } else {
        newConstraints.push(constraint);
      }

      col.constraints = newConstraints;
      updated[index] = col;

      return updated;
    });
};

  const handleRemoval = (indexToRemove) => {
  setColumns(prev => prev.filter((_, index) => index !== indexToRemove));
  setColsNum(prev => Math.max(prev - 1, 0));
};

  const handleSchemaAddition = (tableName, columns) => {
  if (!tableName.trim()) {
    alert("Table name is required");
    return;
  }
  if (columns.length === 0) {
    alert("Please add at least one column");
    return;
  }

  const newSchema = {
    tableName,
    columns
  };

  setQuesDesc(prev => ({
    ...prev,
    schemas: [...prev.schemas, newSchema]
  }));

  setTableName('');
  setColumns([]);
  setColsNum(0);
};


  const renderColumn = ()=>{
    if(!columns){
      return <div>Loading...</div>
    }
    return(
      <div className='column-outer-div'>
        {
          columns.map((col,colIndex)=>(
          <div className='column-input-div'>
            <input type="text" placeholder='Column name' value={col.columnName}
              onChange={(e)=>{updateColumn(colIndex,'columnName',e.target.value)}}/>
            <select value={col.columnType}
              onChange={(e)=>{updateColumn(colIndex,'columnType',e.target.value)}}>
              <option value="">--Select Type--</option>
              <option value="number">number</option>
              <option value="varchar">varchar</option>
              <option value="date">date</option>
              <option value="timestamp">timestamp</option>
            </select> 
            <div className='checkbox-div'>
                <label><input type="checkbox" checked={col.constraints.includes('primary key')} onChange={()=>{handleConstraintChange(colIndex,'primary key')}}/>primary key</label>
                <label><input type="checkbox" checked={col.constraints.includes('foreign key')} onChange={()=>{handleConstraintChange(colIndex,'foreign key')}}/>foreign key</label>
                <label><input type="checkbox" checked={col.constraints.includes('not null')} onChange={()=>{handleConstraintChange(colIndex,'not null')}}/>not null</label>
                <label><input type="checkbox" checked={col.constraints.includes('unique')} onChange={()=>{handleConstraintChange(colIndex,'unique')}}/>unique</label>
                <label><input type="checkbox" checked={col.constraints.includes('check')} onChange={()=>handleConstraintChange(colIndex,'check')}/>check</label>
            </div>
            {col.constraints.includes("foreign key")&&(
              <>
                <input type="text"
                placeholder='Ref Table'
                value={col.referenceTable}
                onChange={(e)=>updateColumn(colIndex,'referenceTable',e.target.value)}/>
                <input type="text"
                placeholder='Ref Col'
                value={col.referenceColumn}
                onChange={(e)=>updateColumn(colIndex,'referenceColumn',e.target.value)}/>
              </>
            )
          }
          {
            col.constraints.includes("check")&&(
              <div>
                <input type="text"
                placeholder='Enter check constraint'
                value={col.checkCondition}
                onChange={(e)=>updateColumn(colIndex,'checkCondition',e.target.value)}
                />
                <small>Example: salary &gt; 0</small>
              </div>
            )
          }
          <button onClick={()=>handleRemoval(colIndex)}>-</button>
          </div>
          ))
        }
      </div>
    )
  }
  const renderSchemas = ()=>{
    if(!quesDesc.schemas.length) return<p>Loading...</p>
    return(
      <div>
        {
          quesDesc.schemas.map((schema)=>(
            <p>{schema.tableName}</p>
          ))
        }
      </div>
    )
  }
  return (
    <div className='outer-container-div'>
      <div>
        {
          renderSchemas()
        }
      </div>
      <input className='tableName-input'
      type="text" placeholder='Table Name' 
      value={tableName}
      onChange={(e)=>{setTableName(e.target.value)}}/>
      <button type="button" onClick={()=>{setColsNum(prev=>prev+1)}}
        className='plus-button'>+</button>
      <div>
        {renderColumn()}
      </div>
      <Button className='addschema-button' name={'Add Schema'} handler={()=>{handleSchemaAddition(tableName,columns)}}/>
    </div>
  )
}

export default CreateSchema
