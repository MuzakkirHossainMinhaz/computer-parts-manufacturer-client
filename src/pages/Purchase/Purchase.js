import { eventWrapper } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Shared/Loading';
import auth from '../../firebase.init';

const Purchase = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    let [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPrice1, setTotalPrice1] = useState(1);
    const { data: products, isLoading, refetch } = useQuery('products', () => fetch('https://infinite-stream-10391.herokuapp.com/products', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />;
    }
    const product = products.find(p => p._id === id);

    if (quantity === 0) {
        quantity = parseFloat(product.quantity);
    }

    const courier = [
        'Sundarban Courier ', 'Continental Courier '
    ];

    const available = parseFloat(product.available);
    const quanT = parseFloat(product.quantity);

    const changeQuantity = event => {
        let quantity1 = event.target.value;
        setQuantity(quantity1);
        let price = parseFloat(product.price);
        setTotalPrice1(0);
        setTotalPrice(quantity1 * price);
    }
    /* 
        const isPurchase = 
        console.log(isPurchase);
        console.log(quanT, available, quantity); */

    const handlePurchase = event => {
        event.preventDefault();
        const order = {
            img: product.img,
            productName: event.target.productName.value,
            quantity: event.target.quantity.value,
            name: event.target.name.value,
            email: event.target.email.value,
            address: event.target.address.value,
            phone: event.target.phone.value,
            courier: event.target.courier.value,
            totalPrice: event.target.totalPrice.value,
        }

        fetch('https://infinite-stream-10391.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(inserted => {
                if (inserted.insertedId) {
                    toast.success('Ordered successfully.');
                }
                else {
                    toast.error('Oops! Failed to order.');
                }
            })

    }

    return (
        <div className="hero min-h-screen bg-base-200 rounded-lg mb-2 py-8">
            <div className="hero-content flex lg:justify-center flex-col lg:flex-row-reverse">
                <div className='flex flex-col justify-center items-center'>
                    <div className="text-center lg:text-left lg:mx-10">
                        <h1 className="text-5xl font-bold">Purchase Now!</h1>
                        <div className='pt-6'>
                            <h3 className='text-2xl font-bold'>Description:</h3>
                            <p className="py-3">{product.description}.</p>
                        </div>
                    </div>
                </div>
                <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handlePurchase} action="" className='grid grid-cols-1 gap-4 justify-items-center'>
                            <div className='flex flex-col lg:flex-row w-full gap-4'>
                                <div className="form-control w-full">
                                    <label className="input-group input-group-vertical">
                                        <span className='text-xs py-2 font-medium'>Product Name</span>
                                        <input name='productName' type="text" disabled value={product.name} className="input input-bordered w-full text-base" />
                                    </label>
                                </div>
                                <div className="form-control w-full">
                                    <label className="input-group input-group-vertical">
                                        <span className='text-xs py-2 font-medium'>Products Quantity</span>
                                        <input name='quantity' onChange={changeQuantity} type="text" defaultValue={product.quantity} className="input input-bordered w-full text-base" />
                                    </label>
                                    {
                                        !(parseFloat(quantity) >= quanT && parseFloat(quantity) <= available) && <p className='text-xs text-red-600'>Never less than minimum quantity and greater than available quantity.</p>
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row w-full gap-4'>
                                <div className="form-control w-full">
                                    <label className="input-group input-group-vertical">
                                        <span className='text-xs py-2 font-medium'>Your Name</span>
                                        <input name='name' type="text" disabled value={user.displayName} placeholder="Full name" className="input input-bordered w-full text-base" />
                                    </label>
                                </div>
                                <div className="form-control w-full">
                                    <label className="input-group input-group-vertical">
                                        <span className='text-xs py-2 font-medium'>Your Email</span>
                                        <input name='email' type="email" disabled value={user.email} placeholder='Your email' className="input input-bordered w-full text-base" />
                                    </label>
                                </div>
                            </div>
                            <div className="form-control w-full">
                                <label className="input-group input-group-vertical">
                                    <span className='text-xs py-2 font-medium'>Your Address</span>
                                    <textarea name='address' className="textarea textarea-bordered h-24 w-full text-base" placeholder="Enter your address"></textarea>
                                </label>
                            </div>
                            <div className='flex flex-col lg:flex-row w-full gap-4'>
                                <div className="form-control w-full">
                                    <label className="input-group input-group-vertical">
                                        <span className='text-xs py-2 font-medium'>Your Phone Number</span>
                                        <input name='phone' type="text" placeholder="Enter your phone number" className="input input-bordered w-full text-base" />
                                    </label>
                                </div>
                                <div className="form-control w-full">
                                    <label className="input-group input-group-vertical">
                                        <span className='text-xs py-2 font-medium'>Transport Medium</span>
                                        <select name='courier' className="select select-bordered font-normal text-base w-full">
                                            {
                                                courier.map((q, idx) => <option
                                                    key={idx}
                                                    value={q}
                                                >{q}</option>)
                                            }
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row w-full gap-4'>
                                <div className="form-control w-full">
                                    <label className="input-group input-group-vertical">
                                        <span className='text-xs py-2 font-medium'>Total Cost/Price</span>
                                        <input name='totalPrice' type="text" disabled value={(totalPrice1 === 1) ? parseFloat(product.quantity) * parseFloat(product.price) : totalPrice} className="input input-bordered w-full text-base" />
                                    </label>
                                </div>
                            </div>

                            <input type="submit" value='Order Now' disabled={(parseFloat(quantity) >= quanT && parseFloat(quantity) <= available) ? false : true } className="btn btn-primary font-medium w-full text-[16px] uppercase border-0 text-white" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Purchase;