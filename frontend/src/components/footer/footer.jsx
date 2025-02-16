import styles from './footer.module.css'
import {Link} from "react-router-dom";

export default function footer () {
    return (
        <div className="footer">
            <footer className={styles.footerContainer}>
                <img src="./imgs/logo.png" alt="logotipo" />
                <div>
                    <h2>Links Importantes</h2>
                    <div className={styles.footerLinksContainer}>
                        <Link className={styles.footerLinks} to={"/"}>Home</Link>
                        <Link className={styles.footerLinks} to={"/plates"}>Pratos</Link>
                        <Link className={styles.footerLinks} to={"/profile"}>Perfil</Link>
                    </div>
                </div>
                <div>
                    Criado por Lourenço Monjane. 
                    <a href="https://lourencomonjane.vercel.app" target='_blank' className={styles.a}>  Portiólio</a>
                </div>
            </footer>
        </div>
    )
}

