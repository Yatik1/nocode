

function Image(props : {
    src?:string,
    width?:string, 
    height?:string
}) {
  return (
    props.src ? (
          <img
            src={props.src}
            alt="uploaded image"
            className="rounded-lg object-fit aspect-auto"
            style={{width:props.width+"px", height:props.height+"px"}}
          />
        ) : (
          <button className='w-fit p-2 rounded-md bg-gray-200 text-gray-400'>
            <p>Add Image</p>
          </button>
        )
  )
}

export default Image