import { CanvasType, ElementType } from "../../../types/types";
import BackgroundColorPicker from "./utils/BackgroundColorPicker";
import RoundUtil from "./utils/BorderUtil";
import LayoutUtil from "./utils/LayoutUtil";

function ContainerProperties({ element }: { element: CanvasType | ElementType }) {
  
  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">

      <BackgroundColorPicker element={element} />
      <RoundUtil element={element} />
        
      <LayoutUtil element={element}/>
    </div>
  );
}


export default ContainerProperties;