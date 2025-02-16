import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authServices from '../../services/auth'

export default function Profile() {
    const { logout } = authServices()
    const navigate = useNavigate()
    
    const [authData, setAuthData] = useState(() => {
        return JSON.parse(localStorage.getItem('auth')) || null
    })

    useEffect(() => {
        if (!authData) {
            navigate('/auth') 
        }
    }, [authData]) 

    const handleLogout = () => {
        logout()
        setAuthData(null) 
        navigate('/auth') 
    }

    return (
        <>
            <h1>{authData?.user?.name}</h1>
            <h3>{authData?.user?.email}</h3>
            <button onClick={handleLogout}>Sair</button>
        </>
    )
}
