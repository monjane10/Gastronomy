import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authServices from '../../services/auth'
import orderServices from '../../services/order'
import styles from './page.module.css'

export default function Profile() {
    const { logout } = authServices()
    const { getUserOrders, orderLoading, refetchOrders, ordersList } = orderServices()
    const navigate = useNavigate()

    const [authData, setAuthData] = useState(() => {
        return JSON.parse(localStorage.getItem('auth')) || null
    })

    useEffect(() => {
        if (!authData) {
            navigate('/auth');
        } else if (refetchOrders) {
            getUserOrders(authData?.user?._id);
        }

        return () => { }
    }, [authData, refetchOrders]);

    if (orderLoading) {
        return (
            <h1>Loading...</h1>
        )
    }


    const handleLogout = () => {
        logout()
        setAuthData(null)
        navigate('/auth')
    }

    console.log(ordersList)

    return (
        <>
            <h1>{authData?.user?.name}</h1>
            <h3>{authData?.user?.email}</h3>
            <button onClick={handleLogout}>Sair</button>

            <div>

            </div>

            {ordersList.length > 0 ? (
                <div className={styles.ordersContainer}>
                    {ordersList.map((order) => (
                        <div key={order._id} className={styles.orderContainer}>
                            <h3>Estado:{order.pickupStatus}</h3>
                            <h3>Hora de levantamento:{order.pickupTime}</h3>
                            {order.orderItems.map((item) =>(
                                <div key={item._id}>
                                    <h3>Produto: {item.itemDetails[0].name}</h3>
                                    <p>Quantidade: {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    Ainda não tens pedidos
                </div>
            )}

        </>
    )
}
