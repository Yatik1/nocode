import { CanvasType, ElementType } from "../../../types/types";
import BackgroundColorPicker from "./utils/BackgroundColorPicker";
import RoundUtil from "./utils/BorderUtil";
import WidthUtil from "./utils/WidthUtil";
import HeightUtil from "./utils/HeightUtil";

function ContainerProperties({ element }: { element: CanvasType | ElementType }) {
  
  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">

      <BackgroundColorPicker element={element} />
      <RoundUtil element={element} />
        
      <div className="flex gap-2">
        <WidthUtil element={element}/>
        <HeightUtil element={element} />
      </div>
    </div>
  );
}


export default ContainerProperties;