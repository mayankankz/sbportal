import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const TemplateEditor = ({ templateImage }) => {
  const [placedFields, setPlacedFields] = useState([]);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'FIELD',
    drop: (item) => {
      setPlacedFields((prevFields) => [
        ...prevFields,
        { field: item.field, x: 0, y: 0 }, // You can set the initial x and y positions here
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const handleFieldMove = (index, x, y) => {
    setPlacedFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = { ...updatedFields[index], x, y };
      return updatedFields;
    });
  };

  return (
    <div>
      <h2>Template Editor</h2>
      {templateImage ? (
        <div
          ref={drop}
          style={{
            width: '500px', // Set the dimensions of the template container
            height: '300px',
            border: '1px solid black',
            position: 'relative',
            backgroundImage: `url(${URL.createObjectURL(templateImage)})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {placedFields.map((placedField, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: placedField.x,
                top: placedField.y,
                border: '1px solid red', // For demonstration purposes, you can add some styling to the fields
                padding: '4px',
                background: 'white',
              }}
              onMouseDown={(e) => {
                // Handle drag of the placed field
                const startX = e.clientX;
                const startY = e.clientY;
                const onMouseMove = (e) => {
                  const deltaX = e.clientX - startX;
                  const deltaY = e.clientY - startY;
                  handleFieldMove(index, placedField.x + deltaX, placedField.y + deltaY);
                };
                const onMouseUp = () => {
                  document.removeEventListener('mousemove', onMouseMove);
                  document.removeEventListener('mouseup', onMouseUp);
                };
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
              }}
            >
              {placedField.field}
            </div>
          ))}
        </div>
      ) : (
        <p>Please upload a template image</p>
      )}
    </div>
  );
};

export default TemplateEditor;
