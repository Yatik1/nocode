import React from "react";
import useBuilder from "../../../hooks/useBuilder";
import { ElementType } from "../Canvas";

function RowProperties({ element }: { element: ElementType }) {
  const { id, props } = element;
  const { updateElementProps } = useBuilder() as any;

  function onAlignChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateElementProps({
      id,
      props: { ...props, alignItems: e.target.value },
    });
  }

  function onJustifyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateElementProps({
      id,
      props: { ...props, justifyContent: e.target.value },
    });
  }

  function onBgChange(e:React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({
      id, 
      props:{...props, backgroundColor: e.target.value}
    })
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
          placeholder="#FFFFFF"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        />
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

    </div>
  );
}

export default RowProperties;
