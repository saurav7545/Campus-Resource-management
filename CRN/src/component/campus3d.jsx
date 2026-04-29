import React, { useEffect, useRef } from 'react'

function Campus3D() {
  const containerRef = useRef(null)

  return (
    <div className="campus3d-container" ref={containerRef}>
      <iframe 
        src="/src/assets/3dmodel.html"
        title="Campus 3D Navigator"
        className="campus3d-iframe"
      />
      
      <style>{`
        .campus3d-container {
          width: 100%;
          height: calc(100vh - 80px);
          overflow: hidden;
        }
        
        .campus3d-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      `}</style>
    </div>
  )
}

export default Campus3D
