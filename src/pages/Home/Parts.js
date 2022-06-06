import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../components/Shared/Loading';
import Card from './Card';

const Parts = () => {
    const { data: products, isLoading} = useQuery('products', () => fetch('https://infinite-stream-10391.herokuapp.com/products').then(res => res.json()));

    if (isLoading) {
        return <Loading />;
    }

    const newProducts = [...products].reverse();

    let items = [];

    // select six items for home page
    let count = 0;
    newProducts.map(product => {
        if (count < 6) {
            items.push(product);
            count++;
        }
    });

    return (
        <div className='mb-2 rounded-lg'>
            <h1 className='text-5xl font-black text-center uppercase text-blue-700 bg-blue-200 py-4 rounded-t-lg'>Our Products</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-blue-100 p-3 rounded-b-lg'>
                {
                    items.map(item => <Card
                        key={item._id}
                        product={item}
                    ></Card>)
                }
            </div>

        </div>
    );
};

export default Parts;