import styles from './plateCard.module.css';
import React from 'react';

export default function PlateCard({ plateData }) {
    return (
        <>
            <div className={styles.plateCardContainer}>
                <img src={plateData.imgUrl} alt="" />
                <div className={styles.plateCardContent}>
                    <h4>{plateData.name}</h4>
                    <h3 className={styles.price}>{plateData.price}Mzn</h3>
                </div>

            </div>
        </>
    )
}
