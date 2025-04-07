
import { JSX } from 'react';
import type { ElementType } from './Canvas';
import FlexRow from './layouts/FlexRow';
import FlexCol from './layouts/FlexCol';

interface ComponentRendererProps {
  element: ElementType;
}

function ComponentRenderer({ element }: ComponentRendererProps) {
  const { type, props } = element;

  switch (type) {
    case 'heading':
      const HeadingTag = props.level as keyof JSX.IntrinsicElements;
      return <HeadingTag className="font-bold text-2xl">{props.text}</HeadingTag>;

    case 'text':
      return <p>{props.content}</p>;

    case 'image':
      return (
        <img
          src={props.src}
          alt={props.alt}
          className="w-full h-auto rounded-lg"
        />
      );

    case 'button':
      return (
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          {props.text}
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

    case 'flex-row':
      return (
        <FlexRow 
          props={props}  
          onChildrenChange={(newChildren) => {
            props.children = newChildren;
          }}  
        />
      )
    
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