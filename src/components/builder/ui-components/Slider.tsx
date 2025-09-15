import useBuilder from '../../../hooks/useBuilder'
import { BuilderContextProps } from '../../../context/BuilderContext'

function Slider(props: {
  label?: string,
  min?: number,
  max?: number,
  step?: number,
  value?: number,
  labelColor?: string,
  trackColor?: string,
  thumbColor?: string,
  width?: string,
  widthUnit?: string,
  id?: string
}) {
  const { updateElementProps } = useBuilder() as BuilderContextProps

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({
      id: props.id || '',
      props: { ...props, value: Number(e.target.value) }
    })
  }

  return (
    <div style={{ width: `${props.width}${props.widthUnit || "px"}` }}>
      {props.label && <label style={{ color: props.labelColor }}>{props.label}</label>}
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={handleChange}
        style={{
          width: "100%",
          accentColor: props.trackColor || "#2563eb",
          marginTop: "4px"
        }}
      />
      <div style={{ color: props.labelColor, marginTop: "4px" }}>{props.value}</div>
    </div>
  )
}

export default Slider