import React from 'react';
import gallery1 from '../../assests/gallery1.svg';
import gallery2 from '../../assests/gallery2.svg';
import gallery3 from '../../assests/gallery3.svg';

const Gallery = () => {
    return (
        <div className='rounded-lg mb-2 h-fit p-10 bg-blue-300'>
            <h1 className='text-[42px] font-black text-center uppercase text-blue-800 pb-3'>Gallery</h1>

            <div class="carousel w-full mb-2 rounded-lg">
                <div id="slide1" class="carousel-item relative w-full">
                    <img src={gallery2} style={{ height: '500px' }} class="w-full" alt='' />
                    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" class="btn btn-circle">❮</a>
                        <a href="#slide2" class="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" class="carousel-item relative w-full">
                    <img src={gallery1} style={{ height: '500px' }} class="w-full" alt='' />
                    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" class="btn btn-circle">❮</a>
                        <a href="#slide3" class="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" class="carousel-item relative w-full">
                    <img src={gallery3} style={{ height: '500px' }} class="w-full" alt='' />
                    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" class="btn btn-circle">❮</a>
                        <a href="#slide1" class="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;