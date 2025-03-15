"use client"
import React, { useRef, useEffect, useState } from 'react';

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

    // Load the image from localStorage if it exists
    useEffect(() => {
      const savedImage = localStorage.getItem('drawingImage');
      if (savedImage) {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
          const img = new Image();
          img.src = savedImage; // Load the saved image
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing the saved image
            ctx.drawImage(img, 0, 0); // Draw the image onto the canvas
          };
        }
      }
    }, []); 


  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if(canvas) {
      const ctx = canvas.getContext('2d');
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      setLastPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    } else {
      console.error("Canvas element is not available")
    }

  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (canvas){
      const ctx = canvas.getContext('2d');
    if (ctx) {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
  
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(currentX, currentY);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
      setLastPos({ x: currentX, y: currentY });
    } else {
      console.error("Failed to get 2D context")
    }
    } 
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

    // // Save the image in localStorage
    // const saveImageToLocalStorage = () => {
    //   const canvas = canvasRef.current;
    //   if (canvas) {
    //     const dataUrl = canvas.toDataURL('image/png'); // Convert the canvas to a base64-encoded PNG image
    //     localStorage.setItem('drawingImage', dataUrl); // Store the image in localStorage
    //     console.log('Image saved to localStorage');
    //   }
    // };

  // Function to save the image and send it to the backend
  const saveAndSendImage = () => {
    const canvas = canvasRef.current;
    if(canvas){
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
    }
  };
  

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas){
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-extrabold mb-6 text-center">
        Draw a spiral from its center outward by hand
      </h1>
      <div className="flex w-[54vw] items-center m-auto mb-6 justify-center bg-gray-800 px-6 py-6 rounded-3xl">
      <div>
      {/* <h1 className="text-xl font-medium mb-6 text-center">
          Draw a spiral from its center outward by hand
      </h1> */}
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        className='border border-zinc-900 bg-gray-900 rounded-3xl'
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
      <br />
      {/* <button onClick={saveImageToLocalStorage}>Save Image</button> */}
      <div className='flex gap-8 items-center'>
      <button onClick={saveAndSendImage}
        className='px-4 py-2 ml-22 flex rounded-full text-sm font-medium transition-all duration-300 bg-orange-800 text-white/70 hover:bg-purple-700 hover:text-white'
      >
        Save and Send Image
      </button>
      <button onClick={clearCanvas}
        className='px-4 py-2 flex rounded-full text-sm font-medium transition-all duration-300 bg-purple-800 text-white/70 hover:bg-orange-700 hover:text-white'
      >
        Clear
      </button>
      </div>
      </div>
    </div>
    </div>
  );
};

export default DrawingCanvas;
