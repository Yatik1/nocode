
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
      return { text: 'New Heading', level: 'h2', color: '#000000', bgColor: 'none' };
    case 'text':
      return {
        content: 'Add your text here',
        bgColor: 'none',
        color: '#000000',
        fontStyle: 'normal',
        decoration: 'none',
      };
    case 'image':
      return { src: '', width: '100', height: '100' };
    case 'button':
      return { text: 'Button', bgColor: 'gray', color: 'white', rounded: '0' };
    case 'section':
      return {
        backgroundColor: 'lightgray',
        height: '300',
        width: '1000',
        direction: 'row',
        children: [],
      };
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
        height:"40",
        heightUnit:"rem",
        width:"20",
        widthUnit:"rem",
        rounded:"0"
      }
    default:
      return {};
  }
}