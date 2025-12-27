// import useBuilder from '../../hooks/useBuilder'
// import { BuilderContextProps } from '../../context/BuilderContext'
// import ComponentRenderer from '../builder/ComponentRenderer'
import axios from 'axios'
import { useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ComponentRenderer from '../builder/ComponentRenderer'
import { PageType } from '../../types/types'

function Website() {
    // const {page:selectedPage} = useBuilder() as BuilderContextProps
    const {projectId} = useParams() 
    console.log(projectId)

    const [pageJSON, setPageJSON] = useState<PageType |null>(null)

    const getPageJSON = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8030/project/${projectId}/json_status`)
        console.log(res.data.data.json)
        setPageJSON(res.data.data.json[0])
      } catch (error) {
        console.error("Internal error - [WEB]", error )
      }

    }

    useLayoutEffect(() => {
      getPageJSON()
    },[]) 


  return (
    <div className="w-full h-screen">
        {pageJSON?.content.map((content:any) => (
          <ComponentRenderer element={content} key={content.id} />
        ))}
    </div>
  )
}

export default Website