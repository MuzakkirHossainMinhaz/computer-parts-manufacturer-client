import React, { useState } from 'react';
import plus from '../../assests/plus.png';
import minus from '../../assests/minus.png';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useQuery } from 'react-query';
import Loading from '../../components/Shared/Loading';

const AddReviews = () => {
    const [user] = useAuthState(auth);
    let [rating, setRating] = useState(0);
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://infinite-stream-10391.herokuapp.com/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />;
    }

    const currentUser = users.find(u => u.email === user.email);

    const minusRating = () => {
        setRating(rating - 1);
        if (rating < 2) {
            setRating(1);
        }
    }
    const plusRating = () => {
        setRating(rating + 1);
        if (rating > 4) {
            setRating(5);
        }
    }

    const handleReview = data => {
        data.preventDefault();
        const review = {
            img: currentUser.img,
            name: user.displayName,
            rate: data.target.rating.value,
            comment: data.target.comment.value,
        }

        fetch('https://infinite-stream-10391.herokuapp.com/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(inserted => {
                if (inserted.insertedId) {
                    toast.success('Successfully add a review.')
                }
                else {
                    toast.error('Oops! Failed to add the review.');
                }
            })
    }

    return (
        <div className='bg-slate-50 rounded-b-xl p-5'>
            <div className='pb-4'>
                <h1 className='text-2xl'>Give a Review:</h1>
            </div>

            <div className='rounded-lg bg-slate-200 md:w-1/2 p-3 mx-auto'>
                <form onSubmit={handleReview}>
                    <div className="form-control mb-3 mx-auto">
                        <label className="input-group">
                            <span onClick={minusRating} className='btn border-0 btn-accent'><img src={minus} alt="" className='w-5' /></span>
                            <input name='rating' className='w-20 text-center text-base' disabled value={rating} type="text" />
                            <span onClick={plusRating} className='btn border-0 btn-accent' type='submit'><img src={plus} alt="" className='w-5' /></span>
                        </label>
                    </div>
                    <div>
                        <p>Comment:</p>
                        <textarea name='comment' className="textarea textarea-bordered text-base w-full h-20" placeholder="Write your comment here"></textarea>
                    </div>
                    <input className='btn btn-accent text-base font-medium w-full mt-2' type="submit" value='Submit' />
                </form>
            </div>
        </div>
    );
};

export default AddReviews;