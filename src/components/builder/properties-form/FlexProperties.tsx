import { ElementType } from "../../../types/types";
import BackgroundColorPicker from "./utils/BackgroundColorPicker";
import WidthUtil from "./utils/WidthUtil";
import HeightUtil from "./utils/HeightUtil";
import RoundUtil from "./utils/RoundUtil";
import FlexUtils from "./utils/FlexUtils";


function FlexProperties({ element }: { element: ElementType }) {

  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">

      <BackgroundColorPicker element={element} />
      <RoundUtil element={element} />

      <hr className="w-full text-gray-200 mt-2" />

      <FlexUtils element={element} />

      <hr className="w-full text-gray-200 mt-2" />

      <div className="flex gap-2">
        <WidthUtil element={element}/>
        <HeightUtil element={element} />
      </div>
    </div>
  );
}

export default FlexProperties;
