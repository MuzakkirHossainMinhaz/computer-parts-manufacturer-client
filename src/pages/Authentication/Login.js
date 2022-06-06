import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import useToken from '../../../hooks/useToken';
import Loading from '../../components/Shared/Loading';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';

const Login = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [token] = useToken(user || googleUser);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate])

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    }

    if (loading || googleLoading) {
        return <Loading />;
    }

    let signInError;
    if (error || googleError) {
        signInError = <small className='text-red-600'>{error?.message || googleError?.message}</small>
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="mb-2 font-semibold text-xl text-center">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder=""
                                className="input input-bordered w-full max-w-xs"
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
                                {/* {errors.email?.type === 'required' && <span className="label-text-alt text-red-600 tooltip tooltip-open tooltip-bottom align-middle" data-tip={errors.email.message}></span>} */}
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder=""
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required!"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "At least 6 characters or longer!"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt  text-red-600">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt  text-red-600">{errors.password.message}</span>}
                            </label>
                        </div>

                        <div className='text-center'>
                            {signInError}
                        </div>

                        <input className='btn btn-accent text-base font-normal w-full max-w-xs' type="submit" value='Login' />
                    </form>

                    <p className='text-xs text-center mt-2'>New to Doctors Portal? <Link className='text-secondary' to='/register'>Create new account</Link></p>

                    {/* <div>
                        <label className='text-start text-sm'>Email</label>
                        <input type="email" placeholder="" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label className='text-start text-sm'>Password</label>
                        <input type="password" placeholder="" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <p className='text-[10px]'>Forgot Password ?</p>

                    <button className="btn btn-accent text-base font-normal">Login</button>

                    */}

                    <div className="divider">OR</div>

                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline btn-accent text-base font-normal">Continue with google</button>

                </div>
            </div>
        </div>
    );
};

export default Login;