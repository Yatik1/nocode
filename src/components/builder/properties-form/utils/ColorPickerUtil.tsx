import ColorPicker from "react-best-gradient-color-picker"
import { rgbaToHex } from "./utils"

interface ColorPickerPopOverProps {
    value:string,
    onChange:(color:string) => void,
    onToggleVisibility ?: (open:boolean) => void,
    open:boolean,
    type?:string
}

export default function ColorPickerUtil({
    value, 
    onChange, 
    onToggleVisibility, 
    open,
    type
} : ColorPickerPopOverProps) {

    const handleToggle  = () => {
        onToggleVisibility?.(!open)
    }
    return(
        <div className="flex items-center justify-between gap-1">
            <div 
                className="flex items-center justify-between gap-1.5 py-1 px-2 bg-[#f4f4f4] rounded-[4px] cursor-pointer"
                onClick={handleToggle}
            >
                <div className="w-[15px] h-[15px] rounded-[2px]" style={{background:value}} />
                 <p className="text-[#707070] text-sm w-25 capitalize">
                        {value?.startsWith("linear") ? "Linear": rgbaToHex(value)}
                </p>
            </div>

            {open && (
                <ColorPicker 
                    value={value}
                    onChange={onChange}
                    hideControls={type==="text" ? true : false}
                    disableDarkMode
                    width={310}
                    height={180}
                    className="absolute z-50 left-[-120%] top-1/2 -translate-y-1/2 border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden px-[10rem] py-2"
                />
            )}
        </div>
    )
}