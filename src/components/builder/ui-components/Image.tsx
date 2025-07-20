

function Image(props : {
    src?:string,
    width?:string, 
    height?:string,
    widthUnit:string, 
    heightUnit:string,
    rounded?:string
}) {
  return (
    props.src ? (
          <img
            src={props.src}
            alt="uploaded image"
            className="object-fit aspect-auto"
            style={{width:props.width+props.widthUnit, height:props.height+props.heightUnit, borderRadius:props.rounded+"px"}}
          />
        ) : (
          <button className='w-fit p-2 rounded-md bg-gray-200 text-gray-400'>
            <p>Add Image</p>
          </button>
        )
  )
}

export default Image