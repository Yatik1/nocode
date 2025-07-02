// import FlexRow from './layouts/FlexRow';
// import FlexCol from './layouts/FlexCol';
// import Canvas from './Canvas';
// import Section from './layouts/Section';
import Heading from './ui-components/Heading';
import Text from './ui-components/Text';
import Image from './ui-components/Image';
import Button from './ui-components/Button';
import Divider from './ui-components/Divider'; 

import Canvas2 from './Canvas2';
import { CanvasType, ElementType } from '../../types/types';

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

    // case 'flex-row':
    //     return  <FlexRow props={props}  id={id} />
      
    // case 'flex-col':
    //   return <FlexCol props={props} id={id} />
    
    case 'canvas':
      return <Canvas2 props={props} id={id} childrens={childrens} />

    default:
      return null;
  }
}

export default ComponentRenderer