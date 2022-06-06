import React from 'react';
import notFound from '../../assests/notfound.jpg';

const NotFound = () => {
    return (
        <div className="text-center my-10">            
            <img className='mx-auto' src={notFound} height="500" width="500" alt="not found" />
            <h1 className='font-black text-4xl'>Oops..! 404 Page Not Found</h1>
            <p className='text-xl mt-2'>Looks like you came to wrong page on our server</p>
        </div>
    );
};

export default NotFound;