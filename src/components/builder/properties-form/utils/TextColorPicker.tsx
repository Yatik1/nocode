import { useState, useRef, useEffect } from 'react'
import ColorPicker from 'react-best-gradient-color-picker'
import { Minus } from 'lucide-react'
import { ElementType } from '../../../../types/types'
import useBuilder from '../../../../hooks/useBuilder'
import { BuilderContextProps } from '../../../../context/BuilderContext'
import { rgbaToHex } from './utils'

function TextColorPicker({
  element,
  propName = "color",
  label = "Text Color"
}: {
  element: ElementType
  propName?: string
  label?: string
}) {
 
  const [openPicker, setOpenPicker] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { props } = element
  const { updateElementProps, setIsBgColorPicker } = useBuilder() as BuilderContextProps

  // Close color picker when clicking outside
   console.log("elementtttt: ", element)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function handleDefaultColor() {
    updateElementProps({
      ...element,
      props: { ...props, [propName]: '#000000' }
    })
  }

  function onColorChangeFromPicker(color: string) {
    updateElementProps({
      ...element,
      props: { ...props, [propName]: rgbaToHex(color) }
    })
  }

  function onColorChangeFromInput(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({
      ...element,
      props: { ...props, [propName]: e.target.value }
    })
  }

  return (
    <div ref={wrapperRef} className="flex flex-col gap-2 relative">
      <label className="text-sm font-semibold relative">{label}</label>

      <div className="flex items-center justify-between gap-2 w-[15rem]">
        <div
          className="flex items-center justify-between gap-1.5 py-1 px-2 bg-[#F4F4F4] rounded-[4px] cursor-pointer"
          onClick={() => {
            setIsBgColorPicker(false)
            setOpenPicker(prev => !prev)
          }}
        >
          <div
            className="w-[15px] h-[15px] rounded-[2px]"
            style={{ background: props[propName] || 'transparent' }}
          />
          <p className="text-[#707070] text-sm w-25 truncate capitalize">
            {props[propName] || 'none'}
          </p>
        </div>

        <div
          className="flex items-center justify-center hover:bg-[#f4f4f4] rounded-sm p-1 cursor-pointer"
          onClick={handleDefaultColor}
        >
          <Minus strokeWidth={1.5} size={17} />
        </div>
      </div>

      <input
        type="text"
        value={props[propName] || ''}
        placeholder="#000000"
        className="border border-gray-300 rounded-md py-2 px-3 text-sm mt-2"
        onChange={onColorChangeFromInput}
      />

      {openPicker && (
        <ColorPicker
          value={props[propName] || ''}
          onChange={onColorChangeFromPicker}
          disableDarkMode={true}
          hideControls={true}
          width={310}
          height={180}
          // className="border border-gray-300 rounded-lg bg-white px-[10rem] py-2"
        />
      )}
    </div>
  )
}

export default TextColorPicker
