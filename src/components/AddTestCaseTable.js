import React, { useState, useEffect } from 'react';

const AddTestCaseTable = ({ columns, tableName, onSave, onCancel }) => {
  const [tableData, setTableData] = useState([]);
  const [rowsNum,setRowsNum] = useState(0);

  useEffect(() => {
    setTableData(
      Array.from({ length: rowsNum }, () =>
        Array.from({ length: columns.length }, () => '')
      )
    );
  }, [rowsNum, columns]);

  const handleInputChange = (rowIdx, colIdx, value) => {
    setTableData(prev => {
      const updated = [...prev];
      updated[rowIdx] = [...updated[rowIdx]];
      updated[rowIdx][colIdx] = value;
      return updated;
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{tableName}</h3>
        <input type="number" value={rowsNum} onChange={(e)=>{
          setRowsNum(e.target.value);
        }}></input>
        <table>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>{col.columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, colIdx) => (
                  <td key={colIdx}>
                    <input
                      value={cell}
                      onChange={(e) =>
                        handleInputChange(rowIdx, colIdx, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button onClick={() => onSave(tableName, tableData)}
          style={{backgroundColor: 'green', width: 50, borderRadius: 3, border: 'none', marginRight: 10,color: 'white', height:25, cursor: 'pointer'}}>Save</button>
        <button onClick={onCancel}
          style={{backgroundColor: 'red', width: 60, borderRadius: 3, border: 'none', marginRight: 10,color: 'white', height:25, cursor:'pointer'}}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTestCaseTable;
