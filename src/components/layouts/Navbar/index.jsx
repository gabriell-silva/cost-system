import { Link } from "react-router-dom"
import Styles from '../Navbar/navbar.module.css'
import logo from '../../../img/costs_logo.png'

const Navbar = () => {
    return (
        <nav className={Styles.Navegation}>
                <Link to='/'>
                    <img src={logo} alt="Costs" />
                </Link>
                <ul className={Styles.list}>
                    <li className={Styles.item}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className={Styles.item}>
                        <Link to='/projects'>Projetos</Link>
                    </li>
                    <li className={Styles.item}>
                        <Link to='/company'>Empresa</Link>
                    </li>
                    <li className={Styles.item}>
                        <Link to='/contact'>Contato</Link>
                    </li>
                </ul>
        </nav>
    )
}

export default Navbar