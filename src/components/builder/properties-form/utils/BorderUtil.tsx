import React from 'react'
import { CanvasType, ElementType } from '../../../../types/types'
import { BuilderContextProps } from '../../../../context/BuilderContext'
import useBuilder from '../../../../hooks/useBuilder'
import { Ellipsis, Minus, Scan, UnfoldHorizontal } from 'lucide-react'
import ColorPickerUtil from './ColorPickerUtil'
import PopoverSelect from '../../../ui/PopoverField'

function BorderUtil({element}:{element : ElementType | CanvasType}) {

    const {props} = element
    const {updateElementProps, activeColorPicker, setActiveColorPicker} = useBuilder() as BuilderContextProps

    function onRoundChange(e:React.ChangeEvent<HTMLInputElement>) {
        updateElementProps({...element, props:{...props, rounded:e.target.value}})
    }

    function onBorderColorChange(color:string) {
      updateElementProps({
      ...element,
      props: { ...props, borderColor: color },
    });
    }

    function onBorderWidthChange(e:React.ChangeEvent<HTMLInputElement>) {
      updateElementProps({
      ...element,
      props: { ...props, borderWidth: e.target.value },
    });
    }

    const borderStylesInfo = [
      {icon: <Minus strokeWidth={1} size={17}  />, label:"Solid", value:"solid"},
      {icon: <UnfoldHorizontal strokeWidth={1} size={17} />, label:"Dashed", value:"Dashed"},
      {icon: <Ellipsis strokeWidth={1} size={17}  />, label:"Dotted", value:"dotted"},
    ]

    function onBorderStyleChange(style:string) {
      updateElementProps({
      ...element,
      props: { ...props, borderStyle: style },
    });
    }

  
      
  return (
    <div className='flex flex-col gap-1'>
      
        <label className="text-[rgb(39,39,39)] text-sm font-medium ">Border</label>
        <div className="flex items-center justify-start gap-1">

          {/* Handle border color */}
          <ColorPickerUtil 
            value={props.borderColor || "#00000"}
            open={activeColorPicker === "border"}
            onToggleVisibility={(open) => setActiveColorPicker(open ? "border":null)}
            onChange={onBorderColorChange}
          />

          {/* handles border radius */}
          <div className='flex items-center justify-center gap-1.5 py-1 px-2 bg-[#F4F4F4] w-fit rounded-sm'>
            <Scan strokeWidth={1} size={17} />
            <input
              type='number'
              placeholder={props.rounded ? props.rounded : "0"}
              className='w-[2rem] overflow-hidden text-sm ring-0 outline-0'
              value={props.rounded}
              max={100}
              onChange={onRoundChange}
            />
          </div>

        </div>

        <div className="flex items-center justify-start gap-1">

          {/* handles border width */}
          <div className='flex items-center justify-center gap-1.5 py-1 px-2 bg-[#F4F4F4] w-fit rounded-sm'>
            <BorderWidthSvg />
            <input
              type='number'
              placeholder={props.borderWidth ? props.borderWidth : "1"}
              className='w-[2rem] overflow-hidden text-xs ring-0 outline-0'
              value={props.borderWidth}
              max={100}
              onChange={onBorderWidthChange}
            />
          </div>

          {/* handles border styles */}

           <PopoverSelect 
            options={borderStylesInfo}
            value={props.borderStyle}
            onChange={onBorderStyleChange}
            fieldStyle={"py-1 px-2 text-xs"}
           />
          </div>

        </div>
  )
}

function BorderWidthSvg() {
  return (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4349 4.875H5.57384C5.19031 4.875 4.87939 5.18591 4.87939 5.56944V10.4306C4.87939 10.8141 5.19031 11.125 5.57384 11.125H10.4349C10.8185 11.125 11.1294 10.8141 11.1294 10.4306V5.56944C11.1294 5.18591 10.8185 4.875 10.4349 4.875Z" stroke="#483D3D" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.3794 2.375H3.62939C2.93904 2.375 2.37939 2.93464 2.37939 3.625V12.375C2.37939 13.0654 2.93904 13.625 3.62939 13.625H12.3794C13.0698 13.625 13.6294 13.0654 13.6294 12.375V3.625C13.6294 2.93464 13.0698 2.375 12.3794 2.375Z" stroke="#483D3D" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  )
}

export default BorderUtil