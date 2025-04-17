import React from "react";
import useBuilder from "../../../hooks/useBuilder";
import PropertyRenderer from "../PropertyRenderer";
import { ElementType } from "../Canvas"; // adjust import if needed

function RowProperties({ element }: { element: ElementType }) {
  const { id, props } = element;
  const { selectedElement,updateElementProps } = useBuilder() as any;

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

  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">
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

      {props.children?.length > 0 && (
        <>
          <hr className="text-gray-200 my-2" />
          {props.children.map((childEl: ElementType) => {
            return (
                (
                    <div key={childEl.id}>
                      <PropertyRenderer element={childEl} />
                    </div>
                  )
            )
          })}
        </>
      )}
    </div>
  );
}

export default RowProperties;
