import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import Styles from './footer.module.css'

const Footer = () => {
    return (
        <footer className={Styles.Container}>
            <ul className={Styles.social_list}>
                <li><FaFacebook/></li>
                <li><FaInstagram/></li>
                <li><FaLinkedin/></li>
            </ul>
            <p className={Styles.copy_right}>
                <span>Costs</span> &copy; 2022
            </p>
        </footer>
    )
}

export default Footer