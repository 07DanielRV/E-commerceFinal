import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { filterProductsCategoryThunk, filterProductsHeadlineThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch()
    const productsList = useSelector(state => state.products)
    const [categories, setCategories] = useState([])
    const [productsSearch, setProductsSearch] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
            .then(res => setCategories(res.data))
    }, [])

    return (
        <div>
            <Row>
                {/* Categorias*/}
                <Col md={2}>

                    <ListGroup>

                        {
                            categories.map(category => (
                                <ListGroup.Item
                                    onClick={() => dispatch(filterProductsCategoryThunk(category.id))}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {category.name}
                                </ListGroup.Item >

                            ))
                        }
                    </ListGroup>
                </Col>
                {/*Contenido */}
                <Col md={10}>
                    <h1>Home</h1>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={productsSearch}
                            onChange={e => setProductsSearch(e.target.value)}
                        />
                        <Button
                            onClick={() => dispatch(filterProductsHeadlineThunk(productsSearch))}
                            variant="outline-secondary" id="button-addon2">
                        </Button>
                    </InputGroup>

                    <ul>
                        <Row xs={1} md={2} lg={3} className="g-4" >
                            {productsList.map(products => (
                                <Col>
                                    <Card>
                                        <Link to={(`/product/${products.id}`)} style={{ textDecoration: 'none' }}>
                                            <Card.Body>
                                                <Card.Title>{products.title}</Card.Title>
                                                <Card.Img variant="top" src={products.images[0].url} style={{ height: 200, objectFit: 'contain' }} />
                                                <Card.Text>
                                                    {products.price}
                                                </Card.Text>
                                            </Card.Body>
                                        </Link>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </ul>
                </Col>
            </Row>


        </div>
    );
};

export default Home;