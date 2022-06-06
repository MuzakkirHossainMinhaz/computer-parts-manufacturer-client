import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import DeleteUserModal from '../../components/Shared/DeleteUserModal';
import Loading from '../../components/Shared/Loading';

const MakeAdmin = () => {
    const [deletingUser, setDeletingUser] = useState(null);
    
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://infinite-stream-10391.herokuapp.com/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />;
    }

    const makeAdmin = (user, refetch) => {
        fetch(`https://infinite-stream-10391.herokuapp.com/user/admin/${user.email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to make ADMIN');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully ${user.email} added as ADMIN`);
                }
            })
    }

    return (
        <div className='bg-slate-50 rounded-b-xl p-5'>
            <div className='pb-4 flex justify-between items-center'>
                <h1 className='text-2xl'>All Users: {users.length}</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => <tr
                                key={idx}
                            >
                                <th>{idx + 1}</th>
                                <td>{user.email}</td>
                                <td> {user.role !== 'admin' ? <button onClick={() => makeAdmin(user, refetch)} className='btn btn-xs'>Make Admin</button> : <button className='btn btn-xs bg-green-500 border-0 text-white'>Admin</button>}</td>
                                <td> <label onClick={() => setDeletingUser(user)} htmlFor="delete-confirm-modal" className="btn btn-sm btn-warning">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingUser && <DeleteUserModal
                    deletingUser={deletingUser}
                    setDeletingUser={setDeletingUser}
                    refetch={refetch}
                ></DeleteUserModal>
            }
        </div>
    );
};

export default MakeAdmin;