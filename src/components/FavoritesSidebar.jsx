import React, { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const FavoritesSidebar = ({ show, handleClose }) => {

    const dispatch = useDispatch()

    const favorites = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])
    return (
        <Offcanvas placement='end' show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                <ul>

                    {favorites.map(favorite => (
                        <li key={favorite.id}>{favorite.purchases?.product.title}</li>
                    ))}

                </ul>
            </Offcanvas.Body>
        </Offcanvas>

    );
};

export default FavoritesSidebar;