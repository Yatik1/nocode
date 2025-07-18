import React from 'react'
import useBuilder from '../../../hooks/useBuilder'
import { ElementType } from '../../../types/types'
import { BuilderContextProps } from '../../../context/BuilderContext'
import BackgroundColorPicker from './utils/BackgroundColorPicker'
import TextColorPicker from './utils/TextColorPicker'


function TextProperties({element}:{element:ElementType}) {

  const {updateElementProps} = useBuilder() as BuilderContextProps
  const {props} = element

  function onContentChange(e:React.ChangeEvent<HTMLTextAreaElement>) {
    updateElementProps({ ...element, props: { ...props, content: e.target.value } });
  }

  function onFontStyleSelect(e:React.ChangeEvent<HTMLSelectElement>) {
    updateElementProps({ ...element, props: { ...props, fontStyle: e.target.value } });
  }

  function OnTextDecorate(e:React.ChangeEvent<HTMLSelectElement>) {
    updateElementProps({ ...element, props: { ...props, decoration: e.target.value } });
  }
  
  return (
    <div className='flex flex-1 flex-col gap-[0.56rem]'>
        <label className='text-sm font-semibold'>Content</label>
        <textarea
            value={props.content}
            onChange={onContentChange}
            placeholder="Add your text here"
            className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        />
        
          <BackgroundColorPicker element={element} />
          
          <TextColorPicker element={element} />

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

    </div>
  )
}

export default TextProperties