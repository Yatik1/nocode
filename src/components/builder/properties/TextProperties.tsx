import React from 'react'
import useBuilder from '../../../hooks/useBuilder'
import { ElementType } from '../Canvas'

function TextProperties({element}:{element:ElementType}) {

  const {updateElementProps} = useBuilder() as any
  const {id,props} = element

  function onContentChange(e:React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({id, props:{...props, content:e.target.value}})
  }

  function onBgChange(e:React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({id, props:{...props, bgColor:e.target.value}})
  }

  function onTextColorChange(e:React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({ id, props: { ...props, color: e.target.value } });
  }

  function onFontStyleSelect(e:React.ChangeEvent<HTMLSelectElement>) {
    updateElementProps({id, props:{...props, fontStyle:e.target.value}})
  }

  function OnTextDecorate(e:React.ChangeEvent<HTMLSelectElement>) {
    updateElementProps({id, props:{...props, decoration:e.target.value}})
  }
  
  return (
    <div className='flex flex-1 flex-col gap-[0.56rem]'>
        <label className='text-sm font-semibold'>Content</label>
        <input 
            type="text"
            value={props.content || ""}
            onChange={onContentChange}
            placeholder="Add your text here"
            className="border border-gray-300 rounded-md py-2 px-3 text-sm"
        />

        <label className="text-sm font-semibold">Text Color</label>
          <div className="flex gap-2 justify-start items-center">
              <div className="w-4 h-4 rounded-md" style={{backgroundColor:props.color?props.color : "black"}} />
              <input
                type="text"
                value={props.color}
                onChange={onTextColorChange}
                placeholder="#000000"
                className="border border-gray-300 rounded-md py-2 px-3 text-sm"
              />
          </div>   
        
          <label className="text-sm font-semibold">Background Color</label>
          <div className="flex gap-2 justify-start items-center">
              <div className={`w-4 h-4 rounded-md`} style={{backgroundColor:props.bgColor}} />
              <input
                type="text"
                value={props.bgColor === "none" ? "" : props.bgColor}
                onChange={onBgChange}
                placeholder="#FFFFFF"
                className="border border-gray-300 rounded-md py-2 px-3 text-sm"
              />
          </div>

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