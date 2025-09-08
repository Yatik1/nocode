import React from 'react'
import ColorPicker from 'react-best-gradient-color-picker'
import { CanvasType, ElementType } from '../../../../types/types';
import useBuilder from '../../../../hooks/useBuilder';
import { BuilderContextProps } from '../../../../context/BuilderContext';

function BackgroundColorPicker({element}:{element : ElementType | CanvasType}) {


    const {props} = element
    const {updateElementProps, isBgColorPicker, setIsBgColorPicker,setIsColorPicker} = useBuilder() as BuilderContextProps;


    function onBgChange(color:string) {
        updateElementProps({
          ...element,
          props:{...props, background: color || "none"}
        })
      }

      function onBgColorChangeFromInput(e:React.ChangeEvent<HTMLInputElement>) {
      updateElementProps({
        ...element,
        props:{...props, background: e.target.value}
      })
    }

  return (
    <>
        <label className="text-sm font-semibold relative">Background color</label>
      <div className="flex flex-col gap-2 justify-center items-start relative">
        <div className="flex items-center justify-between gap-2">
        <div className={`w-7 h-7 rounded-full border border-stone-400 cursor-pointer`} style={{background:props.background}} onClick={() => {setIsColorPicker(false);setIsBgColorPicker(prev=>!prev)}} />
         <input
          type="text"
          value={props.background}
          placeholder="#000000"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
          onChange={onBgColorChangeFromInput}
        />

        </div>
      </div>
      
      {isBgColorPicker && (
        <ColorPicker
          value={props.background}
          onChange={onBgChange}
          disableDarkMode={true}
          width={310}
          height={180}
          className="absolute right-[19vw] border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden px-[10rem] py-2"
        />
      )}
      
      
    </>
  )
}

export default BackgroundColorPicker