import React from 'react';
import { useQuery } from 'react-query';
import homeReviews from '../../assests/home_reviews.svg';
import Loading from '../../components/Shared/Loading';

const Reviews = () => {
    
    const { data: reviews, isLoading} = useQuery('reviews', () => fetch('https://infinite-stream-10391.herokuapp.com/reviews').then(res => res.json()));

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div style={{
            background: `url(${homeReviews})`,
            backgroundSize: 'cover'
        }} className="rounded-lg mb-2 h-fit p-10">
            <h1 className='text-[42px] font-black text-center uppercase text-blue-600 pb-3'>Reviews</h1>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    reviews.map((review, idx) => <div className="card w-full bg-base-100 shadow-xl p-5" key={idx}>
                        <div className="flex items-center gap-5">
                            <div>
                                <h2 className="card-title">{review.name}</h2>
                                <p>{review.comment}</p>
                                <small className='text-secondary'>Rating: {review.rate}</small>
                            </div>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default Reviews;