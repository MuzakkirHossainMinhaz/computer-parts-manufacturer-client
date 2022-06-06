import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {
    const { _id, img, name, category, price, quantity, available, description } = product;
    const navigate = useNavigate();

    const purchase = () => {
        navigate(`/purchase/${_id}`);
    }

    return (
        <div className="card card-compact max-w-lg bg-base-100 shadow-xl rounded-lg">
            <figure>
                <img className='w-full' src={img} alt="Shoes" />
            </figure>
            <div className="card-body">
                <div className='card-title flex justify-between'>
                    <div className=''>
                        <h2 className="">{name}</h2>
                        <small className='text-xs bg-accent px-1 py-[2px] rounded text-white'>{category}</small>
                    </div>
                    <h2>${price}</h2>
                </div>
                <p className='max-h-[40px] overflow-hidden'>{description}</p>
                <div className='font-semibold text-md flex justify-between mt-2'>
                    <h3>Minimum Oder Quantity: {quantity} pcs</h3>
                    <h3>Available: {available} pcs</h3>
                </div>
                <div className="card-actions justify-end">
                    <button
                        onClick={purchase}
                        className="btn btn-primary bg-blue-600 px-7 w-full border-0">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;