import React, { useEffect } from 'react';
import platesServices from '../../services/plates';
import Loading from '../loading/page';

export default function Pratos() {
    const { getAvailablePlates, platesList, platesLoading, refetchPlates } = platesServices();

    useEffect(() => {
        if (refetchPlates) {
            getAvailablePlates();
        }
    }, [refetchPlates]);

    if (platesLoading) {
        return <Loading />;
    }

    console.log(platesList);

    return (
        <div>
            <h1>Pratos</h1>
            <p>Conteúdo da página inicial vai aqui</p>
        </div>
    );
}
