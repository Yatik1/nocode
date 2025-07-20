import React from 'react'
import { CanvasType, ElementType } from '../../../../types/types';
import useBuilder from '../../../../hooks/useBuilder';
import { BuilderContextProps } from '../../../../context/BuilderContext';

function FlexUtils({element} : {element:CanvasType | ElementType}) {
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
  
    function onGapChange(e: React.ChangeEvent<HTMLInputElement>) {
      updateElementProps({...element, props:{...props, gap: e.target.value}});
    }

  return (
    <>
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
    </>
  )
}

export default FlexUtils