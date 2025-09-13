import { ChevronDown, Grip, Hand, Play, Plus, Square, UserRoundPlus } from "lucide-react"


function ControlPanel() {
  return (
    <div className="absolute z-[999%] min-w-[5rem] rounded-md bg-white border-[0.5px] border-gray-100 bottom-5 drop-shadow-md flex items-center justify-center">
        <div className="flex items-center justify-center gap-1.5 border-r border-gray-200 px-3 py-2">
         <button className="flex items-center justify-center text-blue-700 bg-blue-200 px-2 py-1 rounded-md">
            <Plus strokeWidth={1.5} size={22} />
            <p className="text-md font-light tracking-tight">Add section</p>
        </button>

       <Grip size={22} className="text-[#444544]" />
       </div>

       <div className="flex items-center justify-center gap-1.5 border-r border-gray-200 px-2 py-[0.8em]">
         <div className="flex items-center justify-center gap-0.2">
              <Square strokeWidth={1.5} size={22} className="text-[#444544]" />
              <ChevronDown strokeWidth={1} size={15} className="text-[#444544]" />
          </div>
              <Hand strokeWidth={1.5} size={22} className="text-[#444544]" />
       </div>

       <div className="flex items-center justify-center gap-1.5 px-3 py-2">
          <Play strokeWidth={1.5} size={22} className="text-[#444544]" />
          <button className="flex items-center justify-center bg-blue-500 text-white rounded-md px-2 py-1 gap-1">
            <UserRoundPlus strokeWidth={1.5} size={20} />
            <p className="text-md font-light tracking-tight">Invite</p>
          </button>

       </div>


    </div>
  )
}

export default ControlPanel