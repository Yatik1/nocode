import ColorPicker from 'react-best-gradient-color-picker'
import { ElementType } from '../../../../types/types';
import useBuilder from '../../../../hooks/useBuilder';
import { BuilderContextProps } from '../../../../context/BuilderContext';
import { Minus } from 'lucide-react';
import { rgbaToHex } from './utils';

function TextColorPicker({element}:{element : ElementType}) {

    const {props} = element
    const {updateElementProps, isColorPicker, setIsColorPicker, setIsBgColorPicker} = useBuilder() as BuilderContextProps;

    function handleClick() {
      updateElementProps({...element, props:{...props, color:'#000000'}});
    }

    function onColorChange(color:string) {
        updateElementProps({
          ...element,
          props:{...props, color: rgbaToHex(color)}
        })
    }

  return (
    <div className='flex flex-col gap-1'>
      <label className="text-[#272727] text-sm font-medium relative">Color</label>
      <div className="flex items-center justify-between gap-1 w-[15rem]">
        <div
          className="flex items-center justify-between gap-1.5 py-1 px-2 bg-[#F4F4F4] rounded-[4px]"
          onClick={() => {
            setIsBgColorPicker(false);
            setIsColorPicker((prev) => !prev);
          }}
        >
          <div className={`w-[15px] h-[15px] rounded-[2px]`} style={{ background: props.color }} />
          <p className="text-[#707070] text-sm w-25 truncate capitalize">
            {props.color}
          </p>
        </div>

        <div className="flex items-center justify-center hover:bg-[#f4f4f4] rounded-sm pointer-cursor p-1" onClick={handleClick}>
          <Minus strokeWidth={1.5} size={17} />
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
                className="absolute z-50 left-[-120%] border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden px-[10rem] py-2"
              />
            )}
    </div>
  )
}

export default TextColorPicker