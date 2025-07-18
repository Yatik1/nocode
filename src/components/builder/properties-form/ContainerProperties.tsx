import React from "react";
import useBuilder from "../../../hooks/useBuilder";
import { CanvasType } from "../../../types/types";
import { BuilderContextProps } from "../../../context/BuilderContext";
import BackgroundColorPicker from "./utils/BackgroundColorPicker";



function SectionProperties({ element }: { element: CanvasType }) {
  const { props } = element;
  const { updateElementProps } = useBuilder() as BuilderContextProps;

  function onRoundChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({
      ...element,
      props: { ...props, rounded: e.target.value },
    });
  }

  function onWidthChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({...element, props:{...props, width: e.target.value}});
  }

  function onHeightChange(e: React.ChangeEvent<HTMLInputElement>) {
      updateElementProps({...element, props:{...props, height: e.target.value}});
  }


  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">

      <BackgroundColorPicker element={element} />

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