import React, { useEffect, useState } from 'react';
import platesServices from '../../services/plates';
import Loading from '../loading/page';
import PlateCard from '../../components/plateCard/plateCard';
import PlatePopup from '../../components/platePopup/platePopup';
import styles from './page.module.css';

export default function Pratos() {
    const { getAvailablePlates, platesList, platesLoading, refetchPlates } = platesServices();
    const [plateSelected, setPlateSelected] = useState(null);

    useEffect(() => {
        if (refetchPlates) {
            getAvailablePlates();
        }
    }, [refetchPlates]);

    const handlePlateSelected = (plate) => {
        setPlateSelected(plate);
    }

    const handleClosePopup = () => {
        handlePlateSelected(null);
    }

    if (platesLoading) {
        return <Loading />;
    }

    console.log(platesList);

    return (
        <>
            <div>
                {platesList.map((plate) => (
                    <div key={plate._id} className={styles.CardContainer} onClick={() => { handlePlateSelected(plate) }}>
                        <PlateCard plateData={plate} />
                    </div>

                ))}
            </div>

            {plateSelected && (
                <PlatePopup plate={plateSelected} onClose={handleClosePopup} />
            )}

        </>
    );
}
