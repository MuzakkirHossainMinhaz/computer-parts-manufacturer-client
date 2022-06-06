import React from 'react';
import { toast } from 'react-toastify';

const DeleteConfirmModal = ({ deletingProduct, setDeletingProduct, refetch }) => {
    const { img, name, _id } = deletingProduct;

    const confirmDelete = () => {
        fetch(`https://infinite-stream-10391.herokuapp.com/product/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`Product ${name} is deleted.`)
                    setDeletingProduct(null);
                    refetch();
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you want to <span className='text-error font-black'>DELETE</span> '{name}'?</h3>
                    <p className="py-4">If you delete (confirm) once, then you won't recover it. <span className='font-medium text-warning'>Be Careful!</span></p>
                    <div className="modal-action">
                        <button onClick={() => confirmDelete()} className='btn btn-sm btn-warning'>Delete</button>
                        <label htmlFor="delete-confirm-modal" className="btn btn-sm btn-ghost">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DeleteConfirmModal;