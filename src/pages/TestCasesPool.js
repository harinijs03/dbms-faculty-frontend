import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import './TestCasePool.css'

const TestCasesPool = () => {
  const [testCases,setTestCases] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchTestCases = async()=>{
      try{
        const res = await axios.get(`http://localhost:5001/api/gettestcases/${id}`);
        setTestCases(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchTestCases()
  },[id,testCases]);

  const updateTestCase = (id)=>{
    if(!testCases) return;
    const updated = testCases.filter(tcase=>tcase._id===id);
    setTestCases(updated);
  }

  const handleDelete = async(id)=>{
    try{
      const res = await axios.delete(`http://localhost:5001/api/deletetestcase/${id}`);
      const msg = res.data.msg;
      if(msg){
        alert('Deleted');
        updateTestCase(id);
      }
    }catch(err){
      console.log(err);
    }
  }

  if(!testCases) return<p>Loading...</p>
  return (
    <div>
      {
        testCases.map((tcase,tcaseIndex)=>(
          <div className='testcase-card'>
            <p>TestCase: {tcaseIndex}</p>
            <div>
              <button onClick={()=>{
                navigate(`/edittestcase/${tcase._id}`);
              }} className='edit-testcase-button'>Edit</button>
              <button onClick={()=>{
                handleDelete(tcase._id)
              }} className='delete-testcase-button'>Delete</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default TestCasesPool
