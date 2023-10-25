import React, { useState, useRef, useEffect } from "react";

function GameCanvas() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("rgba(255, 0, 0, 0.5)");
  const [currentBrushSize, setCurrentBrushSize] = useState("20");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);
  }, []);

  const setColor = (color) => {
    setCurrentColor(color);
  };

  const setBrushSize = (size) => {
    setCurrentBrushSize(size);
  };

  const draw = (e) => {
    if (!drawing) return;

    ctx.lineWidth = currentBrushSize;
    ctx.lineCap = "butt";
    ctx.strokeStyle = currentColor;

    ctx.lineTo(
      e.clientX - canvasRef.current.getBoundingClientRect().left,
      e.clientY - canvasRef.current.getBoundingClientRect().top
    );
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - canvasRef.current.getBoundingClientRect().left,
      e.clientY - canvasRef.current.getBoundingClientRect().top
    );
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div>
      <canvas
        id="drawing-canvas"
        ref={canvasRef}
        width={360}
        height={300}
        onMouseDown={() => setDrawing(true)}
        onMouseUp={() => {
          setDrawing(false);
          ctx.beginPath();
        }}
        onMouseMove={draw}
      />
      <div>
        <div>
          <button
            className="color-button"
            style={{ backgroundColor: "red" }}
            onClick={() => setColor("rgba(255, 0, 0, 0.5")}
          ></button>
          <button
            className="color-button"
            style={{ backgroundColor: "green" }}
            onClick={() => setColor("rgba(0, 255, 0, 0.5")}
          ></button>
          <button
            className="color-button"
            style={{ backgroundColor: "blue" }}
            onClick={() => setColor("rgba(0, 0, 255, 0.5")}
          ></button>
        </div>
        <div>
          <button onClick={() => setBrushSize("2")}>SM</button>
          <button onClick={() => setBrushSize("10")}>MD</button>
          <button onClick={() => setBrushSize("20")}>LG</button>
        </div>
      </div>
      <button id="clear-button" onClick={clearCanvas}>
        Clear Canvas
      </button>
    </div>
  );
}

export default GameCanvas;
