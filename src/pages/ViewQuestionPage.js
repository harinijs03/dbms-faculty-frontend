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
    marks: '',
    schemas: [],
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/getoneques/${id}`);
        const ques = res.data; 
        setNewQues({
          title: ques.title || '',
          description: ques.description || '',
          statement: ques.statement || '',
          marks: ques.marks || '',
          schemas: ques.schemas || [], 
        });
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [id]);

  const RenderTable = (column)=>{
    if(!column) return <p>Loading...</p>
    return column.map(col=>(
      <tr>
        <td>{col.columnName}</td>
        <td>{col.type}</td>
      </tr>
    ))
  }
  const RenderSchemaItems = ()=>{
    if(!newQues.schemas) return <p>Loading...</p>
    return newQues.schemas.map(schema=>(
      <div>
        <p style={{
          color: 'rgb(18, 107, 180)'
        }}>Table - {schema.tableName}</p>
        {
            <table>
              <thead>
                <tr>
                  <th>Columns</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {
                  RenderTable(schema.columns)
                }
              </tbody>
            </table>
        }
      </div>
    ))
  }

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
        <p>Marks:</p>
        <input value={newQues.marks} readOnly />
        <p>Tables</p>
        <div>
          {RenderSchemaItems()}
        </div>
      </div>
      <div>
        <button onClick={()=>{
          navigate(`/viewtestcase/${id}`);
        }}
        className='viewtestcase-button'>View Test Cases</button>
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
