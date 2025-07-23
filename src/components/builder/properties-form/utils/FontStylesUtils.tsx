import React from 'react'
import { CanvasType, ElementType } from '../../../../types/types'
import useBuilder from '../../../../hooks/useBuilder'
import { BuilderContextProps } from '../../../../context/BuilderContext'

function FontStylesUtils({element} : {element : ElementType | CanvasType}) {

    const {props} = element
    const {updateElementProps} = useBuilder() as BuilderContextProps

    function onFontStyleSelect(e:React.ChangeEvent<HTMLSelectElement>) {
        updateElementProps({ ...element, props: { ...props, fontStyle: e.target.value } });
    }
    
    function OnTextDecorate(e:React.ChangeEvent<HTMLSelectElement>) {
        updateElementProps({ ...element, props: { ...props, decoration: e.target.value } });
    }

  return (
    <>
        <label className="text-sm font-semibold">Font style</label>
          <select className='border border-gray-300 rounded-md py-2 px-3 text-sm' name='font-style' onChange={onFontStyleSelect} value={props.fontStyle}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="oblique">Oblique</option>
          </select>

          <label className="text-sm font-semibold">Text Decoration</label>
          <select className='border border-gray-300 rounded-md py-2 px-3 text-sm' name='font-style' onChange={OnTextDecorate} value={props.decoration}>
                <option value="none">None</option>
                <option value="overline">Overline</option>
                <option value="line-through">Line-Through</option>
                <option value="underline">Underline</option>
                <option value="underline overline">Underline Overline</option>
          </select>
    </>
  )
}

export default FontStylesUtils