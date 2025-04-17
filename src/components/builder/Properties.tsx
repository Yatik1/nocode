import useBuilder from "../../hooks/useBuilder"

import PropertyRenderer from "./PropertyRenderer"

export default function Properties() {
  const { selectedElement } = useBuilder() as any
  const {props, type} = selectedElement

  return (
    <div className="w-68 bg-white h-screen border-r border-gray-200 p-3 overflow-auto">
      <h4 className="text-xl font-semibold mb-2">Properties</h4>
      <hr className="text-gray-200" />
      <div className="flex flex-1 flex-wrap overflow-auto mt-5">
        <PropertyRenderer 
            props={props}
            type={type}
        />
      </div>
    </div>
  )
}
