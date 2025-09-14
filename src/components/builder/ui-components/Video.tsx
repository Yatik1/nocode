import { useLocation } from "react-router-dom";


function Video(props : {
    src?:string,
    width?:string, 
    height?:string,
    widthUnit?:string, 
    heightUnit?:string,
    rounded?:string
}) {

  const {
    widthUnit = "px",
    heightUnit = "px"
  } = props;

  const location = useLocation() as {pathname : string}
  console.log(location)


  return (
    props.src ? (
          <video
          controls={location.pathname === "/"? false : true}

  src={props.src}
  className="object-cover aspect-video"
  style={{
    width: props.width + widthUnit,
    minWidth:"auto",
    minHeight:"auto",
    height: props.height + heightUnit,
    borderRadius: props.rounded + "px",
  }}
>
  Your browser does not support the video tag.
</video>

        ) : (
          <button className='w-fit p-2 rounded-md bg-gray-200 text-gray-400'>
            <p>Add Video</p>
          </button>
        )
  )
}

export default Video