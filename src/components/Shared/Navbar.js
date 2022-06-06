import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from './Loading';

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const { data: users, isLoading } = useQuery('users', () => fetch('https://infinite-stream-10391.herokuapp.com/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />;
    }

    const currentUser = users?.find(u => u?.email === user?.email);

    const signout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }

    const menu1Items = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/blogs'>Blogs</Link></li>
        {/* <li><Link to='/purchase'>Purchase</Link></li> */}
        <li><Link to='/my-portfolio'>My Portfolio</Link></li>
    </>
    const menu2Items = <>
        <>{user ? <>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            <li className="dropdown dropdown-end p-0 m-0">
                <div tabIndex="0" className="avatar">
                    {
                        currentUser?.img &&
                        <div className="w-6 mask mask-squircle">
                            <img src={currentUser?.img} />
                        </div>
                    }
                    {
                        <p>{user?.displayName}</p>
                    }
                </div>
            </li>
            <li><button onClick={signout} className="btn btn-ghost font-medium w-full">Sign Out</button></li>

        </>
            : <li><Link to='/login'>Login</Link></li>}</>
    </>

    return (
        <div className="navbar bg-slate-200 my-2 rounded-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost btn-circle lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menu1Items}
                    </ul>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menu1Items}
                    </ul>
                </div>
            </div>

            <div className="navbar-center">
                <Link to='/' className="btn btn-ghost normal-case text-2xl">Computer Parts Manufacturer</Link>
            </div>

            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex="0" className="btn btn-ghost btn-circle lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menu2Items}
                    </ul>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menu2Items}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;