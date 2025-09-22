import { CanvasType, ElementType } from '../../../../types/types';
import useBuilder from '../../../../hooks/useBuilder';
import { BuilderContextProps } from '../../../../context/BuilderContext';
import ColorPickerUtil from './ColorPickerUtil';

function BackgroundColorPicker({ element }: { element: ElementType | CanvasType }) {
  const { props } = element;
  const { updateElementProps, activeColorPicker, setActiveColorPicker } = useBuilder() as BuilderContextProps;


  function onBgChange(color: string) {
    updateElementProps({
      ...element,
      props: { ...props, background: color },
    });
  }
  
  return (
    <div className='flex flex-col gap-1'>
      <label className="text-[#272727] text-sm font-medium relative">Background</label>
      <ColorPickerUtil 
        value={props.background}
        open={activeColorPicker === 'background'}
        onToggleVisibility={(open) => setActiveColorPicker(open ? "background" : null)}
        onChange={onBgChange}
      />
    </div>
  );
}

export default BackgroundColorPicker;