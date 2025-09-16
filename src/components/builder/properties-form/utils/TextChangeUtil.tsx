import { ElementType } from '../../../../types/types'
import useBuilder from '../../../../hooks/useBuilder'
import { BuilderContextProps } from '../../../../context/BuilderContext'

function TextChangeUtil({
  element,
  propName = "text",
  label = "Text"
}: {
  element: ElementType,
  propName?: string,
  label?: string
}) {
  const { props } = element
  const { updateElementProps } = useBuilder() as BuilderContextProps

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({ ...element, props: { ...props, [propName]: e.target.value } })
  }

  return (
    <div className='flex flex-col gap-1'>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type="text"
        value={props[propName] || ""}
        onChange={onChange}
        placeholder={label}
        className="border border-gray-300 rounded-md py-2 px-3 text-sm"
      />
    </div>
  )
}

export default TextChangeUtil