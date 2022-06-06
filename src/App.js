import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Shared/Footer';
import Navbar from './components/Shared/Navbar';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import RequireAuth from './pages/Authentication/RequireAuth';
import RequireAdmin from './pages/Authentication/RequireAdmin';
import Blogs from './pages/Blogs/Blogs';
import Dashboard from './pages/Dashboard/Dashboard';
import MyOrders from './pages/Dashboard/MyOrders';
import MyProfile from './pages/Dashboard/MyProfile';
import AddReviews from './pages/Dashboard/AddReviews';
import Home from './pages/Home/Home';
import Purchase from './pages/Purchase/Purchase';
import Reviews from './pages/Reviews/Reviews';
import ManageAllOrders from './pages/Dashboard/ManageAllOrders';
import MakeAdmin from './pages/Dashboard/MakeAdmin';
import AddAProduct from './pages/Dashboard/AddAProduct';
import ManageProducts from './pages/Dashboard/ManageProducts';
import Portfolio from './pages/Portfolio/Portfolio';
import NotFound from './components/Shared/NotFound';
import Payment from './pages/Dashboard/Payment';
import Contact from './pages/Contact/Contact';
import Products from './pages/AllProducts.js/Products';

function App() {

  return (
    <div className=" lg:max-w-screen-xl mx-auto px-2 lg:px-0">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/blogs' element={<Blogs />}></Route>
        <Route path='/reviews' element={<Reviews />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/my-portfolio' element={<Portfolio />}></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth>
            <Purchase />
          </RequireAuth>
        }></Route>
        <Route path='/payment/:id' element={
          <RequireAuth>
            <Payment />
          </RequireAuth>
        }></Route>
        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }>
          <Route index element={<MyProfile />} />
          <Route path='review' element={<AddReviews />} />
          <Route path='my-orders' element={<MyOrders />} />
          <Route path='manage-orders' element={<RequireAdmin><ManageAllOrders /></RequireAdmin>} />
          <Route path='make-admin' element={<RequireAdmin><MakeAdmin /></RequireAdmin>} />
          <Route path='add-product' element={<RequireAdmin><AddAProduct /></RequireAdmin>} />
          <Route path='manage-products' element={<RequireAdmin><ManageProducts /></RequireAdmin>} />
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/*' element={<NotFound />}></Route>
      </Routes>
      <Footer></Footer>

      <ToastContainer />

    </div>
  );
}

export default App;
