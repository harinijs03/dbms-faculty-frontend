import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditTestCasePage.css';

const EditTestCasePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [testCase, setTestCase] = useState(null);
  const [schemas, setSchemas] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [outputTableData, setOutputTableData] = useState({ columns: [], values: [] });
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testCaseRes = await axios.get(`http://localhost:5001/api/getonetestcase/${id}`);
        const testCaseData = testCaseRes.data;
        setTestCase(testCaseData);
        console.log(testCaseData);

        const schemaRes = await axios.get(`http://localhost:5001/api/getoneschema/${testCaseData.questionId}`);
        setSchemas(schemaRes.data.schemas || []);

        const flattenedInput = testCaseData.input.flat();
        setTableData(flattenedInput || []);
        
        setOutputTableData(testCaseData.output || { columns: [], values: [] });
        setHidden(testCaseData.hidden || false);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData()
},[id]);

  const handleInputChange = (tableIndex, rowIndex, colIndex, value) => {
    const updated = [...tableData];
    updated[tableIndex].values[rowIndex][colIndex] = value;
    setTableData(updated);
  };

  const handleOutputChange = (rowIndex, colIndex, value) => {
    const updated = { ...outputTableData };
    updated.values[rowIndex][colIndex] = value;
    setOutputTableData(updated);
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        input: tableData,
        output: outputTableData,
        hidden,
      };
      await axios.put(`http://localhost:5001/api/edittestcase/${id}`, updatedData);
      alert('Test case updated successfully!');
      navigate(-1);
    } catch (err) {
      console.error("Update failed", err);
      alert('Update failed.');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!testCase) return <p className="error">Error loading test case</p>;

  return (
    <div className="edit-container">
      <h2>Edit Test Case</h2>

      <h3>Input Tables</h3>
      {Array.isArray(tableData) && tableData.length > 0 ? (
        tableData.map((table, tableIndex) => {
          const schema = schemas.find(s => s.tableName === table.tableName);
          if (!schema) return null;

          return (
            <div key={table.tableName} className="table-section">
              <h4>{table.tableName}</h4>
              <table className="testcase-table">
                <thead>
                  <tr>
                    {schema.columns.map((col, idx) => (
                      <th key={idx}>{col.columnName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.values.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex}>
                          <input
                            type="text"
                            value={cell}
                            onChange={(e) => handleInputChange(tableIndex, rowIndex, colIndex, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })
      ) : (
        <p style={{ color: 'gray' }}>No input table data found.</p>
      )}

      <h3>Output Table</h3>
      {outputTableData?.columns?.length > 0 ? (
        <div className="table-section">
          <table className="testcase-table">
            <thead>
              <tr>
                {outputTableData.columns.map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {outputTableData.values.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleOutputChange(rowIndex, colIndex, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ color: 'gray' }}>No output table data found.</p>
      )}

      <div className="form-actions">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={hidden}
            onChange={(e) => setHidden(e.target.checked)}
          />
          Mark as Hidden
        </label>
        <button className="save-btn" onClick={handleSubmit}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditTestCasePage;