import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PopulateTable = ({ columns, tableName, id, rowsNum: initialRowsNum, colsNum: initialColsNum, testcaseType, resetInputFields}) => {
    const [tableData, setTableData] = useState(() => {
        if (initialRowsNum > 0 && initialColsNum > 0) {
            Array.from({length: initialRowsNum},()=>
            Array.from({length: initialColsNum}),()=>'')
        }
        return [];
    });

    useEffect(() => {
        if (initialRowsNum > 0 && initialColsNum > 0) {
            setTableData(
                Array.from({length: initialRowsNum},()=>
            Array.from({length: initialColsNum}),()=>'')
            );
        } else {
            setTableData([]);
        }
    }, [initialRowsNum, initialColsNum]);

    const handleInputChange = (rowIndex, colIndex, value)=> {
        setTableData(prevTableData => {
            const newTableData = [...prevTableData];
            newTableData[rowIndex] = [...newTableData[rowIndex]]; 
            newTableData[rowIndex][colIndex] = value;
            return newTableData;
        });
    };

    const renderHeading = () => {
        if (!columns || columns.length === 0) {
            return null; 
        }
        return columns.map((col, index) => (
            <th key={index}>
                {col.columnName} {col.type ? `(${col.type})` : ''}
            </th>
        ));
    };

    const renderTableRows = () => {
        if (!tableData || tableData.length === 0) {
            return <tr><td colSpan={columns.length}>No data to display.</td></tr>;
        }

        return tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.map((cellValue, colIndex) => (
                    <td key={colIndex}>
                        <input
                            type="text" 
                            value={cellValue}
                            onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                        />
                    </td>
                ))}
            </tr>
        ));
    };

    const handleSubmit = async () => {
        try {
            const apiUrl = testcaseType === 'input'
                ? 'http://localhost:5001/api/insert-input-testcase'
                : 'http://localhost:5001/api/insert-output-testcase';

            const payload = {
                id,tableName,columns,tableData
            };

            const res = await axios.post(apiUrl, payload);
            console.log('Backend response:', res.data);
            alert(`${testcaseType} Test Case inserted successfully!`);
            setTableData(
                Array(initialRowsNum).fill().map(() =>
                    Array(initialColsNum).fill('')
                )
            );
            resetInputFields();
          } catch (error) {
            console.error('Error inserting test case:', error.response ? error.response.data : error.message);
            alert(`Error inserting ${testcaseType} Test Case. Check console for details.`);
        }
    };

    if (!columns || columns.length === 0) {
        return (
            <div>
                <p>Please define the table schema in the section above before populating data.</p>
            </div>
        );
    }

    return (
        <div className="populate-table-container">
            <h2>Populate {testcaseType === 'input' ? 'Input' : 'Output'} Test Case Data</h2>
            <p>Table Name: <strong>{tableName}</strong></p>
            <table className="data-table">
                <thead>
                    <tr>
                        {renderHeading()}
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
            <br />
            <button onClick={handleSubmit} className="insert-data-button"
                style={{backgroundColor: 'rgb(0,140,255)', height:'30px',
                    width: '150px',
                    borderBlockStyle: 'solid',
                    border: 'none',
                    borderRadius: '3px',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>
                Insert {testcaseType === 'input' ? 'Input' : 'Output'} Data
            </button>
        </div>
    );
};

export default PopulateTable;