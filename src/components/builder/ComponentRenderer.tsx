
import { JSX } from 'react';
import FlexRow from './layouts/FlexRow';
import FlexCol from './layouts/FlexCol';
import useBuilder from '../../hooks/useBuilder';
import { ElementType } from './Canvas';

interface ComponentRendererProps {
  element: ElementType;
}

function ComponentRenderer({ element }: ComponentRendererProps) {
  // const { type, props, id } = element;

  const {elements} = useBuilder() as any
  const liveElement = findElementById(elements, element.id) || element;
  const { id, props, type } = liveElement;

  function findElementById(elements: ElementType[], id: string): ElementType | null {
    for (const el of elements) {
      if (el.id === id) return el;
      if (Array.isArray(el.props?.children)) {
        const found = findElementById(el.props.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  switch (type) {
    case 'heading':
      const HeadingTag = props.level as keyof JSX.IntrinsicElements;
      if(props.text) return (
        <div className='w-full h-fit p-2' style={{background:props.bgColor}}>
          <HeadingTag className={`font-bold`} style={{color:props.color}}>{props.text}</HeadingTag>
        </div>
      )
      else return <HeadingTag className={`text-gray-500`}>Add Heading</HeadingTag>;

    case 'text':
      if(props.content) {
        return(
          <div className='w-full h-fit p-2' style={{background:props.bgColor}}>
            <p style={{color:props.color, fontStyle:props.fontStyle, textDecoration:props.decoration}}>{props.content}</p>
          </div>
        )
      }
      return <p className='text-gray-500'>Add content</p>;

    case 'image':
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

    case 'button':
      return (
        <button className={`px-4 py-2`} style={{background:props.bgColor?props.bgColor:"black", color:props.color?props.color : "white", borderRadius:props.rounded+"px"}}> 
          {props.text ? props.text : "Button"}
        </button>
      );

    case 'section':
      return (
        <section className="p-6 rounded-lg border border-gray-200">
          <div className="h-32 flex items-center justify-center text-gray-400">
            Section Container
          </div>
        </section>
      );

    case 'navbar':
      return (
        <nav className="flex gap-4 p-4 bg-gray-100 rounded-lg">
          {props.links.map((link: { text: string; href: string }, index: number) => (
            <a
              key={index}
              href={link.href}
              className="text-blue-500 hover:text-blue-600"
            >
              {link.text}
            </a>
          ))}
        </nav>
      );

    case 'divider':
      return(
        <hr className='text-gray-200' />
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
          onChildrenChange={(newChildren) => {
            props.children = newChildren;
          }} 
        />
      )

    default:
      return null;
  }
}

export default ComponentRenderer