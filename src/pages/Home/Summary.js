import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import summary from '../../assests/summary.jpg';
import Loading from '../../components/Shared/Loading';

const Summary = () => {
    const navigate = useNavigate();
    const { data: reviews, isLoadingR } = useQuery('reviews', () => fetch('https://infinite-stream-10391.herokuapp.com/reviews').then(res => res.json()));
    const { data: products, isLoading } = useQuery('products', () => fetch('https://infinite-stream-10391.herokuapp.com/products').then(res => res.json()));
    const { data: user, isLoadingU } = useQuery('users', () => fetch('https://infinite-stream-10391.herokuapp.com/user').then(res => res.json()));

    if (isLoadingR) {
        return <Loading />;
    }
    if (isLoading) {
        return <Loading />;
    }
    if (isLoadingU) {
        return <Loading />;
    }

    const contactUs = () => {
        navigate('/contact');
    }
    return (
        <div style={{
            background: `url(${summary})`,
            backgroundSize: 'cover'
        }} className='rounded-lg flex flex-col items-center justify-center h-fit py-10 mb-2 px-5 lg:px-0'>
            <h1 className='text-4xl lg:text-5xl font-black text-center uppercase text-blue-200 pb-1'>Millions Business Trust Us</h1>
            <h3 className='text-xl font-bold text-center uppercase text-blue-400 pb-3'>Try to understand users expectation</h3>
            <div className='pb-3 text-blue-600'>
                <span className="material-symbols-outlined">more_horiz</span>
                <span className="material-symbols-outlined">remove</span>
                <span className="material-symbols-outlined">more_horiz</span>
                <span className="material-symbols-outlined">remove</span>
                <span className="material-symbols-outlined">more_horiz</span>
            </div>
            <div className="stats stats-vertical lg:stats-horizontal shadow w-10/12">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <span className="material-symbols-outlined text-3xl font-semibold">
                            inventory_2
                        </span>
                    </div>
                    <div className="stat-title">Total Products</div>
                    <div className="stat-value text-primary">{products?.length}+</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <span className="material-symbols-outlined text-3xl font-semibold">
                            sentiment_satisfied
                        </span>
                    </div>
                    <div className="stat-title">Total Customers</div>
                    <div className="stat-value text-secondary">{user?.length}+</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-accent">
                        <span className="material-symbols-outlined text-3xl font-semibold">
                            forum
                        </span>
                    </div>
                    <div className="stat-title">Total Reviews</div>
                    <div className="stat-value">{reviews?.length}+</div>
                </div>

            </div>

            <div className='my-5 w-10/12 flex justify-between items-center flex-col lg:flex-row gap-4'>
                <div>
                    <h2 className='text-white text-3xl font-extrabold'>Have any question about us or get a products request?</h2>
                    <p className='text-xl text-yellow-400'>Don't hesitate to contact us</p>
                </div>
                <button onClick={contactUs} className="btn btn-wide bg-blue-500 border-0 text-lg">Contact Us</button>
            </div>
        </div>
    );
};

export default Summary;