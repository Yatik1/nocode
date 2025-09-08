import ColorPicker from 'react-best-gradient-color-picker'
import { ElementType } from '../../../../types/types';
import useBuilder from '../../../../hooks/useBuilder';
import { BuilderContextProps } from '../../../../context/BuilderContext';

function TextColorPicker({element}:{element : ElementType}) {

    const {props} = element
    const {updateElementProps, isColorPicker, setIsColorPicker, setIsBgColorPicker} = useBuilder() as BuilderContextProps;


    function onColorChange(color:string) {
        updateElementProps({
          ...element,
          props:{...props, color: color}
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
        <div className={`w-7 h-7 rounded-full border border-stone-400 cursor-pointer`} style={{background:props.color}} onClick={() => {setIsBgColorPicker(false);setIsColorPicker(prev=>!prev)}} />
        <input
          type="text"
          value={props.color}
          placeholder="#000000"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
          onChange={onColorChangeFromInput}
        />

        </div>
      </div>
      
      {isColorPicker && (
              <ColorPicker
                value={props.color}
                onChange={onColorChange}
                disableDarkMode={true}
                hideControls={true}
                width={310}
                height={180}
                className="absolute right-[19vw] border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden px-[10rem] py-2"
              />
            )}
    </>
  )
}

export default TextColorPicker