import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import ProfileModal from './ProfileModal';

const Dashboard = ({ profile, setProfile }) => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);

    return (
        <div className='mx-auto max-w-screen-xl'>
            <div className="drawer drawer-mobile">
                <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <h1 className='font-bold text-3xl text-secondary text-center bg-slate-100 p-5 rounded-t-xl'>Welcome to Your Dashboard</h1>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                    <ul className="menu pr-2 overflow-y-auto w-60 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li className='mb-2 rounded-lg'><Link to='/dashboard'>My Profile</Link></li>
                        {
                            !admin && <>
                                <li className='mb-2 rounded-lg'><Link to='/dashboard/review'>Add A Review</Link></li>
                                <li className='mb-2 rounded-lg'><Link to='/dashboard/my-orders'>My Orders</Link></li>
                            </>
                        }
                        {admin && <>
                            <li className='mb-2 rounded-lg'><Link to='/dashboard/make-admin'>Make Admin</Link></li>
                            <li className='mb-2 rounded-lg'><Link to='/dashboard/add-product'>Add A Product</Link></li>
                            <li className='mb-2 rounded-lg'><Link to='/dashboard/manage-orders'>Manage All Orders</Link></li>
                            <li className='mb-2 rounded-lg'><Link to='/dashboard/manage-products'>Manage Products</Link></li>
                        </>}
                    </ul>
                </div>
            </div>

            <ProfileModal
                profile={profile}
                setProfile={setProfile}
            />
        </div>
    );
};

export default Dashboard;