import Heading from './ui-components/Heading';
import Text from './ui-components/Text';
import Image from './ui-components/Image';
import Button from './ui-components/Button';
import Divider from './ui-components/Divider'; 

import Canvas from './Canvas';
import { CanvasType, ElementType } from '../../types/types';
import FlexRow from './layouts/FlexRow';
import FlexCol from './layouts/FlexCol';

type ComponentRendererType = {
  element : ElementType | CanvasType 
}

function ComponentRenderer({ element }: ComponentRendererType) {

  const { id, props, type } = element;
  const childrens = (element as CanvasType).childrens


  switch (type) {
    case 'heading':
      return <Heading {...props} />
      
    case 'text':
      return <Text {...props} />

    case 'image':
      return <Image {...props} />

    case 'button':
      return <Button {...props} />
    
    case 'divider':
      return <Divider />

    // case 'section':
    //   return (
    //     <Section props={props} id={id} />
    //   );

    case 'row':
        return  <FlexRow element={element as ElementType} />
      
    case 'column':
      return <FlexCol />
    
    case 'canvas':
      return <Canvas props={props} id={id} childrens={childrens} />

    default:
      return null;
  }
}

export default ComponentRenderer