import React from "react";
import useBuilder from "../../../hooks/useBuilder";
import { ElementType } from "../../../types/types";
import { BuilderContextProps } from "../../../context/BuilderContext";
import BackgroundColorPicker from "./utils/BackgroundColorPicker";


function RowProperties({ element }: { element: ElementType }) {
  const { props } = element;
  const { updateElementProps } = useBuilder() as BuilderContextProps;

  function onAlignChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateElementProps({
      ...element,
      props: { ...props, alignItems: e.target.value },
    });
  }

  function onJustifyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateElementProps({
      ...element,
      props: { ...props, justifyContent: e.target.value },
    });
  }

  function onWidthChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({...element, props:{...props, width: e.target.value}});
  }

  function onHeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({...element, props:{...props, height: e.target.value}});
  }

  function onGapChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({...element, props:{...props, gap: e.target.value}});
  }

  function onRoundChange(e:React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({...element, props: {...props, rounded: e.target.value }})
  }

  function onWidthUnitChange(e:React.ChangeEvent<HTMLSelectElement>) {
    updateElementProps({...element, props: {...props, widthUnit: e.target.value }})
  }

  function onHeightUnitChange(e:React.ChangeEvent<HTMLSelectElement>) {
    updateElementProps({...element, props: {...props, heightUnit: e.target.value }})
  }
  


  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">

      <BackgroundColorPicker element={element} />

      <label className="text-sm font-semibold">Border Radius</label>
        <input
          type="number"
          value={props.rounded}
          onChange={onRoundChange}
          placeholder="0"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        />


      <hr className="w-full text-gray-200 mt-2" />

      <label className="text-sm font-semibold">Gap</label>
      <div className="flex gap-2 items-center justify-start">
        <input
          type="number"
          value={props.gap}
          onChange={onGapChange}
          placeholder="0"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        />
        <div className="border border-gray-300 px-[0.6rem] py-[0.5rem] text-sm rounded-md text-gray-400 bg-zinc-200">
          px
        </div>
      </div>

      <label className="text-sm font-semibold">Align items</label>
      <select
        className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        onChange={onAlignChange}
        value={props.alignItems}
      >
        <option value="center">center</option>
        <option value="start">start</option>
        <option value="end">end</option>
      </select>

      <label className="text-sm font-semibold">Justify content</label>
      <select
        className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        onChange={onJustifyChange}
        value={props.justifyContent}
      >
        <option value="center">center</option>
        <option value="start">start</option>
        <option value="end">end</option>
        <option value="space-between">space between</option>
        <option value="space-around">space around</option>
        <option value="space-evenly">space evenly</option>
      </select>

      <hr className="w-full text-gray-200 mt-2" />

      <label className="text-sm font-semibold">Width</label>
      <div className="flex gap-2 items-center justify-start">
        <input
          type="number"
          value={props.width}
          onChange={onWidthChange}
          placeholder="0"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        />
        <select
        className="border border-gray-300 rounded-md px-[0.175rem] py-[0.5rem] text-sm"
        onChange={onWidthUnitChange}
        value={props.widthUnit}
      >
        <option value="px">px</option>
        <option value="rem">rem</option>
        <option value="vw">vw</option>
      </select>

      </div>

      <label className="text-sm font-semibold">Height</label>
      <div className="flex gap-2 items-center justify-start">
        <input
          type="number"
          value={props.height}
          onChange={onHeightChange}
          placeholder="0"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        />
        <select
        className="border border-gray-300 rounded-md px-[0.175rem] py-[0.5rem] text-sm"
        onChange={onHeightUnitChange}
        value={props.heightUnit}
      >
        <option value="px">px</option>
        <option value="rem">rem</option>
        <option value="vw">vw</option>
      </select>
      </div>



    </div>
  );
}

export default RowProperties;
