import { useState, useEffect } from "react"
import { Button } from "antd"
import UploadModal from "./UploadModal"
import Post from "./Post"

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
        : photoList.map(post => (
          <Post post={post} key={post.photoId} />
        ))
      }
      {showUpload ? <UploadModal setPhotoList={setPhotoList} setShowUpload={setShowUpload} /> : null}
      <Button
        onClick={() => setShowUpload(true)}
        className="fab"
        type="primary"
        shape="circle"
        size="large">+</Button>
    </section>
  )
}