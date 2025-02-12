import { text } from "express"

export const ok = (body) => {
    return    {
        success: true,
        status: 200,
        body: body
    }
}

export const notFound = () => {
    return    {
        success: false,
        status: 400,
        body: "Não encontrado"
    }
}

export const serverError = (error) => {
    return    {
        success: false,
        status: 400,
        body: error
    }
}

