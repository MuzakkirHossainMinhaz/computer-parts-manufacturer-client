import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import Loading from '../../components/Shared/Loading';
import { useQuery } from 'react-query';

const ProfileModal = ({ profile, setProfile }) => {
    const [user] = useAuthState(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
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

    const imgStorageKey = 'c54b517a18342b185ccce5b0e03d65c9';

    const onSubmit = async data => {
        const image = data.photo[0];
        let isDone = false;
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(async result => {
                if (result.success) {
                    const img = result.data.url;
                    const profile = {
                        img: img,
                        email: data.email,
                        bio: data.bio,
                        education: data.education,
                        linkedIn: data.linkedIn,
                        phone: data.phone,
                        address: data.address,
                    }

                    fetch(`https://infinite-stream-10391.herokuapp.com/user/${user.email}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(profile),
                    })
                        .then(res => res.json())
                        .then(data => {
                            const accessToken = data.token;
                            localStorage.setItem('accessToken', accessToken);
                            isDone = true;
                        })
                }
            })

        if (!isDone) {
            toast.success('Your profile is updated');
        }
        else {
            toast.error('Failed to update profile!');
        }
    }

    return (
        <div>
            <input type="checkbox" id="profile-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="profile-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-semibold text-base text-warning mb-3">***Profile Photo is required</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className=''>
                        <div className="form-control w-full">
                            <span className="font-medium text-sm mb-1">Profile Photo</span>
                            <input
                                type="file"
                                placeholder=""
                                className="input input-bordered w-full"
                                {...register("photo", {
                                    /*required: {
                                        value: true,
                                        message: "Profile Photo is required!"
                                    }*/
                                })}
                            />
                            <label className="label">
                                {/* {errors.photo?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>} */}
                            </label>
                        </div>

                        {/* <div className="form-control w-full">
                            <span className="font-medium text-sm mb-1">Full Name</span>
                            <input
                                type="text"
                                placeholder=""
                                defaultValue={currentUser?.name}
                                className="input input-bordered w-full"
                                {...register("name", {
                                    /* required: {
                                        value: true,
                                        message: "Name is required!"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>}
                            </label>
                        </div> */}

                        <div className="form-control w-full">
                            <span className="font-medium text-sm mb-1">Email</span>
                            <input
                                type="email"
                                placeholder=""
                                value={user?.email}
                                className="input input-bordered w-full"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required!"
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: "Provide a valid email!"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <span className="font-medium text-sm mb-1">Bio</span>
                            <input
                                type="text"
                                placeholder=""
                                defaultValue={currentUser?.bio}
                                className="input input-bordered w-full"
                                {...register("bio", {
                                    maxLength: {
                                        value: 35,
                                        message: 'Maximum length 25',
                                    }
                                    /* required: {
                                        value: true,
                                        message: "Bio is required!"
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: "Provide a valid email!"
                                    } */
                                })}
                            />
                            <label className="label">
                                {errors.bio?.type === 'maxLength' && <span className="label-text-alt text-red-600">{errors.bio.message}</span>}
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <span className="font-medium text-sm mb-1">University/College</span>
                            <input
                                type="text"
                                placeholder=""
                                defaultValue={currentUser?.education}
                                className="input input-bordered w-full"
                                {...register("education", {
                                    /* required: {
                                        value: true,
                                        message: "University/College is required!"
                                    } */
                                })}
                            />
                            <label className="label">
                                {/* {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>} */}
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <span className="font-medium text-sm mb-1">LinkedIn Profile</span>
                            <input
                                type="text"
                                placeholder="Enter you linkedIn profile link"
                                defaultValue={currentUser?.education}
                                className="input input-bordered w-full"
                                {...register("linkedIn", {
                                    /* required: {
                                        value: true,
                                        message: "University/College is required!"
                                    } */
                                })}
                            />
                            <label className="label">
                                {/* {errors.linkedIn?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>} */}
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <span className="font-medium text-sm mb-1">Phone Number</span>
                            <input
                                type="text"
                                placeholder=""
                                defaultValue={currentUser?.phone}
                                className="input input-bordered w-full"
                                {...register("phone", {
                                    /* required: {
                                        value: true,
                                        message: "Phone number is required!"
                                    } */
                                })}
                            />
                            <label className="label">
                                {/* {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>} */}
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <span className="font-medium text-sm mb-1">Address/Location</span>
                            <input
                                type="text"
                                placeholder=""
                                defaultValue={currentUser?.address}
                                className="input input-bordered w-full"
                                {...register("address", {
                                    /* required: {
                                        value: true,
                                        message: "Address is required!"
                                    } */
                                })}
                            />
                            <label className="label">
                                {/* {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>} */}
                            </label>
                        </div>

                        <input className='btn btn-accent text-[16px] font-medium w-full' type="submit" value='Update' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;