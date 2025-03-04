import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { LuLogIn } from "react-icons/lu";
import styles from './page.module.css'
import authServices from '../../services/auth'

export default function Auth() {
    const [formType, setFormType] = useState('login')
    const [formData, setFormData] = useState({}) 
    const { login, signup, authLoading } = authServices()
    const navigate = useNavigate()

    const authData = JSON.parse(localStorage.getItem('auth'))

    useEffect(() => {
        if (authData){
            return navigate('/profile')
        }
    }, [authData])

    const handleChangeFormType = () => {
        setFormData({});  
        if (formType === 'login') {
            setFormType('signup')
        } else {
            setFormType('login')
        }
    }

    const handleFormDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    if (authLoading) {
        return <h1>Carregando...</h1>
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        switch (formType) {
            case 'login':
                login(formData)
                break
            case 'signup':
                if (formData.password !== formData.confirmpassword) {
                    alert('As senhas não coincidem')
                    return
                }
                signup(formData)
                break
            default:
                break
        }
    }

    return (
        <div className={styles.authPageContainer}>
            {formType === 'login' ? (
                <>
                    <h3>Bem-Vindo</h3>
                    <button onClick={handleChangeFormType}>Ainda não tem uma conta? Clique aqui</button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField
                            required
                            label="Email"
                            type='email'
                            name='email'
                            value={formData.email || ''} 
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Password"
                            type='password'
                            name='password'
                            value={formData.password || ''} 
                            onChange={handleFormDataChange}
                        />
                        <button type='submit'>Entrar<LuLogIn /></button>
                    </form>
                </>
            ) : formType === 'signup' ? (
                <>
                    <h3>Crie a sua conta!</h3>
                    <button onClick={handleChangeFormType}>Já tem uma conta? Clique aqui</button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField
                            required
                            label="Nome completo"
                            type='fullname'
                            name='fullname'
                            value={formData.fullname || ''} 
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Email"
                            type='email'
                            name='email'
                            value={formData.email || ''}
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Senha"
                            type='password'
                            name='password'
                            value={formData.password || ''}
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Confirmar senha"
                            type='password'
                            name='confirmpassword'
                            value={formData.confirmpassword || ''} 
                            onChange={handleFormDataChange}
                        />
                        <button type='submit'>Registar<LuLogIn /></button>
                    </form>
                </>
            ) : null}
        </div>
    )
}
