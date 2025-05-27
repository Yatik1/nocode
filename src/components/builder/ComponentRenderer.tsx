
import { JSX } from 'react';
import FlexRow from './layouts/FlexRow';
import FlexCol from './layouts/FlexCol';
import { ElementType } from './Canvas';
import Section from './layouts/Section';

interface ComponentRendererProps {
  element: ElementType;
}

function ComponentRenderer({ element }: ComponentRendererProps) {

  const { id, props, type } = element;


  switch (type) {
    case 'heading':
      const HeadingTag = props.level as keyof JSX.IntrinsicElements;
      if(props.text) return (
        <div className={`w-fit h-fit p-2 hover:border hover:border-orange-400`} style={{background:props.bgColor}}>
          <HeadingTag className={`font-bold`} style={{color:props.color}}>{props.text}</HeadingTag>
        </div>
      )
      else return <HeadingTag className={`text-gray-500 hover:border hover:border-orange-400`}>Add Heading</HeadingTag>;

    case 'text':
      if(props.content) {
        return(
          <div className='w-fit h-fit p-2 hover:border hover:border-blue-400' style={{background:props.bgColor}}>
            <p style={{color:props.color, fontStyle:props.fontStyle, textDecoration:props.decoration}}>{props.content}</p>
          </div>
        )
      }
      return <p className='text-gray-500 hover:border hover:border-orange-400'>Add content</p>;

    case 'image':
      return (
        props.src ? (
          <img
            src={props.src}
            alt="uploaded image"
            className="rounded-lg object-fit aspect-auto hover:border hover:border-pink-600"
            style={{width:props.width+"px", height:props.height+"px"}}
          />
        ) : (
          <button className='w-fit p-2 rounded-md bg-gray-200 text-gray-400 hover:border hover:border-pink-600'>
            <p>Add Image</p>
          </button>
        )
      )

    case 'button':
      return (
         <button className="px-4 py-2 hover:border hover:border-green-400" style={{background:props.bgColor?props.bgColor:"white", color:props.color?props.color : "black", borderRadius:props.rounded+"px"}}> 
          {props.text ? props.text : "Button"}
        </button>
      );

    case 'section':
      return (
        <Section props={props} id={id} />
      );

    // case 'navbar':
    //   return (
    //     <nav className="flex gap-4 p-4 bg-gray-100 rounded-lg">
    //       {props.links.map((link: { text: string; href: string }, index: number) => (
    //         <a
    //           key={index}
    //           href={link.href}
    //           className="text-blue-500 hover:text-blue-600"
    //         >
    //           {link.text}
    //         </a>
    //       ))}
    //     </nav>
    //   );

    case 'divider':
      return(
        <div className='w-full p-3'>
          <hr className='text-gray-200 w-full' />
        </div>
      );

      case 'flex-row':
        return (
          <FlexRow 
            props={props}  
            id={id}
          />
        );
      
    
    case 'flex-col':
      return (
        <FlexCol 
          props={props} 
          id={id}
        />
      )

    default:
      return null;
  }
}

export default ComponentRenderer