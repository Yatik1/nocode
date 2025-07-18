import { BuilderContextProps } from "../../../context/BuilderContext";
import useBuilder from "../../../hooks/useBuilder"
import { ElementType } from "../../../types/types";
import BackgroundColorPicker from "./utils/BackgroundColorPicker";
import TextColorPicker from "./utils/TextColorPicker";



function ButtonProperties({element} : {element:ElementType}) {
    const {updateElementProps} = useBuilder() as BuilderContextProps
    const {props} = element

    function onTextChange(e:React.ChangeEvent<HTMLInputElement>) {
        updateElementProps({...element, props:{...props, text:e.target.value}})
    }

    function onRoundChange(e:React.ChangeEvent<HTMLInputElement>) {
      updateElementProps({...element, props:{...props, rounded:e.target.value}})
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

        <BackgroundColorPicker element={element} />
        <TextColorPicker element={element} />

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