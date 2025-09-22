import { ElementType } from '../../../../types/types';
import useBuilder from '../../../../hooks/useBuilder';
import { BuilderContextProps } from '../../../../context/BuilderContext';
import { rgbaToHex } from './utils';
import ColorPickerUtil from './ColorPickerUtil';

function TextColorPicker({element}:{element : ElementType}) {

    const {props} = element
    const {updateElementProps, activeColorPicker, setActiveColorPicker} = useBuilder() as BuilderContextProps;

    // function handleClick() {
    //   updateElementProps({...element, props:{...props, color:'#000000'}});
    // }

    function onColorChange(color:string) {
        updateElementProps({
          ...element,
          props:{...props, color: rgbaToHex(color)}
        })
    }

  return (
    <div className='flex flex-col gap-1'>
      <label className="text-[#272727] text-sm font-medium relative">Color</label>
      <ColorPickerUtil 
        value={props.color || "#000000"}
        open={activeColorPicker === 'text'}
        onToggleVisibility={(open) => setActiveColorPicker(open ? "text" : null)}
        onChange={onColorChange}
        type="text"
      />
    </div>
  )
}

export default TextColorPicker