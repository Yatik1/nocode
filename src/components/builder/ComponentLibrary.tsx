import React from 'react';
import Card from '../ui/Card';
import { Layout, Type, Image, Link, AlignHorizontalDistributeCenter, Heading, AlignVerticalDistributeCenter, SeparatorHorizontal, X } from 'lucide-react';
import useBuilder from '../../hooks/useBuilder';


const components = [
  { id: 'heading', icon: <Heading size={24} />, label: 'Heading' },
  { id: 'text', icon: <Type size={24} />, label: 'Text' },
  { id: 'image', icon: <Image size={24} />, label: 'Image' },
  { id: 'button', icon: <Link size={24} />, label: 'Button' },
  {id:'divider', icon: <SeparatorHorizontal />, label:'Separator'}
];

const layouts = [
  { id: 'section', icon: <Layout size={24} />, label: 'Section' },
  { id: 'flex-row', icon: <AlignHorizontalDistributeCenter size={24} />, label: 'Row Layout' },
  { id: 'flex-col', icon: <AlignVerticalDistributeCenter size={24} />, label: 'Column Layout' },
  // { id: 'grid', icon: <LayoutPanelLeft size={24} />, label: 'Grid Layout' },
]

function ComponentLibrary() {

  const {setSelectedElement,elements} = useBuilder() as any

  const {open, setOpen} = useBuilder() as any

  const onDragStart = (e: React.DragEvent, componentId: string) => {
  setSelectedElement(null)
    e.dataTransfer.setData('componentId', componentId);
    
  };

  return (
    open && (
      <div className="bg-white w-[16rem] h-screen border-r border-gray-200 p-4">
      <div className='flex items-center justify-between mb-4'>
        <h2 className="text-lg font-semibold">Components</h2>
        <button className="text-sm text-gray-500 hover:text-gray-700" onClick={() => setOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {components.map((component) => (
          <Card
            key={component.id}
            draggable
            onDragStart={(e) => onDragStart(e, component.id)}
            className="p-3 cursor-move hover:bg-gray-50 transition-colors flex flex-col items-center gap-2"
          >
            {component.icon}
            <span className="text-[0.85rem]">{component.label}</span>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-2 mt-5">Layouts</h2>
      <div className="grid grid-cols-2 gap-2">
        {layouts.map((layout) => (
          <Card
            key={layout.id}
            draggable
            onDragStart={(e) => onDragStart(e, layout.id)}
            className="px-1 py-3 cursor-move hover:bg-gray-50 transition-colors flex flex-col items-center gap-2"
          >
            {layout.icon}
            <span className="text-[0.8rem]">{layout.label}</span>
          </Card>
        ))}
      </div>

      <button onClick={() => console.log(JSON.stringify(elements))}>Get data stringify</button>
      <button onClick={() => console.log(elements)}>Get data json</button>

    </div>
    ) 
  );
}

export default ComponentLibrary