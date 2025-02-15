import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import styles from './page.module.css'
export default function Auth() {
    const [formType, setFormType] = useState('login')
    const [formData, setFormData] = useState(null)

    const handleChangeFormType = () => {
        setFormData(null)
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

    const handleSubmitForm = (e) => {
        e.preventDefault()
        switch (formType) {
            case 'login':
                // login
                break
            case 'signup':
                if (formData.password !== formData.confirmpassword) {
                    alert('As senhas não coincidem')
                    return

                }
                break
            default:
                break
        }
    }


    if (formType === 'login') {
        return (
            <div className={styles.authPageContainer}>
                <div>
                    <h1>Login</h1>
                    <button onClick={handleChangeFormType} >Ainda não tens uma conta? Clique aqui</button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField
                            required
                            label="Email"
                            type='email'
                            name='email'
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Password"
                            type='password'
                            name='password'
                            onChange={handleFormDataChange}
                        />

                        <Button type='submit'>Entrar</Button>

                    </form>
                </div>
            </div>
        )
    }

    if (formType === 'signup') {
        return (
            <div className={styles.authPageContainer}>
                <div>
                    <h1>Cadastro</h1>
                    <button onClick={handleChangeFormType}> Já tem uma conta?  Clique aqui</button>

                    <form onSubmit={handleSubmitForm}>
                        <TextField
                            required
                            label="Nome completo"
                            type='fullname'
                            name='fullname'
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Email"
                            type='email'
                            name='email'
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Senha"
                            type='password'
                            name='password'
                            onChange={handleFormDataChange}
                        />

                        <TextField
                            required
                            label="Confirmar senha"
                            type='password'
                            name='confirmpassword'
                            onChange={handleFormDataChange}
                        />


                        <Button type='submit'>Registar</Button>

                    </form>
                </div>
            </div>
        )
    }
}



