import React from "react";
import useBuilder from "../../../hooks/useBuilder";
import { ElementType } from "../../../types/types";
import { BuilderContextProps } from "../../../context/BuilderContext";


function SectionProperties({ element }: { element: ElementType }) {
  const { props } = element;
  const { updateElementProps } = useBuilder() as BuilderContextProps;

  function onDirectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateElementProps({
      ...element,
      props: { ...props, direction: e.target.value },
    });
  }

  function onBgChange(e:React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({
      ...element,
      props:{...props, backgroundColor: e.target.value}
    })
  }

  function onWidthChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({...element, props:{...props, width: e.target.value}});
  }

  function onHeightChange(e: React.ChangeEvent<HTMLInputElement>) {
      updateElementProps({...element, props:{...props, height: e.target.value}});
  }


  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">

      <label className="text-sm font-semibold">Background color</label>
      <div className="flex gap-2 justify-start items-center">
        <div className={`w-5 h-5 rounded-md border border-stone-400`} style={{backgroundColor:props.backgroundColor}} />
        <input
          type="text"
          value={props.bgColor === "none" ? "" : props.bgColor}
          onChange={onBgChange}
          placeholder={props.background || "#FFFFFF"}
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        />
      </div>

      <label className="text-sm font-semibold">Direction</label>
      <select
        className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        onChange={onDirectionChange}
        value={props.direction}
      >
        <option value="row">row</option>
        <option value="column">column</option>
        <option value="row-reverse">reverse row</option>
        <option value="column-reverse">reverse column</option>
      </select>

      <label className="text-sm font-semibold">Image width</label>
      <div className="flex gap-2 items-center justify-start">
        <input
          type="number"
          min={10}
          value={props.width}
          onChange={onWidthChange}
          placeholder="100"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm w-[7rem]"
        />
        <div className="border border-gray-300 px-[0.6rem] py-[0.5rem] text-sm rounded-md text-gray-400 bg-zinc-200">
          px
        </div>
      </div>

      <label className="text-sm font-semibold">Image height</label>
      <div className="flex gap-2 items-center justify-start">
        <input
          type="number"
          min={10}
          value={props.height}
          onChange={onHeightChange}
          placeholder="100"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm w-[7rem]"
        />
        <div className="border border-gray-300 px-[0.6rem] py-[0.5rem] text-sm rounded-md text-gray-400 bg-zinc-200">
          px
        </div>
      </div>

    </div>
  );
}

export default SectionProperties;