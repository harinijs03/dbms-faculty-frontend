import React, { useEffect, useState } from 'react'
import { UserContext } from '../pages/CreateQuestionPage'
import { useContext } from 'react'

const InputTestCaseDML = () => {
  const {quesDesc,setQuesDesc,testCases,setTestCases, quesId} = useContext(UserContext);
  const [tableData, setTableData] = useState([]);
  const [rowsNum,setRowsNum] = useState(0);
  const {testCaseDummy,setTestCaseDummy} = useState({
    questionId: quesId,
    inputVariables: [],
    expectedOutput: [],
    expectedTableName: '',
    inputTables: [],
    hidden: false
  });
  useEffect(() => {
    setTableData(
      Array.from({ length: rowsNum }, () =>
        Array.from({ length: columns.length }, () => '')
      )
    );
  }, [rowsNum, columns]);
  if(quesDesc.expectedOutputType==='query_ouput'){
    return(
      <div>
        <input type="text"
        placeholder='refcode'
        value={quesDesc.referenceCode}
        onChange={(e)=>setQuesDesc(prev=>{
          const updated = {...prev,referenceCode: e.target.value}
          return updated;
        })}/>
      </div>
    )
  }
  return (
    <div>
      <div>
        <input type="text" 
        placeholder='rowsNum'
        value={rowsNum}
        onChange={(e)=>setRowsNum(e.target.value)}/>
      </div>
      <div>
        {

        }
      </div>
    </div>
  )
}

export default InputTestCaseDML
