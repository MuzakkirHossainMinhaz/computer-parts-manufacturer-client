import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteOrder from '../../components/Shared/DeleteOrder';
import Loading from '../../components/Shared/Loading';
import auth from '../../firebase.init';
import Payment from './Payment';

const MyOrders = () => {
    const [removeOrder, setRemoveOrder] = useState(null);
    const [user] = useAuthState(auth);
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch('https://infinite-stream-10391.herokuapp.com/orders', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />;
    }

    let items = [];

    items = orders?.filter(o => o.email === user.email);

    return (
        <div className='bg-slate-50 rounded-b-xl p-5'>
            <div className='pb-4'>
                <h1 className='text-2xl'>My Orders: {items.length}</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Payment Info</th>
                            <th>Status</th>
                            <th>Cancel Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((a, idx) => <tr
                                key={idx}
                            >
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-8 h-8">
                                                <img src={a.img} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{a.productName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{a.quantity}</td>
                                <td>
                                    {(a.totalPrice && a.paid) &&
                                        <p className='text-xs'>Transaction id:<br /><span className='text-success text-base'>{a.transactionId}</span></p>
                                    }
                                </td>
                                <td>
                                    {(a.totalPrice && !a.paid) && <>
                                        <span className='btn btn-info btn-sm'><Link to={`/payment/${a._id}`} element={<Payment />}>Pay Now</Link></span>
                                    </>
                                    }
                                    {(a.totalPrice && a.paid) &&
                                        <span className='btn btn-success btn-sm'>Paid</span>
                                    }
                                </td>
                                <td>
                                    {(a.totalPrice && !a.paid) && <>
                                        <label onClick={() => setRemoveOrder(a)} htmlFor="delete-confirm-modal" className="btn btn-sm btn-warning">Delete</label>
                                    </>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                removeOrder && <DeleteOrder
                    removeOrder={removeOrder}
                    setRemoveOrder={setRemoveOrder}
                    refetch={refetch}
                ></DeleteOrder>
            }
        </div >
    );
};

export default MyOrders;