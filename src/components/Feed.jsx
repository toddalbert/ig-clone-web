import { useState, useEffect } from "react"
import { Button } from "antd"
import Upload from "./Upload"

export default function Feed() {
  const [photoList, setPhotoList] = useState()
  const [showUpload, setShowUpload] = useState(false)
  useEffect(() => {
    fetch('https://express-ts-c8.web.app/photos')
    // fetch('http://localhost:5002/photos')
      .then(results => results.json())
      .then(data => setPhotoList(data))
      .catch(alert)
  }, [setPhotoList])
  return (
    <section>
      {!photoList
        ? <p>Loading...</p>
        : <p>{photoList.length}</p>
      }
      {showUpload ? <Upload /> : null}
      <Button
        onClick={() => setShowUpload(true)}
        className="fab"
        type="primary"
        shape="circle"
        size="large">+</Button>
    </section>
  )
}