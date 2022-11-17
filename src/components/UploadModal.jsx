import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { Modal, Form, Input, Button, Upload } from "antd"

const firebaseConfig = {
  apiKey: "AIzaSyCq45ZNvjsD0EZcSrU-HAlVkcFX06rh5Z0",
  authDomain: "upload-storage-c8.firebaseapp.com",
  projectId: "upload-storage-c8",
  storageBucket: "upload-storage-c8.appspot.com",
  messagingSenderId: "759960519965",
  appId: "1:759960519965:web:2d7e89d8b5f93ae0eb8df4"
}

export default function UploadModal({ setShowUpload, setPhotoList }) {
  const handleNewPhoto = (values) => {
    console.log(values)
    // 0. Connect to firebase storage
    const app = initializeApp(firebaseConfig)
    const storage = getStorage(app)
    // 1. Upload photo to storage bucket
    const filename = values.photo.file.name
    const imageRef = ref(storage, `photos/${filename}`)
    // console.log(values.photo)
    // return
    uploadBytes(imageRef, values.photo.file.originFileObj)
      .then(() => console.log('upload successful'))
      .catch(err => console.error(err))
    // 2. figure out URL for that photo
    const photoUrl = `https://firebasestorage.googleapis.com/v0/b/upload-storage-c8.appspot.com/o/photos%2F${filename}?alt=media`
    // 3. put that URL in to new photo object 
    let newPhotoObj = values
    newPhotoObj.photo = photoUrl
    // 4. send a post request to API
    fetch('https://express-ts-c8.web.app/photos', {
    // fetch('http://localhost:5002/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPhotoObj)
    })
      .then(results => results.json())
      .then(newListOfPhotos => {
        // 5. get back new list of photos
        setPhotoList(newListOfPhotos)
        // 6. setPhotoList and close Modal
        closeModal()
      })
      .catch(alert)
  }
  const closeModal = () => setShowUpload(false)
  return (
    <Modal title="Upload Photo" open={true} footer={null} onCancel={closeModal}>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleNewPhoto}>
        <Form.Item label="User Name" name="username">
          <Input required />
        </Form.Item>
        <Form.Item label="Profile Picture URL" name="profilePic">
          <Input required />
        </Form.Item>
        <Form.Item label="Photo" name="photo">
          <Upload listType="picture-card">
            +<br />Upload
          </Upload>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} required />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">Save Photo</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}