

function Text(props: {
    text?:string, 
    background?:string, 
    color?:string, 
    fontStyle?:string,
    decoration?:string,
    width?:string
}) {
  if(props.text) {
        return(
          <div className='h-fit p-2' style={{width:props.width+"px",background:props.background}}>
            <p style={{color:props.color, fontStyle:props.fontStyle, textDecoration:props.decoration}}>{props.text}</p>
          </div>
        )
      }
      return <p className='text-gray-500'>Add content</p>;
}

export default Text

