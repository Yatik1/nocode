
function Button(props : {
    text?:string, 
    background?:string, 
    color?:string, 
    rounded?:string,
    width?:string,
    widthUnit:string, 
    height?:string,
    heightUnit:string
}) {
  return (
    <button 
      className="px-4 py-2 cursor-pointer" 
      style={{
        background:props.background?props.background:"white", 
        color:props.color?props.color : "black", 
        borderRadius:props.rounded+"px",
        width:props.width+props.widthUnit,
        height:props.height+props.heightUnit
      }}
    > 
          {props.text ? props.text : "Button"}
    </button>
  )
}

export default Button