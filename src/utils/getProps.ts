
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDefaultProps(sectionType: string): Record<string, any> {
  switch (sectionType) {
    case 'canvas':
      return {
        backgroundColor: '#FFFFFF',
        width:window.innerWidth,
        height:window.innerHeight
      };
    case 'heading':
      return { text: 'New Heading', level: 'h2', color: '#000000', backgroundColor: 'none' };
    case 'text':
      return {
        content: 'Add your text here',
        backgroundColor: 'none',
        color: '#000000',
        fontStyle: 'normal',
        decoration: 'none',
      };
    case 'image':
      return { src: '', width: '100', height: '100' };
    case 'button':
      return { text: 'Button', backgroundColor: 'gray', color: 'white', rounded: '0' };
    case 'container':
      return {
        backgroundColor: 'lightgray',
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
        width:"50"
      }
    case 'row':
      return {
        alignItems: 'center',
        justifyContent: 'center',
        gap:"0",
        backgroundColor: '',
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
        backgroundColor: '',
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