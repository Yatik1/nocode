
import FlexRow from './layouts/FlexRow';
import FlexCol from './layouts/FlexCol';
import { ElementType } from './Canvas';
import Section from './layouts/Section';
import Heading from './ui-components/Heading';
import Text from './ui-components/Text';
import Image from './ui-components/Image';
import Button from './ui-components/Button';
import Divider from './ui-components/Divider';

interface ComponentRendererProps {
  element: ElementType;
}

function ComponentRenderer({ element }: ComponentRendererProps) {

  const { id, props, type } = element;


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

    case 'section':
      return (
        <Section props={props} id={id} />
      );

    case 'flex-row':
        return  <FlexRow props={props}  id={id} />
      
    case 'flex-col':
      return <FlexCol props={props} id={id} />
      
    default:
      return null;
  }
}

export default ComponentRenderer