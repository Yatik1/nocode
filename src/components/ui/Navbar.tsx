// import { PanelLeftOpen, Save, ScanEye } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'sonner'
// import useBuilder from '../../hooks/useBuilder'
// import { BuilderContextProps } from '../../context/BuilderContext'
// import { v4 as uuidv4 } from "uuid";
// import { useState } from 'react'

// function Navbar() {

//     const navigate = useNavigate()
//     const [project, setProject] = useState(null)
//     const { 
//       page, 
//       pages, 
//       setOpen, 
//       setSelectedElement, 
//     }= useBuilder() as BuilderContextProps

//     function onOpen() {
//       setOpen((prev:boolean) => !prev)
//       setSelectedElement(null)
//     }

//     async function saveHandler() {
//       const local_project = localStorage.getItem("project")
//       console.log(page)
//       if (!local_project || !project){
//         const save_url = `${import.meta.env.VITE_BASE_URL}/builder/projects/`
//         const id = uuidv4()

//         const payload = {
//           request_id: id,
//           name: "Test",
//           description:"Test Description",
//           json_data: pages,
//           is_published: false
//         }
//         const res = await fetch(save_url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         });
//         const data = await res.json();
//         console.log(JSON.stringify(data))
//         localStorage.setItem("project", JSON.stringify(data))
//         setProject(data)
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status} ${JSON.stringify(res.json())}`);
//         }
//       }
//       else{
//         const update_url = `${import.meta.env.VITE_BASE_URL}/builder/projects/`
//         const project = JSON.parse(local_project)
//         const payload = {
//           page_id: page.id,
//           project_id: project.id,
//           json_data: pages,
//           is_published: false
//         }
//         const res = await fetch(update_url, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         });
//         const data = await res.json();
//         console.log(data)
//         localStorage.setItem("project", JSON.stringify(data))
//         setProject(data)
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status} ${JSON.stringify(res.json())}`);
//         }
//       }
//     }

//     function publishHandler() {
//       const local_project = localStorage.getItem("project")
//       const project = local_project ? JSON.parse(local_project) : null
//       const publish_url = `${import.meta.env.VITE_BASE_URL}/builder/projects/publish` 
//       let payload
//       if (!project) {
//         const id = uuidv4()
//         payload = {
//           "request_id": id,
//           "name": "Test",
//           "description": "Test Description",
//           "json_data": page,
//           "is_published": true,
//           "page_id": page.id
//         }
//       }else{
//         payload = {
//           "project_id": project.id,
//           "name": "Test",
//           "description": "Test Description",
//           "json_data": page,
//           "is_published": true,
//           "page_id": page.id
//         }
//       }
//       fetch(publish_url, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       })
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//         if (data.error) {
//           throw new Error(`Publish failed with error: ${data.error}`);
//         }
//         toast.message("Published", {
//           description: "Website has been published successfully",
//         });
//       })
//       .catch(err => {
//         console.error("Publish failed:", err);
//         toast.error("Publish failed");
//       });
//     }

//     function onPreview() {
//       setSelectedElement(null)
//       navigate("/preview")
//     }
//   return (
//     <div className="sticky top-0 z-10 bg-white w-full h-[6.5vh] border-b border-gray-200 flex justify-between items-center align-center px-3 gap-1">
//         <button className='flex items-center justify-center cursor-pointer' onClick={onOpen}>
//           <PanelLeftOpen stroke="#646464" size={22} />
//         </button>
//         {/* <span className='w-[9rem] flex items-center justify-start'>

//         </span> */}
//         <div className='flex items-center justify-center gap-3 w-full'>
//             <div className='bg-black w-20 rounded-md h-8 text-white flex items-center justify-center gap-2'>
//                 <p className='text-white text-sm'>Save</p>
//                 <Save size={15} onClick={saveHandler}/>
//             </div>
//             <div className='bg-white border border-gray-300 w-25 rounded-md h-8 text-black flex items-center justify-center gap-2' onClick={onPreview}>
//                 <p className='text-sm'>Preview</p>
//                 <ScanEye size={15}/>
//             </div>
//         </div>
//         <div className='flex bg-black text-white rounded-md h-8 w-20 items-center justify-center text-sm' onClick={() => publishHandler()}>
//             Publish
//         </div>
//     </div>
//   )
// }

// export default Navbar