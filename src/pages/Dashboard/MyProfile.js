import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import Loading from '../../components/Shared/Loading';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth);
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
    
    return (
        <div className="w-full bg-slate-50 p-5 mb-2 rounded-b-lg">
            <div className='pb-2'>
                <h1 className='text-2xl'>My Profile</h1>
            </div>
            <div className="bg-base-100 w-full md:w-1/2 mx-auto p-5 shadow-xl rounded-lg">
                <form onSubmit='' action="" className='grid grid-cols-1 gap-4 justify-items-center'>
                    <div className='flex gap-5 justify-start items-center'>
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={currentUser.img} alt='' />
                            </div>
                        </div>
                        <div className='w-full'>
                            <h2 className='font-bold text-xl'>{currentUser?.name || user?.displayName}</h2>
                            <small className='font-medium italic'>{currentUser.email}</small>
                            <p className='text-sm'><span className='font-semibold'>Bio: </span>{currentUser.bio}</p>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="input-group input-group-vertical">
                            <span className='text-xs py-2 font-medium'>University/College</span>
                            <input name='education' type="text" value={currentUser.education} className="input input-bordered w-full text-base" />
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="input-group input-group-vertical">
                            <span className='text-xs py-2 font-medium'>LinkedIn Profile</span>
                            <input name='education' type="text" value={currentUser.linkedIn} className="input input-bordered w-full text-base" />
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="input-group input-group-vertical">
                            <span className='text-xs py-2 font-medium'>Phone Number</span>
                            <input name='phone' type="text" value={currentUser.phone} placeholder="Enter your phone number" className="input input-bordered w-full text-base" />
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="input-group input-group-vertical">
                            <span className='text-xs py-2 font-medium'>Location/Address</span>
                            <textarea name='address' value={currentUser.address} className="textarea textarea-bordered h-24 w-full text-base" placeholder="Enter your address"></textarea>
                        </label>
                    </div>

                    <label
                        htmlFor="profile-modal"
                        className="btn btn-primary font-medium w-full text-[16px] uppercase border-0 text-white">
                        Upadate Profile
                    </label>
                </form>
            </div>
        </div>
    );
};

export default MyProfile;