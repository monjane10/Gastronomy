import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (itemToAdd) => {
        const checkItemAlready = cartItems.find((cartItem) => cartItem._id === itemToAdd._id);
    
        if (!checkItemAlready) {
            setCartItems([...cartItems, { ...itemToAdd, quantity: 1 }]); // Adiciona ao carrinho com quantidade inicial 1
            alert("Item adicionado ao carrinho");
        } else {
            alert("O item já está no carrinho");
        }
    };
    
    const removeFromCart = (itemId) => {
        const cartItemsSanitized =  cartItems.filter((item) =>{
            return item._id !== itemId; // Remove o item do carrinho
        })
        setCartItems(cartItemsSanitized);
    }

      
    const updateCartItems = (items) => {
        setCartItems(items)
        
    }

    return (
        <CartContext.Provider value={{removeFromCart, addToCart, cartItems, updateCartItems}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Você está tentando usar o contexto de carrinho fora do seu provedor");
    }

    return context;
}
