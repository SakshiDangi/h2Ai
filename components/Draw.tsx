"use client"
import React, { useRef, useState } from 'react';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    setLastPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
    setLastPos({ x: currentX, y: currentY });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Function to save the image and send it to the backend
  const saveAndSendImage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png'); // Get image as PNG base64
    console.log(dataUrl);  // Check if dataUrl contains the correct base64 image string
  
    // Send the image to the backend via a POST request
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: dataUrl }), // Send the base64 image
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <h1>Draw with Mouse</h1>
      <canvas
        ref={canvasRef}
        width="256"
        height="256"
        style={{ border: '1px solid black', backgroundColor: 'white' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
      <br />
      <button onClick={saveAndSendImage}>Save and Send Image</button>
      <button onClick={clearCanvas}>Clear Canvas</button>
    </div>
  );
};

export default DrawingCanvas;
