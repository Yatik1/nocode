import React from 'react'
import useBuilder from '../../../hooks/useBuilder';
import { ElementType } from '../../../types/types';
import { BuilderContextProps } from '../../../context/BuilderContext';

function HeadingProperties({ element }: { element: ElementType }) {
  const { props } = element;
  const { updateElementProps } = useBuilder() as BuilderContextProps;

  function onChangeLevel(level: string) {
    updateElementProps({ ...element, props: { ...props, level } });
  }

  function onColorInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({ ...element, props: { ...props, color: e.target.value } });
  }

  function onHeadingChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({ ...element, props: { ...props, text: e.target.value } });
  }

  function onBgChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({ ...element, props: { ...props, bgColor: e.target.value || "none" } });
  }

  const headingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];

  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">
      <label className="text-sm font-semibold">Heading</label>
      <input
        type="text"
        value={props.text}
        onChange={onHeadingChange}
        placeholder="Heading"
        className="border border-gray-300 rounded-md py-2 px-3 text-sm"
      />

      <label className="text-sm font-semibold">Levels</label>
      <div className="flex items-center justify-between px-2">
        {headingLevels.map((level) => (
          <div
            key={level}
            className={`flex items-center justify-center border border-stone-300 p-3 rounded-md w-7 h-7 cursor-pointer ${
              props.level === level ? "bg-gray-200" : "bg-white text-gray-500"
            }`}
            onClick={() => onChangeLevel(level)}
          >
            <p className="text-sm">{level}</p>
          </div>
        ))}
      </div>

      <label className="text-sm font-semibold">Text Color</label>
      <div className="flex gap-2 justify-start items-center">
        <div className="w-4 h-4 rounded-md" style={{ backgroundColor: props.color || "black" }} />
        <input
          type="text"
          value={props.color}
          onChange={onColorInputChange}
          placeholder="#000000"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        />
      </div>

      <label className="text-sm font-semibold">Background Color</label>
      <div className="flex gap-2 justify-start items-center">
        <div className="w-4 h-4 rounded-md" style={{ backgroundColor: props.bgColor }} />
        <input
          type="text"
          value={props.bgColor === "none" ? "" : props.bgColor}
          onChange={onBgChange}
          placeholder="#FFFFFF"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        />
      </div>
    </div>
  );
}

export default HeadingProperties;
