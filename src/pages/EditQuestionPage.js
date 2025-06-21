import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import EditSchemaLine from '../components/EditSchemaLine';
import EditAddSchema from '../components/EditAddSchema';
import './EditQuestionPage.css'

const EditQuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newQues, setNewQues] = useState({
    title: '',
    description: '',
    statement: '',
    type: '',
    marks: '',
    schemas: []
  });

  const [loading, setLoading] = useState(true);
  const [showSchemaModal, setShowSchemaModal] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/getoneques/${id}`);
        const ques = res.data;
        setNewQues({
          title: ques.title || '',
          description: ques.description || '',
          statement: ques.statement || '',
          type: ques.type || '',
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

  useEffect(() => {
  console.log('Updated schemas:', newQues.schemas);
}, [newQues]);

  const onSave = ()=>{

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const renderComponent = ()=>{
    if(!newQues.schemas) return <p>Loading...</p>
    return <EditSchemaLine newQues={newQues} setNewQues={setNewQues}/>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5001/api/editquestion/${id}`, newQues);
      if (res.data.msg) {
        alert('Edited');
        navigate('/questionpool');
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if(showSchemaModal) return(
    showSchemaModal && (
      <EditAddSchema
        onSave={(newSchema) => {
          setNewQues(prev => ({
            ...prev,
            schemas: [...prev.schemas, newSchema]
          }));
        }}
        setShowSchemaModal={setShowSchemaModal}
      />
    )
  )
  return (

    <div className={showSchemaModal ? 'blur-background' : ''}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="title-box"
          placeholder="Question Title"
          value={newQues.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          className="desc-box"
          value={newQues.description}
          onChange={handleChange}
        />

        <textarea
          name="statement"
          className="qstatement-box"
          value={newQues.statement}
          onChange={handleChange}
        />

        <select value={newQues.type}
          name="type"
          className='type-dropdown'
          onChange={handleChange}>
          <option>Select type</option>
          <option value="DDL">DDL</option>
          <option value="DML">DML</option>
          <option value="PLSQL">PL/SQL</option>
        </select>

        <input
          type="number"
          name="marks"
          className="marks-box"
          placeholder="Marks"
          value={newQues.marks}
          onChange={handleChange}
        />
        <p>Schemas:</p>
        <div>
          {
            renderComponent()
          }
        </div>
        <button
          className="addschema-button"
          type="button"
          onClick={() => setShowSchemaModal(true)}>Add Schema</button>

        <input type="submit" className="submit-button" value="Save" />
      </form>
    </div>
  );
};

export default EditQuestionPage;
