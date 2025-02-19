import React, { useState } from 'react'
import { useCartContext } from '../../contexts/useCartContext';
import { CiCircleMinus } from "react-icons/ci";
import styles from './page.module.css';
import ConfirmOrderPopup from '../../components/confirmOrderPopup/confirmOrderPopup';
import orderServices from "../../services/order"
export default function Cart() {

    const { cartItems, updateCartItems, removeFromCart } = useCartContext();
    const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const { sendOrder } = orderServices()

    const handleChangeItemQty = (mode, itemId) => {
        const updatedCartItem = cartItems.map((item) => {
            if(item._id === itemId) {
                if (mode === 'less' && item.quantity > 1) {
                    item.quantity -= 1
                } else if (mode === 'more') {
                    item.quantity += 1
                }
            }
            return item
        })

        updateCartItems(updatedCartItem)

    }

    const handleOpenPopup = (e) => {
        e.preventDefault()
        setConfirmPopupOpen(!confirmPopupOpen)
    }


    const handleConfirmOrder = (orderData) => {
        orderData.items = cartItems.map((item) => {
            return { plateId: item._id, quantity: item.quantity }
        })
        sendOrder(orderData)
        setConfirmPopupOpen(!confirmPopupOpen)
        clearCart()
    }

    //console.log(cartItems);
    if (!cartItems.length) {
        return (
            <div >
                <h1>O teu carrinho está vazio!!!</h1>
                <button>Veja nossas especialidades.</button>
            </div>
        )

    }

    return (
        <>
        <div className={styles.pageContainer}>
            <h1>Seus Itens:</h1>

            <section>
                <div className={styles.itemsListContainer}>
                    {cartItems.map((item) => (
                        <div key={item._id} className={styles.itemContainer}>
                            <img src={item.imgUrl} alt='' />
                            <div className={styles.itemContent}>
                                <h2>{item.name}</h2>
                                <p>[{item.ingredients.join(", ")}]</p>
                                <p>{item.description}</p>
                                <div className={styles.portionsContainer}>
                                    <h2>Porções:</h2>
                                    <h4>{item.quantity}</h4>
                                    <div className={styles.buttonsContainer}>
                                        <button onClick={() => handleChangeItemQty('less', item._id)}>-</button>
                                        <button onClick={() => handleChangeItemQty('more', item._id)}>+</button>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item._id)}><CiCircleMinus />Remover Item</button>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </section>

            <button className={styles.confirmButton} onClick={handleOpenPopup}>Confirmar pedido</button>
        </div>
        <ConfirmOrderPopup open={confirmPopupOpen} onClose={handleOpenPopup} onConfirm={handleConfirmOrder} />
        </>
)
}