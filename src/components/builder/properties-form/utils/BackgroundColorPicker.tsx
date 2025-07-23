import React, { useState } from 'react'
import ColorPicker from 'react-best-gradient-color-picker'
import { CanvasType, ElementType } from '../../../../types/types';
import useBuilder from '../../../../hooks/useBuilder';
import { BuilderContextProps } from '../../../../context/BuilderContext';

function BackgroundColorPicker({element}:{element : ElementType | CanvasType}) {

    const [openBg, setOpenBg] = useState<boolean>(false)

    const {props} = element
    const {updateElementProps} = useBuilder() as BuilderContextProps;

    const opacityPercent = props.opacity ? Math.round(parseFloat(props.opacity) * 100) : 100;

    function onBgChange(color:string) {
        updateElementProps({
          ...element,
          props:{...props, background: color || "none"}
        })
      }
    
      function onOpacityChange(e: React.ChangeEvent<HTMLInputElement>) {
        const percent = parseInt(e.target.value, 10);
        const cssOpacity = percent / 100;
        updateElementProps({ ...element, props: { ...props, opacity: cssOpacity.toString() } });
      }

  return (
    <>
        <label className="text-sm font-semibold relative">Background color</label>
      <div className="flex flex-col gap-2 justify-center items-start relative">
        <div className="flex items-center justify-between gap-2">
        <div className={`w-10 h-10 rounded-md border border-stone-400 cursor-pointer`} style={{background:props.background}} onClick={() => setOpenBg(prev=>!prev)} />
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={opacityPercent}
          onChange={onOpacityChange}
          className={`w-[8rem] appearance-black h-1 bg-white rounded outline-none`}
          style={{
              accentColor: "black",
              width: '8rem',
              height: '4px',
              background: '#e5e7eb',
              borderRadius: '4px'
          }}
        />
                <span className="border border-gray-300 rounded-md p-2 text-sm">{opacityPercent}%</span>

        </div>
      </div>
      
      {openBg && (
        <ColorPicker
          value={props.background}
          onChange={onBgChange}
          disableDarkMode={true}
          className="border-b pb-4 border-gray-200"
        />
      )}
    </>
  )
}

export default BackgroundColorPicker