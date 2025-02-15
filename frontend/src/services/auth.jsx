import { useState } from 'react'; // Adicione esta linha


export default function authServices() {
    const [authLoading, setAuthLoading] = useState(false)


    const url = "http://localhost:3000/auth"

    const login = async (formData) => {
        setAuthLoading(true)
        fetch(`${url}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(formData)
            
        })
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setAuthLoading(false)
        })

    }
  

    const logout = async () => {
        
    }

    const signup = async (formData) => {
        
    }

    return {
        login,
        logout,
        signup,
        authLoading
    }
}