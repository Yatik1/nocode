import { useEffect, useRef, useState } from "react";
import useBuilder from "../../../hooks/useBuilder";
import { Trash } from "lucide-react";
import { ElementType } from "../../../types/types";
import { BuilderContextProps } from "../../../context/BuilderContext";
import WidthUtil from "./utils/WidthUtil";
import HeightUtil from "./utils/HeightUtil";
import RoundUtil from "./utils/RoundUtil";

function VideoProperties({ element }: { element: ElementType }) {
  const { updateElementProps } = useBuilder() as BuilderContextProps;
  const { props } = element;

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (videoUrl) {
      updateElementProps({
        ...element,
        props: { ...props, src: videoUrl },
      });
    }
  }, [videoUrl]);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoUrl(URL.createObjectURL(file)); // temporary preview URL
    }
  };

  function handleRemoveVideo() {
    setVideoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset file input
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold">Upload Video</label>

      {videoUrl && (
        <div className="relative w-[15em] rounded-md overflow-hidden border">
          <video
            src={videoUrl}
            controls={true}
            className="w-full h-full object-video"
          />
          <button
            className="absolute bg-red-500 rounded-md flex items-center justify-center w-7 h-7 p-1 top-1 right-3 text-white"
            onClick={handleRemoveVideo}
          >
            <Trash />
          </button>
        </div>
      )}

      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleVideoChange}
        className="border border-gray-300 rounded-md p-2 text-sm w-[12rem]"
      />

      <div className="flex gap-2">
        <WidthUtil element={element} />
        <HeightUtil element={element} />
      </div>

      <RoundUtil element={element} />
    </div>
  );
}

export default VideoProperties;
