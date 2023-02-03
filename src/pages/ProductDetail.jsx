import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { filterProductsCategoryThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

    const { id } = useParams()
    const [products, setProducts] = useState({})

    const productsList = useSelector(state => state.products)

    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    

    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}/`)
            .then(res => {
                setProducts(res.data)
                dispatch(filterProductsCategoryThunk(res.data.category.id))
            })
    }, [id])



    return (
        <div>
            <h1>{products.title}</h1>
            <Row>
                {/* Descripcion de la noticia */}
                <Col lg={9}>
                    <img src={products.images?.[0].url} alt="" className='img-fluid' />
                    <br />
                    <br />
                    <p>{products.description}</p>
                </Col>

                {/* Noticias relacionadas */}
                <Col lg={3}>

                    <ListGroup variant="flush">
                        
                        
                    {
                        productsList.map(productsItem => (
                            <ListGroup.Item>
                                <Link to={(`/product/${productsItem.id}`)}>
                                {productsItem.title}
                                
                                </Link>
                                </ListGroup.Item>
                            
                        ))
                    }
                    </ListGroup>


                </Col>
            </Row>




        </div>
    );
};

export default ProductDetail;