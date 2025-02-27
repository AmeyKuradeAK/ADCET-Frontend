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
  const [imageScale, setImageScale] = useState(1);
  const [cropping, setCropping] = useState(false);
  const [cropStartPos, setCropStartPos] = useState<{ x: number; y: number } | null>(null);
  const [cropRect, setCropRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isShapeDropdownOpen, setIsShapeDropdownOpen] = useState(false);

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
      const scaledWidth = imagePos.width * imageScale;
      const scaledHeight = imagePos.height * imageScale;
      const isOnImage = offsetX >= imagePos.x && offsetX <= imagePos.x + scaledWidth && offsetY >= imagePos.y && offsetY <= imagePos.y + scaledHeight;
      const isOnCorner = offsetX >= imagePos.x + scaledWidth - 10 && offsetX <= imagePos.x + scaledWidth && offsetY >= imagePos.y + scaledHeight - 10 && offsetY <= imagePos.y + scaledHeight;
      if (cropping) {
        setCropStartPos({ x: offsetX, y: offsetY });
      } else if (isOnCorner) {
        setResizingImage(true);
      } else if (isOnImage) {
        setDraggingImage(true);
      }
    } else {
      setStartPos({ x: offsetX, y: offsetY });
      setDrawing(true);
      if (ctxRef.current) {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
      }
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
      setImagePos({ ...imagePos, x: offsetX - (imagePos.width * imageScale) / 2, y: offsetY - (imagePos.height * imageScale) / 2 });
      redrawCanvas();
      return;
    }

    if (cropping && cropStartPos) {
      setCropRect({
        x: Math.min(cropStartPos.x, offsetX),
        y: Math.min(cropStartPos.y, offsetY),
        width: Math.abs(offsetX - cropStartPos.x),
        height: Math.abs(offsetY - cropStartPos.y),
      });
      redrawCanvas();
      if (cropRect) {
        ctx.strokeStyle = "red";
        ctx.strokeRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);
      }
      return;
    }

    if (!drawing || shape !== "freehand") return;

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    setDrawing(false);
    setDraggingImage(false);
    setResizingImage(false);
    if (ctxRef.current) ctxRef.current.closePath();

    if (cropping && cropRect && image) {
      cropImage();
      setCropping(false);
      setCropStartPos(null);
      setCropRect(null);
      return;
    }

    if (!ctxRef.current || !startPos) return;
    const ctx = ctxRef.current;
    const { offsetX, offsetY } = e.nativeEvent;

    if (shape === "rectangle") {
      const width = offsetX - startPos.x;
      const height = offsetY - startPos.y;
      ctx.strokeRect(startPos.x, startPos.y, width, height);
    } else if (shape === "circle") {
      const radius = Math.sqrt(Math.pow(offsetX - startPos.x, 2) + Math.pow(offsetY - startPos.y, 2));
      ctx.beginPath();
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
    setStartPos(null);
  };

  const clearCanvas = () => {
    if (!ctxRef.current) return;
    ctxRef.current.clearRect(0, 0, ctxRef.current.canvas.width, ctxRef.current.canvas.height);
    ctxRef.current.fillStyle = "white";
    ctxRef.current.fillRect(0, 0, ctxRef.current.canvas.width, ctxRef.current.canvas.height);
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
      setTimeout(() => {
        redrawCanvas(img);
      }, 0);
    };
  };

  const redrawCanvas = (newImage: HTMLImageElement | null = null) => {
    if (!ctxRef.current || !canvasRef.current) return;
    const ctx = ctxRef.current;

    const savedImage = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.putImageData(savedImage, 0, 0);

    if (newImage || image) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(newImage || image!, imagePos.x, imagePos.y, imagePos.width * imageScale, imagePos.height * imageScale);
    }
  };

  const zoomImage = (scale: number) => {
    const newScale = Math.max(0.1, imageScale * scale);
    setImagePos(prevPos => ({
      ...prevPos,
      x: prevPos.x,
      y: prevPos.y,
    }));

    setImageScale(newScale);
    redrawCanvas();
  };

  const cropImage = () => {
    if (!image || !cropRect || !ctxRef.current || !canvasRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = cropRect.width;
    canvas.height = cropRect.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      image,
      cropRect.x - imagePos.x,
      cropRect.y - imagePos.y,
      cropRect.width / imageScale,
      cropRect.height / imageScale,
      0,
      0,
      cropRect.width,
      cropRect.height
    );

    const croppedImage = new Image();
    croppedImage.src = canvas.toDataURL();
    croppedImage.onload = () => {
      setImage(croppedImage);
      setImagePos({ x: cropRect.x, y: cropRect.y, width: cropRect.width, height: cropRect.height });
      setImageScale(1);
      redrawCanvas(croppedImage);
    };
  };

  const toggleShapeDropdown = () => {
    setIsShapeDropdownOpen(!isShapeDropdownOpen);
  };

  const selectShape = (newShape: string) => {
    setShape(newShape);
    setIsShapeDropdownOpen(false);
  };

  return (
    <div className="flex flex-col items-center h-full w-full">
      <div className="flex-1 w-full h-full">
        <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} className="border border-gray-300 w-full h-full" />
      </div>
      <div className="flex gap-2 p-2 bg-gray-200 w-full justify-center flex-wrap">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <button onClick={() => setShape("freehand")} className="px-3 py-1 bg-blue-500 text-white rounded">Pen</button>

        <div className="relative">
          <button onClick={toggleShapeDropdown} className="px-3 py-1 bg-blue-500 text-white rounded">Shapes</button>
          {isShapeDropdownOpen && (
            <div className="absolute left-0 bottom-full mb-2 bg-blue-500 border border-gray-300 rounded shadow-md">
              <button onClick={() => selectShape("rectangle")} className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600">Rectangle</button>
              <button onClick={() => selectShape("circle")} className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600">Circle</button>
            </div>
          )}
        </div>

        <button onClick={clearCanvas} className="px-3 py-1 bg-red-500 text-white rounded">Clear</button>
        <button onClick={exportAsImage} className="px-3 py-1 bg-green-500 text-white rounded">Export</button>
        <label htmlFor="fileInput" className="px-3 py-1 bg-yellow-500 text-white rounded cursor-pointer text-sm">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="fileInput" />
        {image && (
          <>
            <button onClick={() => zoomImage(1.1)} className="px-3 py-1 bg-green-500 text-white rounded">Zoom In</button>
            <button onClick={() => zoomImage(0.9)} className="px-3 py-1 bg-red-500 text-white rounded">Zoom Out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Whiteboard;