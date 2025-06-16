import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ViewQuestionPage.css'

const ViewQuestionPage = () => {
  const { id } = useParams();

  const [newQues, setNewQues] = useState({
    title: '',
    description: '',
    statement: '',
    inputFormat: '',
    outputFormat: '',
    marks: ''
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/getoneques/${id}`);
        const ques = res.data[0]; 
        setNewQues({
          title: ques.title || '',
          description: ques.description || '',
          statement: ques.statement || '',
          inputFormat: ques.inputFormat || '',
          outputFormat: ques.outputFormat || '',
          marks: ques.marks || ''
        });
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className='ques-desc-div'>
        <p>Title:</p>
        <input value={newQues.title} readOnly />
        <p>Description:</p>
        <input value={newQues.description} readOnly />
        <p>Statement:</p>
        <input value={newQues.statement} readOnly />
        <p>Input Format:</p>
        <input value={newQues.inputFormat} readOnly />
        <p>Output Format:</p>
        <input value={newQues.outputFormat} readOnly />
        <p>Marks:</p>
        <input value={newQues.marks} readOnly />
      </div>
      <div>
        <button onClick={() => {
          navigate(`/addtestcasepage/${id}`);
        }} className='addtestcase-button'>
          Add Test Cases
        </button>
      </div>
    </div>
  );
};

export default ViewQuestionPage;
