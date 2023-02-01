import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterProductsCategoryThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

    const {id} = useParams()
    const [products, setProducts] = useState({})

    const productsList = useSelector(state => state.products)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() =>{
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}/`)
        .then(res => {
            setProducts(res.data)
            dispatch(filterProductsCategoryThunk(res.data.category.id))
        })
    },[id])


    
    return (
        <div>
            <h2>{products.title}</h2>
            <img src={products.images?.[0].url} alt="" />
            <p>{products.description}</p>
            {
                productsList.map(productsItem => (
                    <li key={productsItem.id} onClick={() => navigate(`/product/${productsItem.id}`)}>
                        {productsItem.title}</li>
                ))
            }
           
            
            
        </div>
    );
};

export default ProductDetail;