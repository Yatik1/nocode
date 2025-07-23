
function Button(props : {
    text?:string, 
    background?:string, 
    color?:string, 
    rounded?:string,
    width?:string,
    widthUnit?:string, 
    height?:string,
    heightUnit?:string
}) {

  const {
    widthUnit = "px",
    heightUnit = "px"
  } = props;

  return (
    <button 
      className="px-4 py-2 cursor-pointer" 
      style={{
        background:props.background?props.background:"white", 
        color:props.color?props.color : "black", 
        borderRadius:props.rounded+"px",
        width:props.width+widthUnit,
        height:props.height+heightUnit
      }}
    > 
          {props.text ? props.text : "Button"}
    </button>
  )
}

export default Button