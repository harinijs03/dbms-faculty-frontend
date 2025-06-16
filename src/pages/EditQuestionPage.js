import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditQuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newQues, setNewQues] = useState({
    title: '',
    description: '',
    statement: '',
    inputFormat: '',
    outputFormat: '',
    marks: ''
  });

  const [loading, setLoading] = useState(true);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

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

  return (
    <div>
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

        <textarea
          name="inputFormat"
          className="iformat-box"
          value={newQues.inputFormat}
          onChange={handleChange}
        />

        <textarea
          name="outputFormat"
          className="oformat-box"
          value={newQues.outputFormat}
          onChange={handleChange}
        />

        <input
          type="number"
          name="marks"
          className="marks-box"
          placeholder="Marks"
          value={newQues.marks}
          onChange={handleChange}
        />

        <input type="submit" className="submit-button" value="Save" />
      </form>
    </div>
  );
};

export default EditQuestionPage;
