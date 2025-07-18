import { useState } from 'react'
import ColorPicker from 'react-best-gradient-color-picker'
import { ElementType } from '../../../../types/types';
import useBuilder from '../../../../hooks/useBuilder';
import { BuilderContextProps } from '../../../../context/BuilderContext';

function TextColorPicker({element}:{element : ElementType}) {

    const [openBg, setOpenBg] = useState<boolean>(false)

    const {props} = element
    const {updateElementProps} = useBuilder() as BuilderContextProps;


    function onColorChange(color:string) {
        updateElementProps({
          ...element,
          props:{...props, color: color || "none"}
        })
    }

    function onColorChangeFromInput(e:React.ChangeEvent<HTMLInputElement>) {
      updateElementProps({
        ...element,
        props:{...props, color: e.target.value}
      })
    }
    

  return (
    <>
        <label className="text-sm font-semibold relative">Text color</label>
      <div className="flex flex-col gap-2 justify-center items-start relative">
        <div className="flex items-center justify-between gap-2">
        <div className={`w-10 h-10 rounded-md border border-stone-400 cursor-pointer`} style={{background:props.color}} onClick={() => setOpenBg(prev=>!prev)} />
        <input
          type="text"
          value={props.color}
          placeholder="#000000"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
          onChange={onColorChangeFromInput}
        />

        </div>
      </div>
      
      {openBg && (
        <ColorPicker
          value={props.color}
          onChange={onColorChange}
          disableDarkMode={true}
          className="border-b pb-4 border-gray-200"
          hideControls={true}
        />
      )}
    </>
  )
}

export default TextColorPicker