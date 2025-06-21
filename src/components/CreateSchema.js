import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './CreateSchema.css'

const CreateSchema = ({rowsNum,setRowsNum,colsNum,setColsNum,tableName,setTableName,columns,setColumns}) => {

  useEffect(()=>{
      setColumns(prev=>{
        let updated = [...prev];
        while(updated.length<colsNum){
          updated.push({columnName: '',type: ''});
        }
        return updated.slice(0,colsNum);
      });
  },[colsNum]);

  return (
    <div>
      <div>
        <input type="number" value={rowsNum} onChange={(e)=>{
          setRowsNum(e.target.value);
        }}/>
        <input type="number" value={colsNum} onChange={(e)=>{
          setColsNum(e.target.value);
        }}/>
        <div>
          <input type="text" placeholder='tablename'
          value={tableName}
          onChange={(e)=>{
            setTableName(e.target.value);
          }}/>
         {
          columns.map((col,index)=>(
            <div key={index}>
              <input type="text" placeholder="colname" value={col.columnName}
              onChange={(e)=>{
                const newCols = [...columns];
                newCols[index].columnName = e.target.value;
                setColumns(newCols);
              }}></input>
              <select value={col.type}
                onChange={(e) => {
                  const newCols = [...columns];
                  newCols[index].type = e.target.value;
                  setColumns(newCols);
                }}>
                <option value="">-- Select type --</option>
                <option value="number">
                  number
                </option>
                <option value="varchar"> 
                  varchar
                </option>
              </select>
            </div>
          ))
         }
        </div>
      </div>
    </div>
  )
}

export default CreateSchema
