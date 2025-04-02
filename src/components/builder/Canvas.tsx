import React, { useState } from 'react';
import { ComponentRenderer } from './ComponentRenderer';


export interface CanvasComponent {
  id: string;
  type: string;
  props: Record<string, any>;
}

export function Canvas() {
  const [components, setComponents] = useState<CanvasComponent[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentId = e.dataTransfer.getData('componentId');
    const newComponent: CanvasComponent = {
      id: `${componentId}-${Date.now()}`,
      type: componentId,
      props: getDefaultProps(componentId),
    };
    setComponents([...components, newComponent]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className="flex-1 bg-gray-50 p-8"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="max-w-4xl mx-auto min-h-[calc(100vh-4rem)] bg-white rounded-lg shadow-sm p-8">
        {components.map((component) => (
          <ComponentRenderer key={component.id} component={component} />
        ))}
        {components.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-400">
            Drag and drop components here
          </div>
        )}
      </div>
    </div>
  );
}

function getDefaultProps(componentId: string): Record<string, any> {
  switch (componentId) {
    case 'heading':
      return { text: 'New Heading', level: 'h2' };
    case 'text':
      return { content: 'Add your text here' };
    case 'image':
      return { 
        src: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.1',
        alt: 'Image description' 
      };
    case 'button':
      return { text: 'Click me', variant: 'primary' };
    case 'section':
      return { backgroundColor: 'white', padding: 'medium' };
    case 'navbar':
      return { 
        links: [
          { text: 'Home', href: '#' },
          { text: 'About', href: '#' },
          { text: 'Contact', href: '#' }
        ]
      };
    default:
      return {};
  }
}