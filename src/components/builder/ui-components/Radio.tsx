import useBuilder from '../../../hooks/useBuilder'
import { BuilderContextProps } from '../../../context/BuilderContext'

function Radio(props: {
  label?: string,
  checked?: boolean,
  labelColor?: string,
  circleColor?: string,
  size?: string,
  name?: string,
  id?: string
}) {
  const { updateElementProps } = useBuilder() as BuilderContextProps

  function handleClick(e: React.MouseEvent<HTMLInputElement>) {
    if (!props.name || props.name === props.id) {
      e.preventDefault()
      updateElementProps({
        id: props.id ||'',
        props: { ...props, checked: !props.checked }
      })
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.name && props.name !== props.id) {
      updateElementProps({
        id: props.id || '',
        props: { ...props, checked: true }
      })
    }
  }

  return (
    <label style={{ color: props.labelColor, display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        type="radio"
        checked={!!props.checked}
        name={props.name}
        onClick={handleClick}
        onChange={handleChange}
        style={{
          width: props.size || "18px",
          height: props.size || "18px",
          accentColor: props.circleColor || "#2563eb"
        }}
      />
      {props.label}
    </label>
  )
}

export default Radio