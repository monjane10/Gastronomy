import React from 'react'
import { useCartContext } from '../../contexts/useCartContext';
export default function Cart() {

    const  {cartItems} = useCartContext();

    console.log(cartItems);
    return (
        <div>
            <h1>Carrinho</h1>
            <p>Home page content goes here</p>
        </div>
    )
}