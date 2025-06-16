import React, { useEffect } from 'react'
import './AddTestcasesPage.css'
import { useState } from 'react';
import {useParams} from 'react-router-dom'
import CreateSchema from '../components/CreateSchema';
import PopulateTable from '../components/PopulateTable';

const AddTestcasesPage = () => {
  const [testcaseType,setTestCaseType] = useState('input');
  const [colorInput,setColorInput] = useState('rgb(0,140,255)');
  const [colorOutput,setColorOutput] = useState('white');
  const [rowsNum,setRowsNum] = useState(0);
  const [colsNum,setColsNum] = useState(0);
  const [columns,setColumns] = useState([{
      columnName:'',
      type: ''
  }]);
  const [tableName,setTableName] = useState('');
  const {id} = useParams();

  const resetInputFields = ()=>{
    setRowsNum(0);
    setColsNum(0);
    setColumns([{
      columnName:'',
      type: ''
    }]);
  }

  return (
    <div>
      <button className='inputtestcase-button'
        style={{
            backgroundColor: colorInput,
            color: colorOutput,
        }}
        onClick={()=>{
          setTestCaseType('input');
          setColorInput('rgb(0,140,255');
          setColorOutput('white');
        }}>Add Input Test Case</button>
      <button className='outputtestcase-button'
      style={{
            backgroundColor: colorOutput,
            color: colorInput,
        }}
        onClick={()=>{
          setTestCaseType('output');
          setColorOutput('rgb(0,140,255');
          setColorInput('white');
        }}
        >Add Output Test Case</button>
      <div>

      </div>
      <div className='create-schema-div'>
        <CreateSchema rowsNum={rowsNum} setRowsNum={setRowsNum}
          colsNum={colsNum} setColsNum={setColsNum}
          columns={columns} setColumns={setColumns}
          tableName={tableName} setTableName={setTableName} id={id}
          testcaseType={testcaseType}/>
        {/* <button onClick={()=>{

        }} className='table-generate-button'>Click this to generate table for input</button> */}
        <PopulateTable rowsNum={rowsNum} colsNum={colsNum} id={id}
        tableName={tableName} columns={columns} testcaseType={testcaseType} resetInputFields={resetInputFields}/>
      </div>
    </div>
  )
}

export default AddTestcasesPage
