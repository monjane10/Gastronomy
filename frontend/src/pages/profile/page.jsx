import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuLogOut, LuTimer,  LuCircleCheck, LuTriangleAlert  } from "react-icons/lu";
import { Link } from 'react-router-dom';
import Loading from '../loading/page'

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
            <Loading />
        )
    }


    const handleLogout = () => {
        logout()
        setAuthData(null)
        navigate('/auth')
    }

    console.log(ordersList)

    return (
        <div className={styles.pageContainer}>
            <div >
            <h1>{authData?.user?.name}</h1>
            <h3>{authData?.user?.email}</h3>
            </div>
            <button onClick={handleLogout}>Sair<LuLogOut /></button>

            <div>

            </div>

            {ordersList.length > 0 ? (
                <div className={styles.ordersContainer}>
                    {ordersList.map((order) => (
                        <div key={order._id} className={styles.orderContainer}>
                            {order.pickupStatus.toLowerCase() === 'pendente' ? <p className={`${styles.pickupStatus} ${styles.pending}`}><LuTimer />{order.pickupStatus}</p> : null}                         
                            {order.pickupStatus.toLowerCase() === 'concluido' ? <p className={`${styles.pickupStatus} ${styles.completed}`}><LuCircleCheck />{order.pickupStatus}</p> : null}                         
                            {order.pickupStatus.toLowerCase() === 'cancelado' ? <p className={`${styles.pickupStatus} ${styles.canceled}`}><LuTriangleAlert />{order.pickupStatus}</p> : null}                     
                            <h3>{order.pickupTime}</h3>
                            {order.orderItems.map((item) =>(
                                <div key={item._id}>
                                    <h3>{item.itemDetails[0].name}</h3>
                                    <p>Quantidade: {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    Ainda não tens pedidos.
                    <Link to={'/plates'} className={styles.platesLink}>Clica aqui e veja os nossas especialidades</Link>
                </div>
            )}

        </div>
    )
}
