import React from 'react'
import { useCartContext } from '../../contexts/useCartContext';
import { CiCircleMinus } from "react-icons/ci";
import styles from './page.module.css';
export default function Cart() {

    const { cartItems } = useCartContext();

    console.log(cartItems);
    if (!cartItems.length) {
        return (
            <div >
                <h1>O teu carrinho está vazio!!!</h1>
                <button>Veja nossas especialidades.</button>
            </div>
        )

    }

    return (
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
                                        <button>-</button>
                                        <button>+</button>
                                    </div>
                                </div>
                                <button><CiCircleMinus />Remover Item</button>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </section>

            <button className={styles.confirmButton}>Confirmar pedido</button>
        </div>
    )
}