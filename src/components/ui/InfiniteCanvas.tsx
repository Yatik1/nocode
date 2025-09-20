import React, { useCallback, useEffect, useRef, useState } from "react";
import { Transform } from "../../types/types";
import useBuilder from "../../hooks/useBuilder";
import { BuilderContextProps } from "../../context/BuilderContext";

interface Point {
  x: number;
  y: number;
}

const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const ZOOM_SPEED = 0.05;

function InfiniteCanvas({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const {transform, setTransform} = useBuilder() as BuilderContextProps

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });
  const [transformStart, setTransformStart] = useState<Transform>({ x: 0, y: 0, scale: 1 });

  // Zoom only when Ctrl is held (or a trackpad pinch triggers ctrlKey)
  const handleWheel = useCallback((e: WheelEvent) => {

      if (!e.ctrlKey) return;
      e.preventDefault();

      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const delta = e.deltaY > 0 ? -ZOOM_SPEED : ZOOM_SPEED;
      const newScale = Math.max(
        MIN_SCALE,
        Math.min(MAX_SCALE, transform.scale * (1 + delta))
      );
      if (newScale === transform.scale) return;

      const scaleRatio = newScale / transform.scale;
      const newX = mouseX - (mouseX - transform.x) * scaleRatio;
      const newY = mouseY - (mouseY - transform.y) * scaleRatio;

      setTransform({ x: newX, y: newY, scale: newScale });
    },
    [transform]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setTransformStart({ ...transform });
    },
    [transform]
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      setTransform({
        x: transformStart.x + deltaX,
        y: transformStart.y + deltaY,
        scale: transform.scale,
      });
    },
    [isDragging, dragStart, transformStart, transform.scale]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={canvasRef}
      className="w-full h-screen bg-[#F7F7F7] overflow-hidden flex items-center justify-center"
      onMouseDown={handleMouseDown}
    >
      <section
        className="flex flex-col"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: "0 0",
          transition: "transform 0.05s linear",
        }}
      >
        {children}
      </section>
    </div>
  );
}

export default InfiniteCanvas;
