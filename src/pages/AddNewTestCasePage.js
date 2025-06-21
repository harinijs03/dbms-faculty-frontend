import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AddTestCaseTable from '../components/AddTestCaseTable';
import AddOutputTestCase from '../AddOutputTestCase';
import Papa from 'papaparse'


const AddNewTestCasePage = () => {
  const [schemas, setSchemas] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [outputTableData, setOutputTableData] = useState(null);
  const [curTable, setCurTable] = useState([]);
  const [showOutputModal, setShowOutputModal] = useState(false);
  const [hidden,setHidden] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const newSchema = await axios.get(`http://localhost:5001/api/getoneschema/${id}`);
        setSchemas(newSchema.data.schemas);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSchema();
  }, [id]);

  useEffect(() => {
    const initialize = () => {
      const tableValue = [];
      if (schemas) {
        schemas.forEach(schema => {
          tableValue.push({
            tableName: schema.tableName,
            values: []
          });
        });
        setTableData(tableValue);
      }
    };
    initialize();
  }, [schemas]);

  const renderEnteredValues = (tname) => {
    const schema = schemas.find(schema => schema.tableName === tname);
    const tableEntry = tableData.find(t => t.tableName === tname);

    if (!schema || !tableEntry || !tableEntry.values || tableEntry.values.length === 0) {
      return <p className='para-div'>No values entered so far...</p>;
    }

    return (
      <table border="1" cellPadding="6" style={{ marginTop: "10px",marginLeft:'auto', marginRight: 'auto', marginBottom:'20px' }}>
        <thead>
          <tr>
            {schema.columns.map((col, idx) => (
              <th key={idx}>{col.columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableEntry.values.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleSave = (tableName, values) => {
    setTableData(prev => {
      const index = prev.findIndex(t => t.tableName === tableName);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { tableName, values };
        return updated;
      } else {
        return [...prev, { tableName, values }];
      }
    });
    setShowInputModal(false);
  };

  const renderEnteredOutputValues = () => {
    if (!outputTableData || !outputTableData.values || outputTableData.values.length === 0) {
      return <p className='para-div'>No values entered so far</p>;
    }

    return (
      <table border="1" cellPadding="6" style={{ marginTop: "10px",marginLeft:'auto', marginRight: 'auto', marginBottom:'20px' }}>
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
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const parseCSV = (csvText) => {
  const parsed = Papa.parse(csvText, {
    header: false,
    skipEmptyLines: true,
  });

  const rows = parsed.data;
  let tempTableData = [];
  let tempOutput = { columns: [], values: [] };

  let currentTableName = '';
  let currentRows = [];
  let collectingOutput = false;
  let collectingHeader = true;
  let currentColumns = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    if (row[0].startsWith('##table:')) {
      if (currentTableName && currentRows.length > 0) {
        tempTableData.push({
          tableName: currentTableName,
          values: currentRows,
        });
      }

      currentTableName = row[0].split('##table:')[1].trim();
      currentRows = [];
      collectingOutput = false;
      collectingHeader = true;
      currentColumns = [];

    } else if (row[0].startsWith('##output')) {
      if (currentTableName && currentRows.length > 0) {
        tempTableData.push({
          tableName: currentTableName,
          values: currentRows,
        });
      }
      currentTableName = '';
      currentRows = [];
      collectingOutput = true;
      collectingHeader = true;
      currentColumns = [];

    } else {
      if (collectingHeader) {
        currentColumns = row;
        collectingHeader = false;

        if (collectingOutput) {
          tempOutput.columns = row;
        }

      } else {
        if (collectingOutput) {
          tempOutput.values.push(row);
        } else {
          currentRows.push(row);
        }
      }
    }
  }

  // Final table push if needed
  if (currentTableName && currentRows.length > 0) {
    tempTableData.push({
      tableName: currentTableName,
      values: currentRows,
    });
  }

  setTableData(prev => {
    const updated = [...prev];
    tempTableData.forEach(newTable => {
      const idx = updated.findIndex(t => t.tableName === newTable.tableName);
      if (idx !== -1) {
        updated[idx].values = newTable.values;
      } else {
        updated.push(newTable); 
      }
    });
    return updated;
  });

  setOutputTableData(tempOutput);
};


  const handleCSVUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => parseCSV(reader.result);
    reader.readAsText(file);
  };

  const handleOutputSave = (outputCols, outputValues) => {
    setOutputTableData({
      columns: outputCols,
      values: outputValues
    });
    console.log(outputTableData);
    setShowOutputModal(false);
  };

  const handleSubmit = async () => {
  const data = {
    questionId: id,
    input: tableData,
    output: outputTableData,
    hidden: hidden,
  };

  console.log("Data sent to backend:", data); 

  try {
    const res = await axios.post('http://localhost:5001/api/addtestcases', data);
    console.log("Test case saved:", res.data);
    navigate(-1);
  } catch (err) {
    console.error("Error submitting test case:", err.response?.data || err.message);
  }
};


  return (
    <div>
      {showInputModal && (
        <AddTestCaseTable
          columns={curTable.columns}
          tableName={curTable.tableName}
          onSave={handleSave}
          onCancel={() => setShowInputModal(false)}
        />
      )}

      {showOutputModal && (
        <AddOutputTestCase
          onSave={handleOutputSave}
          onCancel={() => setShowOutputModal(false)}
        />
      )}

      <div style={{ border: 'none', margin: 20, padding: 10, boxShadow: '5px 5px 10px rgba(0,0,0,0.15)'}} >
        <p>Input TestCases:</p>
        {schemas.map((schema, index) => (
          <div key={index}>
            <p>{schema.tableName}</p>
            <div>{renderEnteredValues(schema.tableName)}</div>
            <button
              className="inputtestcase-button"
              onClick={() => {
                setCurTable(schema);
                setShowInputModal(true);
              }}
              style={{
                backgroundColor: 'rgb(34, 94, 143)',
                height: 25,
                border: 'none',
                color: 'white',
                borderRadius: 3,
                width: 70
              }}
            >
              Add Input
            </button>
          </div>
        ))}
      </div>

      <div style={{ border: 'none', margin: 20, padding: 10, boxShadow: '5px 5px 10px rgba(0,0,0,0.15)'}}>
        <p>Output TestCases:</p>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 10
          }}
        >{renderEnteredOutputValues()}</div>
        <button
          className="outputtestcase-button"
          onClick={() => setShowOutputModal(true)}
          style={{
                backgroundColor: 'rgb(34, 94, 143)',
                height: 25,
                border: 'none',
                color: 'white',
                borderRadius: 3,
                width: 85
              }}
        >
          Add Output
        </button>
      </div>
      <input type="checkbox" checked={hidden} onChange = {(e)=>{setHidden(e.target.checked)}}/>
      <p>Upload a csv to make things easier</p>
      <input type="file" accept='.csv' onChange={handleCSVUpload}/>
      <br/>
      <button onClick={()=>{
        handleSubmit()
      }} style={{
                backgroundColor: 'rgb(51, 156, 231)',
                height: 25,
                border: 'none',
                color: 'white',
                borderRadius: 3,
                width: 100,
                marginTop: 10
              }}>Add Test Case</button>
    </div>
  );
};

export default AddNewTestCasePage;

