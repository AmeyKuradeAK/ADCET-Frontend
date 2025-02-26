"use client";

import { useRef, useState, useEffect, MouseEvent } from "react";

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [shape, setShape] = useState("freehand");
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imagePos, setImagePos] = useState({ x: 50, y: 50, width: 100, height: 100 });
  const [draggingImage, setDraggingImage] = useState(false);
  const [resizingImage, setResizingImage] = useState(false);

  useEffect(() => {
    if (image) {
      redrawCanvas();
    }
  }, [image]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth * 0.49;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight * 0.8;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctxRef.current = ctx;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [color]);

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (image) {
      const isOnImage = offsetX >= imagePos.x && offsetX <= imagePos.x + imagePos.width && offsetY >= imagePos.y && offsetY <= imagePos.y + imagePos.height;
      const isOnCorner = offsetX >= imagePos.x + imagePos.width - 10 && offsetX <= imagePos.x + imagePos.width && offsetY >= imagePos.y + imagePos.height - 10 && offsetY <= imagePos.y + imagePos.height;
      if (isOnCorner) {
        setResizingImage(true);
      } else if (isOnImage) {
        setDraggingImage(true);
      }
    } else {
      setStartPos({ x: offsetX, y: offsetY });
      setDrawing(true);
    }
  };

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!ctxRef.current || !startPos) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = ctxRef.current;

    if (resizingImage && image) {
      setImagePos({ ...imagePos, width: offsetX - imagePos.x, height: offsetY - imagePos.y });
      redrawCanvas();
      return;
    }

    if (draggingImage && image) {
      setImagePos({ ...imagePos, x: offsetX - imagePos.width / 2, y: offsetY - imagePos.height / 2 });
      redrawCanvas();
      return;
    }

    if (!drawing) return;

    if (shape === "freehand") {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    } else if (shape === "rectangle") {
      const width = offsetX - startPos.x;
      const height = offsetY - startPos.y;
      redrawCanvas();
      ctx.strokeRect(startPos.x, startPos.y, width, height);
    } else if (shape === "circle") {
      const radius = Math.sqrt(Math.pow(offsetX - startPos.x, 2) + Math.pow(offsetY - startPos.y, 2));
      redrawCanvas();
      ctx.beginPath();
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setDrawing(false);
    setDraggingImage(false);
    setResizingImage(false);
    if (ctxRef.current) ctxRef.current.closePath();
  };

  const clearCanvas = () => {
    if (!ctxRef.current) return;
    ctxRef.current.clearRect(0, 0, ctxRef.current.canvas.width, ctxRef.current.canvas.height);
    setImage(null);
  };

  const exportAsImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "whiteboard.png";
    link.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setImage(img);
    };
  };

  const redrawCanvas = () => {
    if (!ctxRef.current || !canvasRef.current) return;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    if (image) {
      ctx.drawImage(image, imagePos.x, imagePos.y, imagePos.width, imagePos.height);
    }
  };

  return (
    <div className="flex flex-col items-center h-full w-full">
      <div className="flex-1 w-full h-full">
        <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={() => setDrawing(false)} className="border border-gray-300 w-full h-full" />
      </div>
      <div className="flex gap-2 p-2 bg-gray-200 w-full justify-center flex-wrap">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <button onClick={() => setShape("freehand")} className="px-3 py-1 bg-blue-500 text-white rounded">Pen</button>
        <button onClick={() => setShape("rectangle")} className="px-3 py-1 bg-blue-500 text-white rounded">Rectangle</button>
        <button onClick={() => setShape("circle")} className="px-3 py-1 bg-blue-500 text-white rounded">Circle</button>
        <button onClick={clearCanvas} className="px-3 py-1 bg-red-500 text-white rounded">Clear</button>
        <button onClick={exportAsImage} className="px-3 py-1 bg-green-500 text-white rounded">Export</button>
        <label htmlFor="fileInput" className="px-3 py-1 bg-yellow-500 text-white rounded cursor-pointer text-sm">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="fileInput" />
      </div>
    </div>
  );
};

export default Whiteboard;
