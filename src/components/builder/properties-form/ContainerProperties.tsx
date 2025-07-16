import React, { useState } from "react";
import useBuilder from "../../../hooks/useBuilder";
import { ElementType } from "../../../types/types";
import { BuilderContextProps } from "../../../context/BuilderContext";
import ColorPicker from 'react-best-gradient-color-picker'



function SectionProperties({ element }: { element: ElementType }) {
  const { props } = element;
  const { updateElementProps } = useBuilder() as BuilderContextProps;

  const [openBg, setOpenBg] = useState<boolean>(false)
  const opacityPercent = props.opacity ? Math.round(parseFloat(props.opacity) * 100) : 100;


  function onRoundChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({
      ...element,
      props: { ...props, rounded: e.target.value },
    });
  }

  function onBgChange(color:string) {
    updateElementProps({
      ...element,
      props:{...props, backgroundColor: color}
    })
  }

  function onOpacityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const percent = parseInt(e.target.value, 10);
    const cssOpacity = percent / 100;
    updateElementProps({ ...element, props: { ...props, opacity: cssOpacity.toString() } });
  }

  function onWidthChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({...element, props:{...props, width: e.target.value}});
  }

  function onHeightChange(e: React.ChangeEvent<HTMLInputElement>) {
      updateElementProps({...element, props:{...props, height: e.target.value}});
  }


  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">

      <label className="text-sm font-semibold relative">Background color</label>
      <div className="flex flex-col gap-2 justify-center items-start relative">
        <div className="flex items-center justify-between gap-2">
        <div className={`w-10 h-10 rounded-md border border-stone-400 cursor-pointer`} style={{background:props.backgroundColor}} onClick={() => setOpenBg(prev=>!prev)} />
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={opacityPercent}
          onChange={onOpacityChange}
          className={`w-[8rem] appearance-${props.backgroundColor ? props.backgroundColor : "black"} h-1 bg-white rounded outline-none`}
          style={{
              accentColor: props.backgroundColor || "black",
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
          value={props.backgroundColor}
          onChange={onBgChange}
          disableDarkMode={true}
          className="border-b pb-4 border-gray-200"
        />
      )}


      <label className="text-sm font-semibold">Rounded</label>
      <input
        type="number"
        min={0}
        className="border border-gray-300 rounded-md py-2 px-3 text-sm w-[4rem]"
        onChange={onRoundChange}
        value={props.rounded}
        placeholder={props.rounded || "0"}
      />
        

      <div className="flex gap-2">
        <div className="flex flex-col gap-1 items-start justify-center">
          <label className="text-sm font-semibold">Width</label>
          <div className="flex gap-1">
            <input
              type="number"
              min={10}
              value={props.width}
              onChange={onWidthChange}
              placeholder="100"
              className="border border-gray-300 rounded-md py-2 px-3 text-sm w-[4rem]"
            />
            <select
              className="border border-gray-300 rounded-md px-[0.1rem] py-[0.5rem] text-sm"
              onChange={(e:React.ChangeEvent<HTMLSelectElement>) => updateElementProps({...element, props: {...props, widthUnit: e.target.value }})}
              value={props.widthUnit}
            >
              <option value="px">px</option>
              <option value="rem">rem</option>
              <option value="vw">vw</option>
              <option value="vh">vh</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-start justify-center">
          <label className="text-sm font-semibold">Height</label>
          <div className="flex gap-1">
            <input
              type="number"
              min={10}
              value={props.height}
              onChange={onHeightChange}
              placeholder="100"
              className="border border-gray-300 rounded-md py-2 px-3 text-sm w-[4rem]"
            />
            <select
              className="border border-gray-300 rounded-md px-[0.1rem] py-[0.5rem] text-sm"
              onChange={(e:React.ChangeEvent<HTMLSelectElement>) => updateElementProps({...element, props: {...props, heightUnit: e.target.value }})}
              value={props.heightUnit}
            >
              <option value="px">px</option>
              <option value="rem">rem</option>
              <option value="vh">vh</option>
              <option value="vw">vw</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
}


export default SectionProperties;