import { BuilderContextProps } from '../../../../context/BuilderContext';
import useBuilder from '../../../../hooks/useBuilder';
import { CanvasType, ElementType } from '../../../../types/types'
import PopoverSelect from '../../../ui/PopoverField';

function LayoutUtil({element} : {element:CanvasType | ElementType}) {
    
    const { props } = element;
  const { updateElementProps } = useBuilder() as BuilderContextProps;



  function onWidthChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({...element, props:{...props, width: e.target.value}});
  }

  function onHeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({...element, props:{...props, height: e.target.value}});
  }

  function onWidthUnitChange(value:string) {
        updateElementProps({
          ...element,
          props: { ...props, widthUnit: value },
        });
  }

  function onHeightUnitChange(value:string) {
        updateElementProps({
          ...element,
          props: { ...props, heightUnit: value },
        });
  }

  const units= [
    {value:"px", label:"px"},
    {value:"rem", label:"rem"},
    {value:"vw", label:"vw"},
    {value:"vh", label:"vh"},

  ]

  const keys= Object.keys(props)

  return (
        <div className="flex flex-col gap-1 items-start justify-center">
          <label className="text-[#272727] text-sm font-medium">Layout</label>
          <div className="flex items-center justify-center gap-1">
              <div className="flex items-center justify-center gap-0.5">
              {keys.includes("width") && (
                <div className="flex items-center justify-center gap-1.5 bg-[#F4F4F4] rounded-sm text-xs py-1 px-2">
              <span className='font-semibold text-[#949494] text-xs'>W</span>
              <input 
                type='number'
                min={10}
                value={props.width}
                onChange={onWidthChange}
                placeholder='Width..'
                className='w-[2rem] overflow-hidden ring-0 outline-0'
              />
              </div>
              )}

              {keys.includes("widthUnit")  && (
                <PopoverSelect
                  options={units}
                  value={props.widthUnit}
                  onChange={onWidthUnitChange}
                  fieldStyle='py-1 px-2 text-xs w-[3.6rem]'
              />
              )}
              </div>

              <div className="flex items-center justify-center gap-0.5">
                {keys.includes("height")  && (
                  <div className="flex items-center justify-center gap-1.5 bg-[#F4F4F4] rounded-sm text-xs  py-1 px-2">
                <span className='font-semibold text-[#949494]'>H</span>
                <input 
                  type='number'
                  min={10}
                  value={props.height}
                  onChange={onHeightChange}
                  placeholder='Height'
                  className='w-[2rem] overflow-hidden text-xs ring-0 outline-0'
                />
                </div>
                )}

                {keys.includes("heightUnit")  && (
                  <PopoverSelect
                    options={units}
                    value={props.heightUnit}
                    onChange={onHeightUnitChange}
                    fieldStyle='py-1 px-2 text-xs w-[3.6rem]'
                />
                )}
              </div>
          </div>
        </div>       
  )
}

export default LayoutUtil