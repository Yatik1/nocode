import ColorPicker from 'react-best-gradient-color-picker';
import { CanvasType, ElementType } from '../../../../types/types';
import useBuilder from '../../../../hooks/useBuilder';
import { BuilderContextProps } from '../../../../context/BuilderContext';
import { Ban, Eye, EyeClosed } from 'lucide-react';
import { rgbaToHex } from './utils';

function BackgroundColorPicker({ element }: { element: ElementType | CanvasType }) {
  const { props } = element;
  const { updateElementProps, isBgColorPicker, setIsBgColorPicker, setIsColorPicker } = useBuilder() as BuilderContextProps;

  function handleClick() {
    if(props.background !== 'none') {
      updateElementProps({...element, props:{...props, background:'none'}});
    } else {
      updateElementProps({...element, props:{...props, background:'#FFFFFF'}});
    }
  }

  function onBgChange(color: string) {
    updateElementProps({
      ...element,
      props: { ...props, background: color },
    });
  }
  
  return (
    <div className='flex flex-col gap-1'>
      <label className="text-[#272727] text-sm font-medium relative">Background</label>
      <div className="flex items-center justify-between gap-1 w-[15rem]">
        <div
          className="flex items-center justify-between gap-1.5 py-1 px-2 bg-[#F4F4F4] rounded-[4px]"
          onClick={() => {
            setIsColorPicker(false);
            setIsBgColorPicker((prev) => !prev);
          }}
        >
          {props.background === 'none' ? <Ban strokeWidth={1.5} size={15} /> : <div className={`w-[15px] h-[15px] rounded-[2px]`} style={{ background: props.background }} />}
          <p className="text-[#707070] text-sm w-25 truncate capitalize">
            {props.background?.startsWith('linear') ? 'Linear' : rgbaToHex(props.background)}
          </p>
        </div>

        <div className="flex items-center justify-center hover:bg-[#f4f4f4] rounded-sm pointer-cursor p-1" onClick={handleClick}>
          {props.background === 'none' ? <EyeClosed strokeWidth={1.5} size={17} /> : <Eye strokeWidth={1.5} size={17} />}
        </div>
      </div>

      {isBgColorPicker && (
        <ColorPicker
          value={props.background}
          showHexAlpha={false}
          onChange={onBgChange}
          disableDarkMode={true}
          width={310}
          height={180}
          className="absolute z-50 left-[-120%] border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden px-[10rem] py-2"
        />
      )}
    </div>
  );
}

export default BackgroundColorPicker;