import { Link } from 'react-router-dom'
import Styles from './LinkButton.module.css'

const LinkButton = ( { to, text } ) => {
    return (
        <Link to={to} className={Styles.button}>
            { text }
        </Link>
    )
}

export default LinkButton