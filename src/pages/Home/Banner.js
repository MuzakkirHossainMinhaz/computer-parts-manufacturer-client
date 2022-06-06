import React from 'react';
import bg from '../../assests/bg.svg'
import banner from '../../assests/banner.svg'
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    const productsPage = () => {
        navigate('/products');
    }
    return (
        <div style={{
            background: `url(${bg})`,
            backgroundSize: 'cover'
        }} className="hero min-h-screen rounded-lg mb-2">
            <div className="hero-content flex-col lg:flex-row m-10 gap-7">
                <img src={banner} className="max-w-sm lg:max-w-lg rounded-lg  lg:ml-6" alt='' />
                <div className=' text-slate-100 lg:ml-4'>
                    <h1 className="text-2xl lg:text-4xl font-bold">Welcome to <br /> <span className="font-black text-4xl lg:text-6xl"> <span className='lg:text-7xl'>Computer Parts</span> Manufacturing </span> <br /> Industry.</h1>
                    <p className="py-6">We are here to help you with all your computer parts needs. We aim to provide all the requirements of our customers and help them satisfy their needs, wants, and desires.</p>
                    <button onClick={productsPage} className="btn btn-ghost shadow-xl bg-blue-500 text-md px-8">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;