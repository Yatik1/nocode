
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDefaultProps(sectionType: string): Record<string, any> {
  switch (sectionType) {
    case 'canvas':
      return {
        background: '#FFFFFF',
      };
    case 'heading':
      return { text: 'New Heading', level: 'h2', color: '#000000', background: 'none' };
    case 'text':
      return {
        text: 'Add your text here',
        background: 'none',
        color: '#000000',
        fontStyle: 'normal',
        decoration: 'none',
        width: '150',
      };
    case 'image':
      return { 
        src: '',
        height: '20',
        heightUnit:"rem",
        width: '20',
        widthUnit:"rem",
        rounded:"0",
      };
    case 'button':
      return { 
        text: 'Button',
        background: 'gray', 
        color: 'white', 
        rounded: '0', 
        height: '50',
        heightUnit:"px",
        width: '100',
        widthUnit:"px",
      }
    case 'container':
      return {
        background: 'lightgray',
        height: '20',
        heightUnit:"rem",
        width: '20',
        widthUnit:"rem",
        rounded:"0",
        opacity:"1"
      };
    case "divider":
      return {
        color:"lightgray",
        width:"250"
      }
    case 'row':
      return {
        alignItems: 'center',
        justifyContent: 'center',
        gap:"0",
        background: '',
        children: [],
        height:"20",
        heightUnit:"rem",
        width:"40",
        widthUnit:"rem",
        rounded:"0"
      };
    case "column":
      return {
         alignItems: 'center',
        justifyContent: 'center',
        gap:"0",
        background: '',
        children: [],
        height:"30",
        heightUnit:"rem",
        width:"20",
        widthUnit:"rem",
        rounded:"0"
      }
    default:
      return {};
  }
}