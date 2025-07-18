import {JSX} from 'react'

function Heading(props : {
    level?:string, 
    text?:string, 
    backgroundColor?:string,
    color?:string,
}) {
    const HeadingTag = props.level as keyof JSX.IntrinsicElements;
    if(props.text) return (
        <div className={`w-fit h-fit p-2`} style={{background:props.backgroundColor}}>
          <HeadingTag className={`font-bold`} style={{color:props.color}}>{props.text}</HeadingTag>
        </div>
    )
    else return <HeadingTag className={`text-gray-500`}>Add Heading</HeadingTag>;
}

export default Heading
