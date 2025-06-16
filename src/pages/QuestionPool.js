import React, { useEffect, useState } from 'react'
import './QuestionPool.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import QuestionsList from '../components/QuestionsList';

const QuestionPool = () => {
  const navigate = useNavigate();
  const [questions,setQuestions] = useState([]);

  useEffect(()=>{
    const fetchQuestions = async()=>{
      try{
        const res = await axios.get('http://localhost:5001/api/getquestions');
        const data = res.data;
        if(data){
          setQuestions(data);
        }else{
          console.log('Questions list is empty');
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchQuestions();
  },[]);

  const updateQuestions = (id)=>{
    const newQuestions = questions.filter(ques=>ques.id!==id);
    setQuestions(newQuestions);
  }

  const handleDelete = async(ques)=>{
    try{
      const res = await axios.delete(`http://localhost:5001/api/deletequestion/${ques.id}`);
      const data = res.data;
      if(data.msg){
        alert('Deleted');
        updateQuestions(ques.id);
      }
    }
    catch(err){
      console.log(err);
    }
  }
  
  return (
    <div>
      <div className='create-button-div'>
        <button className='create-question-button' onClick={()=>{
          navigate('/createquestion');
        }}>Create question</button>
      </div> 
      <div>
        {
          questions&&questions.map(ques=>(
            <QuestionsList ques={ques} key={ques.id} handleDelete={handleDelete}/>
          ))
        }
      </div>
    </div>
  )
}

export default QuestionPool
