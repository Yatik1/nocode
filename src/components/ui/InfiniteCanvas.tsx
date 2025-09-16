import React, { useCallback, useEffect, useRef, useState } from "react"

interface Point {
    x:number 
    y:number 
}

interface Transform {
    x:number, 
    y:number,
    scale:number
}

const MIN_SCALE=0.1
const MAX_SCALE=10
const ZOOM_SPEED=0.1

function InfiniteCanvas({children}: {children:React.ReactNode}) {

    const canvasRef = useRef<HTMLDivElement>(null)
    // console.log(canvasRef.current)
    const [transform, setTransform] = useState<Transform>({x:0, y:0, scale:1})

    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState<Point>({x:0, y:0})

    const [transformStart, setTransformStart] = useState<Transform>({x:0,y:0, scale:1})

    // this function supports position based zooming....
    const handleWheel = useCallback((e:WheelEvent) => {
        e.preventDefault();
        if(!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        // console.log({mouseX, mouseY})

        const delta = e.deltaY > 0 ? -ZOOM_SPEED : ZOOM_SPEED
        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, transform.scale*(1+delta)))

        if(newScale === transform.scale) return;

        const scaleRatio = newScale / transform.scale
        const newX = mouseX - (mouseX - transform.x) * scaleRatio;
        const newY = mouseY - (mouseY - transform.y) * scaleRatio;

        setTransform({
            x: newX,
            y: newY,
            scale: newScale
          });
    } , [transform, MIN_SCALE, MAX_SCALE, ZOOM_SPEED]
    )

    const handleMouseDown = useCallback((e:React.MouseEvent) => {
        if(e.button !== 0) return;

        // console.log("Mouse down")
        setIsDragging(true)
        setDragStart({x:e.clientX, y:e.clientY})
        console.log({...transform});
        
        setTransformStart({...transform})
    } , [transform] )

    const handleMouseMove = useCallback((e:MouseEvent) => {
        if(!isDragging) return;

        const deltaX = e.clientX - dragStart.x
        const deltaY = e.clientY - dragStart.y

        setTransform({
            x: transformStart.x + deltaX,
            y: transformStart.y + deltaY,
            scale: transform.scale 
        })
    },[isDragging, dragStart, transformStart, transform.scale]) 

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    },[])

    useEffect(() => {
        const canvas = canvasRef.current
        if(!canvas) return;

        canvas.addEventListener("wheel", handleWheel, {passive:false})

        return () => canvas.removeEventListener('wheel', handleWheel)
    },[handleWheel])

    useEffect(() => {
        if(isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        } 

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    },[isDragging, handleMouseMove, handleMouseUp])


    return (
        <div 
            ref={canvasRef}  
            className="w-full h-screen bg-[#F7F7F7] overflow-hidden" 
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
    )
}

export default InfiniteCanvas
