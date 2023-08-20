import React, { memo, useEffect, useState } from 'react'
import { BASEPATH } from '../../config';
import Loader from '../loader/Loader';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const StudentImage = ({ id }) => {
    console.log('mounted');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const getImage = async () => {
        try {
            let res = await axios.get(`${BASEPATH}app/getimages/${id}`);
            setImage(res.data.img);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getImage();
    }, [id]);
    return (
        <>
            <div className="cellWithImg">
                {loading ? <div className='cellImg'><CircularProgress /></div> : <LazyLoadImage src={image} alt="" className='cellImg' />}
            </div>
        </>
    )
}

export default memo(StudentImage)
