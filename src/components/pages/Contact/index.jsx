import { BsGithub } from "react-icons/bs";
import { FaDev } from "react-icons/fa";
import Container from "../../layouts/Container";
import Styles from './contact.module.css'

export default function Contact() {
    return (
        <div className={Styles.Container}>
            <h1>Contato empresa</h1>
            <Container customClass="column">
                <div>
                    <p>
                        <BsGithub/> 
                        <span> github: gabriell-silva</span>
                    </p>
                    <p>
                        <FaDev size={18} />
                        <span>Desenvolvido por gabriell-silva</span>
                    </p>
                </div>
            </Container>
        </div>
    )
}