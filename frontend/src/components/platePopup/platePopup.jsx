import { Dialog } from "@mui/material";
import styles from './platePopup.module.css';

export default function PlatePopup({ plate, onClose, onAddToCart }) {
    return (
        <Dialog open={!!plate} onClose={onClose}>
            <div className={styles.platePopupContainer}>
                <img src={plate.imgUrl} alt="" />
                <div className={styles.platePopupContent}>
                    <h2>{plate.name}</h2>
                    <p className={styles.ingredients}>{String(plate.ingredients)}</p>
                    <p>{plate.description}</p>
                    <h2>{plate.price}Mzn</h2>
                    <button onClick={() => {onAddToCart(plate)}}>Adicionar ao carrinho</button>
                </div>
            </div>
        </Dialog>
    );
}

