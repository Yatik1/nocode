import useBuilder from '../../../hooks/useBuilder'
import { BuilderContextProps } from '../../../context/BuilderContext'

function Checkbox(props: {
  label?: string,
  checked?: boolean,
  labelColor?: string,
  boxColor?: string,
  size?: string,
  id?: string
}) {
  const { updateElementProps } = useBuilder() as BuilderContextProps

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({
      id: props.id || "",
      props: { ...props, checked: e.target.checked }
    })
  }

  return (
    <label style={{ color: props.labelColor, display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        type="checkbox"
        checked={!!props.checked}
        onChange={handleChange}
        style={{
          width: props.size || "18px",
          height: props.size || "18px",
          accentColor: props.boxColor || "#2563eb"
        }}
      />
      {props.label}
    </label>
  )
}

export default Checkbox