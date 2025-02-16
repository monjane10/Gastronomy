import React from 'react'
import styles from './page.module.css'
import Dessert from '../../../public/imgs/homePage/dessert'
import Vegetable from '../../../public/imgs/homePage/vegetable'
import NaturalFood from '../../../public/imgs/homePage/naturalFood'
import {FaInstagram, FaFacebookSquare, FaWhatsapp, FaMapMarkerAlt} from 'react-icons/fa'
export default function Home() {
    return (
        <div className={styles.pageContainer}>
            <section>
                <h1>Bem-Vindo ao Gastronomy-Restaurant</h1>
                <p>Olá e bem-vindo ao nosso cantinho  especial de culinária italiana.,
                    onde a tradição italiana dança com a criatividade moderna
                    para lhe proporcionar uma experiência gastronómica única.
                    Connosco, cada prato é um abraço de sabor,
                    concebido com amor e dedicação para tornar
                    cada um dos seus dias inesquecível.</p>
            </section>

            <section className={styles.foodSection}>
                <div>
                    <i><Dessert /></i>
                    <h4>Excelência no Dia a Dia</h4>
                    <p>
                        Descubra a nossa seleção diária de pratos únicos para adicionar
                        um toque fresco e refinado à sua mesa.
                    </p>
                </div>

                <div>
                    <i><Vegetable /></i>
                    <h4>Ingredientes de Primeira Escolha</h4>
                    <p>Selecionamos cuidadosamente ingredientes excepcionais para garantir a mais alta qualidade nos seus pratos favoritos.</p>
                </div>

                <div>
                    <i><NaturalFood /></i>
                    <h4>Sabor para Todos</h4>
                    <p>Explore um mundo de sabores com a nossa oferta abrangente, concebida para satisfazer os paladares de toda a família, desde as entradas até às sobremesas.</p>
                </div>
            </section>

            <section className={styles.contactSection}>
                <h1>Mantenha-te actualizado!</h1>
                <p>
                    Entre no mundo do Gastronomy-Restaurant seguindo-nos nas redes sociais.
                    Fique sempre atualizado sobre as nossas criações culinárias, eventos especiais
                    e surpresas gourmet. Não perca nem uma única mordida!
                </p>
                <div className={styles.socialButtonsContainer}>
                    <button className={styles.socialButton}><FaInstagram /> Instagram</button>
                    <button className={styles.socialButton}><FaFacebookSquare /> Facebook</button>
                    <button className={styles.socialButton}><FaWhatsapp /> Whatsapp</button>
                    <button className={styles.socialButton}><FaMapMarkerAlt />Location</button>
                </div>
            </section>
        </div>
    )
}