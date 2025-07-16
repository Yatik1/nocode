

function Divider(props : {
  color?:string,
  width?:string
}) {
  console.log(props)
    return(
          <hr 
            style={{
              color:props.color,
              width:props.width+"rem"
            }} 
          />
    );
}

export default Divider