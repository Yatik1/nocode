

function Text(props: {
    content?:string, 
    backgroundColor?:string, 
    color?:string, 
    fontStyle?:string,
    decoration?:string,
}) {
  if(props.content) {
        return(
          <div className='w-fit h-fit p-2' style={{background:props.backgroundColor}}>
            <p style={{color:props.color, fontStyle:props.fontStyle, textDecoration:props.decoration}}>{props.content}</p>
          </div>
        )
      }
      return <p className='text-gray-500'>Add content</p>;
}

export default Text

