import useBuilder from "../../hooks/useBuilder";

function PropertyRenderer({
    element,
  }: {
    element: any,
  }) {
    const { props, type } = element
  
    const {updateElementProps} = useBuilder() as any

    function onChangeLevel(level: string) {
      updateElementProps({ ...props, level })
    }
  
    function onColorInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      updateElementProps({ ...props, color: e.target.value });
    }
  
    switch (type) {
      case "heading":
        const headingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"]
        return (
          <div className="flex flex-1 flex-col gap-[0.56rem]">
            <label className="text-sm font-semibold">Levels</label>
            <div className="flex items-center justify-between px-2">
              {
                headingLevels.map((level) => (
                  <div
                    key={level}
                    className={`flex items-center justify-center border border-stone-300 p-3 rounded-md w-7 h-7 cursor-pointer ${
                      props.level === level ? "bg-gray-200" : "bg-white text-gray-500"
                    }`}
                    onClick={() => onChangeLevel(level)}
                  >
                    <p className="text-sm">{level}</p>
                  </div>
                ))
              }
            </div>
            
            <label className="text-sm font-semibold">Text Color</label>
              <div className="flex gap-2 justify-start items-center">
                  <div className="w-4 h-4 rounded-md" style={{backgroundColor:props.color}} />
                  <input
                    type="text"
                    value={props.color}
                    onChange={onColorInputChange}
                    placeholder="#000000"
                    className="border border-gray-300 rounded-md p-2 text-sm"
                  />
              </div>
  
          </div>
        )
      default:
        return <p>No properties available for this element.</p>
    }
  }

export default PropertyRenderer