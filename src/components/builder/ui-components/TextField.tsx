import useBuilder from '../../../hooks/useBuilder'
import { BuilderContextProps } from '../../../context/BuilderContext'

function TextField(props: {
  label?: string,
  placeholder?: string,
  value?: string,
  width?: string,
  widthUnit?: string,
  labelColor?: string,
  valueColor?: string,
  placeholderColor?: string,
  background?: string,
  borderColor?: string, 
  borderWidth?: string, 
  rounded?: string,
  id?: string
}) {
  const { updateElementProps } = useBuilder() as BuilderContextProps

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({
      id: props.id || "",
      props: { ...props, value: e.target.value }
    })
  }

  return (
    <div style={{ width: `${props.width}${props.widthUnit || "px"}` }}>
      {props.label && <label style={{ color: props.labelColor }}>{props.label}</label>}
      <input
        type="text"
        value={props.value || ""}
        placeholder={props.placeholder}
        style={{
          width: "100%",
          color: props.valueColor,
          background: props.background,
          borderRadius: props.rounded ? `${props.rounded}px` : "4px",
          padding: "8px",
          border: `${props.borderWidth || "1"}px solid ${props.borderColor || "#ccc"}`,
          marginTop: "4px"
        }}
        onChange={handleChange}
        className="textfield-placeholder"
      />
      <style>
        {`
          .textfield-placeholder::placeholder {
            color: ${props.placeholderColor || "#888888"};
            opacity: 1;
          }
        `}
      </style>
    </div>
  )
}

export default TextField