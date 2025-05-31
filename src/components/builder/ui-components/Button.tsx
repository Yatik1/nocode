
function Button(props : {
    text?:string, 
    bgColor?:string, 
    color?:string, 
    rounded?:string
}) {
  return (
    <button className="px-4 py-2 cursor-pointer" style={{background:props.bgColor?props.bgColor:"white", color:props.color?props.color : "black", borderRadius:props.rounded+"px"}}> 
          {props.text ? props.text : "Button"}
    </button>
  )
}

export default Button