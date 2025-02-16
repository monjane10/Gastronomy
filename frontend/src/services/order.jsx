import { useState } from 'react'; // Adicione esta linha


export default function orderServices() {
    const [orderLoading, setOrderLoading] = useState(false)
    const [refetchOrders, setRefetchOrders] = useState(true)
    const [ordersList, setOrdersList] = useState([])


    const url = "http://localhost:3000/orders"

    const getUserOrders = async (userId) => {
        setOrderLoading(true)
        fetch(`${url}/${userId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success){
                setOrdersList(result.body)
            } else {
                console.log(result)
            }
   
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setOrderLoading(false)
            setRefetchOrders(false)
        })

    }
    return {
       getUserOrders,
       orderLoading,
       refetchOrders,
       ordersList
    }
}