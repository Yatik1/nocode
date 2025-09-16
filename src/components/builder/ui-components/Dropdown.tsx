import useBuilder from '../../../hooks/useBuilder'
import { BuilderContextProps } from '../../../context/BuilderContext'

function Dropdown(props: {
  label?: string,
  options?: string,
  value?: string,
  labelColor?: string,
  optionColor?: string,
  background?: string,
  width?: string,
  widthUnit?: string,
  rounded?: string,
  id?: string
}) {
  const { updateElementProps } = useBuilder() as BuilderContextProps

  const optionsArr = (props.options || "").split(",").map(opt => opt.trim())

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateElementProps({
      id: props.id || '',
      props: { ...props, value: e.target.value }
    })
  }

  return (
    <div style={{ width: `${props.width}${props.widthUnit || "px"}` }}>
      {props.label && <label style={{ color: props.labelColor }}>{props.label}</label>}
      <select
        value={props.value}
        onChange={handleChange}
        style={{
          width: "100%",
          color: props.optionColor,
          background: props.background,
          borderRadius: props.rounded ? `${props.rounded}px` : "4px",
          padding: "8px",
          border: "1px solid #ccc",
          marginTop: "4px"
        }}
      >
        {optionsArr.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown