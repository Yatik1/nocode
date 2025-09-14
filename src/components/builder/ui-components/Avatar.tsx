
function Avatar(props: {
    size?: number
    background?: string
    color?: string
    fontSize?: number
    text?:string
    fontStyle?:string
    fontWeight?:string
}) {
  return (
    <div 
        className="flex items-center justify-center rounded-full"
        style={{
            width:props.size+"px",
            height:props.size+"px",
            background:props.background,
            color:props.color,
            fontSize:props.fontSize+"px",
            fontStyle:props.fontStyle,
            fontWeight:props.fontWeight
        }}
    >
        {!props.text?.length ? "A": props.text?.trim().charAt(0).toUpperCase()}
    </div>
  )
}

export default Avatar