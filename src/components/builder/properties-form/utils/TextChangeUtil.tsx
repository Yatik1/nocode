import { BuilderContextProps } from "../../../../context/BuilderContext"
import useBuilder from "../../../../hooks/useBuilder"
import { CanvasType, ElementType } from "../../../../types/types"


function TextChangeUtil({element}:{element:CanvasType | ElementType}) {

    const {props} = element
    const {updateElementProps} = useBuilder() as BuilderContextProps

    function onTextChange(e:React.ChangeEvent<HTMLTextAreaElement>) {
        updateElementProps({...element, props:{...props, text:e.target.value}})
    }

  return (
    <>
        <label className="text-sm font-semibold">Text</label>
        <textarea 
            value={props.text}
            onChange={onTextChange}
            placeholder="Text"
            className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        />
    </>
  )
}

export default TextChangeUtil