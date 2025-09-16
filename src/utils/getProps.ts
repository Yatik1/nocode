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
    case "link":
      return{
        text: 'Add your respective link text here',
        link: "https://example.com",
        color: '#0000EE',
        decoration: 'none',
      }
    case "textfield":
      return {
        label: "Input Label",
        placeholder: "Enter text...",
        value: "",
        width: "200",
        widthUnit: "px",
        labelColor: "#000000",
        valueColor: "#000000",
        placeholderColor: "#888888",
        background: "#FFFFFF",
        borderColor: "#cccccc",
        borderWidth: "1",
        rounded: "4",
      }
    case "checkbox":
      return {
        label: "Checkbox Label",
        checked: false,
        labelColor: "#000000",
        boxColor: "#2563eb",
        size: "18"
      }
    case "radio":
      return {
        label: "Radio Label",
        checked: false,
        labelColor: "#000000",
        circleColor: "#2563eb",
        size: "18",
        name: "radio-group"
      }
    case "dropdown":
      return {
        label: "Dropdown Label",
        options: "Option 1,Option 2,Option 3",
        value: "Option 1",
        labelColor: "#000000",
        optionColor: "#000000",
        background: "#FFFFFF",
        width: "200",
        widthUnit: "px",
        rounded: "4"
      }
    case "slider":
      return {
        label: "Slider Label",
        min: 0,
        max: 100,
        step: 1,
        value: 50,
        labelColor: "#000000",
        trackColor: "#2563eb",
        thumbColor: "#2563eb",
        width: "200",
        widthUnit: "px"
      }
    default:
      return {};
  }
}