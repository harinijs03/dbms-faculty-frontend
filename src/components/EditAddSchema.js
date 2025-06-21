import React, { useState } from 'react';
import './EditAddSchema.css'; 

const EditAddSchema = ({ onSave, setShowSchemaModal }) => {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([{ columnName: '', type: '' }]);

  const handleColumnChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...columns];
    updated[index][name] = value;
    setColumns(updated);
  };

  const addColumn = () => {
    setColumns([...columns, { columnName: '', type: '' }]);
  };

  const handleSave = () => {
    if (!tableName.trim()) return alert("Table name is required.");
    if (columns.some(col => !col.columnName || !col.type)) return alert("All columns must be filled.");
    onSave({ tableName, columns });
    setShowSchemaModal(false);
  };

  const handleCancel = () => {
    setShowSchemaModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Schema</h3>

        <input
          type="text"
          placeholder="Table Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />

        {columns.map((col, index) => (
          <div key={index} className="column-row">
            <input
              type="text"
              placeholder="Column Name"
              name="columnName"
              value={col.columnName}
              onChange={(e) => handleColumnChange(index, e)}
            />
            <select
              name="type"
              value={col.type}
              onChange={(e) => handleColumnChange(index, e)}
            >
              <option value="">Select Type</option>
              <option value="number">Number</option>
              <option value="varchar">Varchar</option>
            </select>
          </div>
        ))}

        <button onClick={addColumn}>+ Add Column</button>

        <div className="modal-actions">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditAddSchema;
