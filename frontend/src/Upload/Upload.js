import React, { useState } from 'react';
import { FilePond, File } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import axios from 'axios'
function Upload(props){
    
       const [photo, setPhoto] = useState()

       const onSubmit =(e) =>{
           e.preventDefault()
           let formData = new FormData()
           formData.append('photo', photo[0].file)
           formData.append('folder', 'folder-name')
           formData.append('user', 'username')
            
           axios.post(`/api/upload`, formData, {
           }).then(res => {
               console.log(res.data)
           })
       }    

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <button className="btn btn-primary" type="submit">Upload</button>
            </div>
            <div className="filepond-wrapper">
                <FilePond
                    file={photo}
                    name="photo"
                    allowMultiple={false}
                    server={null}
                    instantUpload={false}
                    onupdatefiles={(fileItems) => setPhoto(fileItems)}>
                </FilePond>
            </div>
        </form>)
}

export default Upload