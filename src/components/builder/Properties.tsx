import useBuilder from "../../hooks/useBuilder"
import PropertyRenderer from "./PropertyRenderer"

function Properties() {
  const { selectedElement, updateElementProps } = useBuilder() as any

  if (!selectedElement) return null

  return (
    <div className="w-68 bg-white h-screen border-r border-gray-200 p-3 overflow-auto">
      <h4 className="text-xl font-semibold mb-2">Properties</h4>
      <hr className="text-gray-200" />
      <div className="flex flex-1 flex-wrap overflow-auto mt-5">
        <PropertyRenderer 
          key={selectedElement.id} 
          element={selectedElement} 
          onChange={updateElementProps}
        />
      </div>
    </div>
  )
}



export default Properties
