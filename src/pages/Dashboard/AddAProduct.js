import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddAProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imgStorageKey = 'c54b517a18342b185ccce5b0e03d65c9';

    let sell = 0;

    const onSubmit = async data => {
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const product = {
                        img: img,
                        name: data.name,
                        category: data.category,
                        price: data.price,
                        quantity: data.quantity,
                        available: data.available,
                        description: data.description,
                        sell: sell,
                    }
                    // send to your database 
                    fetch('https://infinite-stream-10391.herokuapp.com/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('YAY! Profile update successfully.')
                                reset();
                            }
                            else {
                                toast.error('Oops! Failed to update the profile.');
                            }
                        })

                }

            })
    }

    const category = [
        '', '', '', 'RAM', 'ROM',
    ];

    return (
        <div className='bg-slate-50 rounded-b-xl p-5 mb-2'>
            <div className='pb-4 flex justify-between items-center'>
                <h1 className='text-2xl'>Add Product</h1>
            </div>
            <div className="bg-base-100 w-full md:w-1/2 mx-auto p-5 shadow-xl rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className=''>
                    <div className="form-control w-full">
                        <span className="font-medium text-sm mb-1">Product Photo</span>
                        <input
                            type="file"
                            placeholder=""
                            className="input input-bordered w-full"
                            {...register("photo", {
                                required: {
                                    value: true,
                                    message: "Product photo is required!"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.photo?.type === 'required' && <span className="label-text-alt text-red-600">{errors.photo.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full">
                        <span className="font-medium text-sm mb-1">Product Name</span>
                        <input
                            type="text"
                            placeholder="Type product's name"
                            className="input input-bordered w-full"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Product name is required!"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full">
                        <span className="font-medium text-sm mb-1">Category</span>
                        <select
                            className="select select-bordered font-normal text-base w-full"
                            {...register("category")}>
                            <option value="Processor">Processor</option>
                            <option value="Motherboard">Motherboard</option>
                            <option value="Graphics Card">Graphics Card</option>
                            <option value="RAM">RAM</option>
                            <option value="ROM">SSD</option>
                            <option value="ROM">Optical Disk Drive</option>
                        </select>
                        <label className="label">
                            {/* {errors.category?.type === 'required' && <span className="label-text-alt text-red-600">{errors.price.message}</span>} */}
                        </label>
                    </div>

                    <div className="form-control w-full">
                        <span className="font-medium text-sm mb-1">Unit Price</span>
                        <input
                            type="text"
                            placeholder="Type product's price"
                            className="input input-bordered w-full"
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: "Price is required!"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.price?.type === 'required' && <span className="label-text-alt text-red-600">{errors.price.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full">
                        <span className="font-medium text-sm mb-1">Minimum Order Quantity</span>
                        <input
                            type="text"
                            placeholder="Type product's order quantity (min)"
                            className="input input-bordered w-full"
                            {...register("quantity", {
                                required: {
                                    value: true,
                                    message: "Minimum quantity is required!"
                                },
                            })}
                        />
                        <label className="label">
                            {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-600">{errors.quantity.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full">
                        <span className="font-medium text-sm mb-1">Available/In Stock</span>
                        <input
                            type="text"
                            placeholder="Type product's in stock"
                            className="input input-bordered w-full"
                            {...register("available", {
                                required: {
                                    value: true,
                                    message: "Available product quantity is required!"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.available?.type === 'required' && <span className="label-text-alt text-red-600">{errors.available.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full">
                        <span className="font-medium text-sm mb-1">Product Description</span>
                        <textarea
                            type="text"
                            placeholder="Type product's description"
                            className="textarea textarea-bordered h-24 w-full"
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: "Description is required!"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.description?.type === 'required' && <span className="label-text-alt text-red-600">{errors.description.message}</span>}
                        </label>
                    </div>

                    <input className='btn btn-primary text-[16px] font-semibold text-white w-full' type="submit" value='Add' />
                </form>
            </div>
        </div>
    );
};

export default AddAProduct;