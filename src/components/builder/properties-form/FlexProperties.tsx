import { ElementType } from "../../../types/types";
import BackgroundColorPicker from "./utils/BackgroundColorPicker";
import RoundUtil from "./utils/BorderUtil";
import FlexUtils from "./utils/FlexUtils";
import LayoutUtil from "./utils/LayoutUtil";


function FlexProperties({ element }: { element: ElementType }) {

  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">

      <BackgroundColorPicker element={element} />
      <RoundUtil element={element} />

      <hr className="w-full text-gray-200 mt-2" />

      <FlexUtils element={element} />

      <hr className="w-full text-gray-200 mt-2" />

        <LayoutUtil element={element}/>
    </div>
  );
}

export default FlexProperties;
