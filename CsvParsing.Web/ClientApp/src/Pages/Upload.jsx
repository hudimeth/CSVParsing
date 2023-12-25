import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const toBase64 = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const Upload = () => {

    const navigate = useNavigate();
    const fileRef = useRef(null);

    const onUploadClick = async () => {
        const file = fileRef.current.files[0];
        const base64 = await toBase64(file);
        await axios.post('/api/csvparsing/uploadcsv', { base64});
        navigate('/');
    }

    return (
        <div className='container pt-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-2'>
                    <input ref={ fileRef} type='file' className='form-control' />
                </div>
                <div className='col-md-3'>
                    <button className='btn btn-secondary' onClick={onUploadClick}>Upload</button>
                </div>
            </div>
        </div>
    )
}
export default Upload;