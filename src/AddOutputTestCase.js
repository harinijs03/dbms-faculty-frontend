import React, { useState, useEffect } from 'react';

const AddOutputTestCase = ({ onSave, onCancel }) => {
  const [rowsNum, setRowsNum] = useState(0);
  const [colsNum, setColsNum] = useState(0);
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (rowsNum > 0 && colsNum > 0) {
      setTableData(
        Array.from({ length: Number(rowsNum) }, () =>
          Array.from({ length: Number(colsNum) }, () => '')
        )
      );
      setColumns(Array.from({ length: Number(colsNum) }, () => ''));
    }
  }, [rowsNum, colsNum]);

  const renderSchemaTable = () => {
    const table = [];
    for (let i = 0; i < colsNum; i++) {
      table.push(
        <th key={i}>
          <input
            type="text"
            placeholder="ColName"
            value={columns[i]}
            onChange={(e) => {
              setColumns((prev) => {
                const updated = [...prev];
                updated[i] = e.target.value;
                return updated;
              });
            }}
          />
        </th>
      );
    }
    return <tr>{table}</tr>;
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    setTableData((prev) => {
      const updated = [...prev];
      updated[rowIndex] = [...updated[rowIndex]];
      updated[rowIndex][colIndex] = value;
      return updated;
    });
  };

  const renderTable = () => {
    return tableData.map((row, i) => (
      <tr key={i}>
        {row.map((cell, j) => (
          <td key={j}>
            <input
              type="text"
              value={cell}
              onChange={(e) => handleInputChange(i, j, e.target.value)}
            />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Output TestCase</h3>

        <input
          type="number"
          placeholder="Rows"
          value={rowsNum}
          onChange={(e) => setRowsNum(e.target.value)}
          style={{ marginRight: '10px' }}
        />

        <input
          type="number"
          placeholder="Columns"
          value={colsNum}
          onChange={(e) => setColsNum(e.target.value)}
        />

        <div style={{ marginTop: '20px' }}>
          <table border="1" cellPadding="6">
            <thead>{renderSchemaTable()}</thead>
            <tbody>{renderTable()}</tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button onClick={() => onSave(columns, tableData)}
            style={{backgroundColor: 'green', width: 50, borderRadius: 3, border: 'none', marginRight: 10,color: 'white', height:25, cursor: 'pointer'}}>Save</button>
          <button onClick={onCancel} style={{backgroundColor: 'red', width: 70, borderRadius: 3, border: 'none', marginRight: 10,color: 'white', height:25, cursor: 'pointer'}}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOutputTestCase;
