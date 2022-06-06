import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DeleteConfirmModal from '../../components/Shared/DeleteConfirmModal';
import Loading from '../../components/Shared/Loading';

const ManageProducts = () => {
    const [deletingProduct, setDeletingProduct] = useState(null);

    const { data: products, isLoading, refetch } = useQuery('products', () => fetch('https://infinite-stream-10391.herokuapp.com/products', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='bg-slate-50 rounded-b-xl p-5'>
            <div className='pb-4 flex justify-between items-center'>
                <h1 className='text-2xl'>All Products: {products.length}</h1>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Minimum Order</th>
                            <th>Available</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, idx) => <tr key={product._id}>
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.img} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold max-w-[225px] overflow-hidden mr-3">{product.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.available}</td>
                                <th>
                                    <label onClick={() => setDeletingProduct(product)} htmlFor="delete-confirm-modal" className="btn btn-sm btn-warning">Delete</label>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <DeleteConfirmModal
                    deletingProduct={deletingProduct}
                    setDeletingProduct={setDeletingProduct}
                    refetch={refetch}
                ></DeleteConfirmModal>
            }
        </div>
    );
};

export default ManageProducts;