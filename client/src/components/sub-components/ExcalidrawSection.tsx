//@ts-nocheck

import { useState } from 'react'
import { Excalidraw } from '@excalidraw/excalidraw'

const ExcalidrawSection = () => {
  const UIOptions = {
    canvasActions: {
      changeViewBackgroundColor: false,
      clearCanvas: true,
      loadScene: false,
    },
  }
  const [initialData, setInitialData] = useState({
    elements: [],
  })

  return (
    <Excalidraw
      initialData={initialData}
      UIOptions={UIOptions}
      onChange={(elements, state) => {
        console.log('Elements:', state)
      }}
    />
  )
}

export default ExcalidrawSection
