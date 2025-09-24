import React from 'react'
import { CanvasType, ElementType } from '../../../../types/types';
import useBuilder from '../../../../hooks/useBuilder';
import { BuilderContextProps } from '../../../../context/BuilderContext';
import { AlignCenterHorizontal, AlignCenterVertical, AlignEndHorizontal, AlignEndVertical, AlignStartHorizontal, AlignStartVertical, BetweenVerticalStart } from 'lucide-react';

interface FlexUtilValuesProps {
  icon:React.ReactNode, 
  value:string
}

function FlexUtils({element} : {element:CanvasType | ElementType}) {
    const { props } = element;
    const { updateElementProps } = useBuilder() as BuilderContextProps;

    const alignItems:FlexUtilValuesProps[] = [
      {icon: <AlignStartHorizontal strokeWidth={1.5} /> , value:"start"},
      {icon: <AlignCenterHorizontal strokeWidth={1.5} /> , value:"center"},
      {icon: <AlignEndHorizontal strokeWidth={1.5} /> , value:"end"}
    ]

    const justifyContents:FlexUtilValuesProps[] = [
      {icon: <AlignStartVertical strokeWidth={1.5} /> , value:"start"},
      {icon: <AlignCenterVertical strokeWidth={1.5} /> , value:"center"},
      {icon: <AlignEndVertical strokeWidth={1.5} /> , value:"end"}
    ]
  
    function onAlignChange(value:string) {
      updateElementProps({
        ...element,
        props: { ...props, alignItems: value },
      });
    }
  
    function onJustifyChange(value:string) {
      updateElementProps({
        ...element,
        props: { ...props, justifyContent: value},
      });
    }
  
    function onGapChange(e: React.ChangeEvent<HTMLInputElement>) {
      updateElementProps({...element, props:{...props, gap: e.target.value}});
    }

  return (
    <div className='flex flex-col gap-1'>
        <label className="text-[#272727] text-sm font-medium">Position</label>
        <div className="flex gap-3 items-start justify-center w-fit">
          <div className='flex items-center justify-center gap-0.5 rounded-sm overflow-hidden'>
            {alignItems.map((align:FlexUtilValuesProps,index:number) => (
              <div className={`${align.value === props.alignItems ? "bg-white" : "bg-[#f4f4f4]"} p-[4.5px] w-6 h-6 flex items-center justify-center border border-[#f4f4f4]`} key={index} onClick={() => onAlignChange(align.value)}>
                {align.icon}
              </div>
            ))}
          </div>

          <div className='flex items-center justify-center gap-0.5 rounded-sm overflow-hidden'>
            {justifyContents.map((content:FlexUtilValuesProps, index:number)=> (
              <div className={`${content.value === props.justifyContent ? "bg-white" : "bg-[#f4f4f4]"} p-[4.5px] w-6 h-6 flex items-center justify-center border border-[#f4f4f4]`} key={index} onClick={() => onJustifyChange(content.value)}>
                {content.icon}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-1 items-start justify-center py-1 px-2 bg-[#f4f4f4] rounded-sm w-fit max-w-[5rem]">
          <BetweenVerticalStart strokeWidth={1.5} size={17} />
          <input
            type="number"
            value={props.gap}
            onChange={onGapChange}
            placeholder="0"
            className="w-[2rem] overflow-hidden ring-0 outline-0 text-xs"
          />
        </div>
    </div>
  )
}

export default FlexUtils