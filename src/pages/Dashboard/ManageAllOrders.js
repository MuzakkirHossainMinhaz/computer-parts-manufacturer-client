import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DeleteOrder from '../../components/Shared/DeleteOrder';
import Loading from '../../components/Shared/Loading';

const ManageAllOrders = () => {
    const [removeOrder, setRemoveOrder] = useState(null);
    const [isShipped, setIsShipped] = useState(true);
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch('https://infinite-stream-10391.herokuapp.com/orders', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />;
    }

    const handleShipped = () => {
        setIsShipped(true);
    }

    return (
        <div className='bg-slate-50 rounded-b-xl p-5'>
            <div className='pb-4'>
                <h1 className='text-2xl'>All Orders: {orders.length}</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Customer Email</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Payment Info</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((a, idx) => <tr
                                key={idx}
                            >
                                <th>{idx + 1}</th>
                                <td>{a.email}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-8 h-8">
                                                <img src={a.img} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold max-w-[185px] overflow-hidden mr-3">{a.productName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{a.quantity}</td>
                                <td>
                                    {(a.totalPrice && a.paid) &&
                                        <p className='text-xs'>Transaction id:<br /><span className='text-success text-base'>{a.transactionId}</span></p>
                                    }
                                    {!a.paid &&
                                        <span className='btn btn-info btn-sm'>Unpaid</span>
                                    }
                                </td>
                                <td>
                                    {(a.totalPrice && !a.paid) && <>
                                        <label onClick={() => setRemoveOrder(a)} htmlFor="delete-confirm-modal" className="btn btn-sm btn-warning">Delete</label>
                                    </>
                                    }
                                    {a.paid && <>
                                        {
                                            isShipped ? <span onClick={handleShipped} className='btn btn-accent btn-sm'>Pending</span>
                                                :
                                                <span className='btn btn-accent btn-sm'>Shipped</span>
                                        }
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

export default ManageAllOrders;