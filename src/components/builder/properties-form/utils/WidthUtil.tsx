import { BuilderContextProps } from '../../../../context/BuilderContext';
import useBuilder from '../../../../hooks/useBuilder';
import { CanvasType, ElementType } from '../../../../types/types'

function WidthUtil({element} : {element:CanvasType | ElementType}) {
    
    const { props } = element;
  const { updateElementProps } = useBuilder() as BuilderContextProps;


  function onWidthChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({...element, props:{...props, width: e.target.value}});
  }

  return (
    <>
        <div className="flex flex-col gap-1 items-start justify-center">
          <label className="text-sm font-semibold">Width</label>
          <div className="flex gap-1 w-fit">
            <input
              type="number"
              min={10}
              value={props.width}
              onChange={onWidthChange}
              placeholder="100"
              className="border border-gray-300 rounded-md py-2 px-3 text-sm w-[4.5rem]"
            />
            {("widthUnit" in props) ? (
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
            ) : (
                <div className="border border-gray-300 px-[0.6rem] py-[0.5rem] text-sm rounded-md text-gray-400 bg-zinc-200">px</div>
            )}
          </div>
        </div>

        
      </>
  )
}

export default WidthUtil