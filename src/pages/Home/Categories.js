import React from 'react';
import { useQuery } from 'react-query';
import category_img from '../../assests/best_sell.png';
import Loading from '../../components/Shared/Loading';

const Categories = () => {
    const { data: products, isLoading} = useQuery('products', () => fetch('https://infinite-stream-10391.herokuapp.com/products').then(res => res.json()));

    if (isLoading) {
        return <Loading />;
    }

    // find distinct function
    const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
    }
    let items = [];
    products.map(product => items.push(product.category));

    // find distinct author
    items = items.filter(distinct);

    return (
        <div style={{
            background: `url(${category_img})`,
            backgroundSize: 'cover'
        }} className='rounded-lg mb-2 h-fit p-10'>
            <h1 className='text-[42px] font-black text-center uppercase text-blue-400 pb-3'>Categories</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    items.map((item, idx) => <div className="stats shadow" key={idx}>
                        <div className="stat">
                            <div className="stat-value">{item}</div>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default Categories;