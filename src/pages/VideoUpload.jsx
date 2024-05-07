import React, { useRef } from 'react';
import axios from 'axios';

function VideoUpload() {
    const fileInput = useRef();

    const uploadVideo = async () => {
        const file = fileInput.current.files[0];
        const formData = new FormData();
        formData.append('video', file);


        try {
            const response = await axios.post('http://localhost:8000/api/analyse-video/', formData);
            console.log("response ", response.data);
        } catch (err) {
            console.log("error ", err);
        }

    }

    return (
        <div className="latest-news">

            <div>
                <input type="file" ref={fileInput} />
                <button onClick={uploadVideo}>Upload</button>
            </div>
            <video src="http://localhost:8000/media/08fd33_4.mp4"></video>
        </div>
    );
}

export default VideoUpload;