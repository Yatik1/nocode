import useBuilder from "../../../hooks/useBuilder"
import { ElementType } from "../Canvas";


function ButtonProperties({element} : {element:ElementType}) {
    const {updateElementProps} = useBuilder() as any
    const {id, props} = element

    function onTextChange(e:React.ChangeEvent<HTMLInputElement>) {
        updateElementProps({id, props:{...props, text:e.target.value}})
    }

    function onColorChange(e: React.ChangeEvent<HTMLInputElement>) {
        updateElementProps({id, props:{...props, color: e.target.value}});
    }

    function onBtnColor(e: React.ChangeEvent<HTMLInputElement>) {
        updateElementProps({id, props:{...props, bgColor: e.target.value}});
    }

    function onRoundChange(e:React.ChangeEvent<HTMLInputElement>) {
      updateElementProps({id, props:{...props, rounded:e.target.value}})
    }

  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">

        <label className="text-sm font-semibold">Button Text</label>
        <input 
            type="text"
            value={props.text}
            onChange={onTextChange}
            placeholder="Text"
            className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        />

        <label className="text-sm font-semibold">Text Color</label>
        <div className="flex gap-2 justify-start items-center">
              <div className="w-4 h-4 rounded-md border border-stone-400" style={{background:props.color}} />
              <input
                type="text"
                onChange={onColorChange}
                placeholder={props.color}
                className="border border-gray-300 rounded-md py-2 px-3 text-sm"
              />
          </div>

        <label className="text-sm font-semibold">Button color</label>   
        <div className="flex gap-2 justify-start items-center">
              <div className="w-4 h-4 rounded-md border border-stone-400" style={{background:props.bgColor?props.bgColor:"black"}} />
              <input
                type="text"
                onChange={onBtnColor}
                placeholder={props.bgColor?props.bgColor:"black"}
                className="border border-gray-300 rounded-md py-2 px-3 text-sm"
              />
        </div>

        <label className="text-sm font-semibold">Border rounded</label>
        <div className="flex gap-2 items-center justify-start">
          <input 
            type="number"
            min={0}
            max={25}
            value={props.rounded}
            onChange={onRoundChange}
            placeholder="0"
            className="border border-gray-300 rounded-md py-2 px-3 text-sm w-[4rem]"
          />
          <div className="border border-gray-300 px-[0.6rem] py-[0.5rem] text-sm rounded-md text-gray-400 bg-zinc-200">px</div>
        </div>

    </div>
  )
}

export default ButtonProperties