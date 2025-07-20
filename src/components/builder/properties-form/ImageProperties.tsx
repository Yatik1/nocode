import { useEffect, useRef, useState } from "react";
import useBuilder from "../../../hooks/useBuilder";
import { Trash } from "lucide-react";
import { ElementType } from "../../../types/types";
import { BuilderContextProps } from "../../../context/BuilderContext";
import WidthUtil from "./utils/WidthUtil";
import HeightUtil from "./utils/HeightUtil";
import RoundUtil from "./utils/RoundUtil";


function ImageProperties({ element }: {element:ElementType}) {
  const { updateElementProps } = useBuilder() as BuilderContextProps;
  const {props} = element

  const [imageUrl, setImageUrl] = useState<string | null>(props.src || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
      updateElementProps({...element, props:{...props, src: imageUrl }});
  }, [imageUrl]);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setImageUrl(tempUrl);
  }

  function handleRemoveImage() {
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  }


  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold">Add an Image</label>

      {imageUrl && (
        <div className="relative w-[220px] h-[220px] rounded-md overflow-hidden border">
          <img
            src={imageUrl}
            alt="Uploaded image"
            className="w-full h-full object-cover"
          />
          <button
            className="absolute bg-red-500 rounded-md flex items-center justify-center w-7 h-7 p-1 top-1 right-3 text-white"
            onClick={handleRemoveImage}
          >
            <Trash />
          </button>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleUpload}
        placeholder="Choosen file"
        className="border border-gray-300 rounded-md p-2 text-sm w-[12rem]"
      />

      <div className="flex gap-2">
        <WidthUtil element={element} />
        <HeightUtil element={element} />
      </div>

      <RoundUtil element={element}/>
    </div>
  );
}

export default ImageProperties;
