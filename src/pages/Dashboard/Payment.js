import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import Loading from '../../components/Shared/Loading';
import { useQuery } from 'react-query';

const stripePromise = loadStripe('pk_test_51L3it2KHJ2f1uSOVGLOOARZB52nGBFHQqLiAuC8ihCZNOXRnEoIYJad64Fe67znz3xCqDUevYpdSQSXNbsNXksEy00nE9omNg4');

const Payment = () => {
    const { id } = useParams();
    const url = `https://infinite-stream-10391.herokuapp.com/orders/${id}`;

    const { data: order, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='flex justify-center flex-col items-center'>
            <div class="card w-full lg:w-1/3 bg-base-100 shadow-xl my-12">
                <div class="card-body">
                    <p className='font-bold'>Hello, <span className="text-success text-lg">{order.name}</span></p>
                    <h2 class="card-title">Please Pay for <br /><span className='text-orange-500 font-black'>{order.productName}</span></h2>
                    <p>Please pay: ${order.totalPrice}</p>
                </div>
            </div>
            <div class="card flex-shrink-0 w-50 shadow-2xl bg-base-100 mb-14 w-full lg:w-1/3">
                <div class="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;