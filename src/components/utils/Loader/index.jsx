import loading from '../../../img/loading.svg'
import Styles from './loader.module.css'

const Loader = () => {
    return (
        <div className={Styles.Container}>
            <img src={loading} alt="Loading" className={Styles.loader} />
        </div>
    )
}

export default Loader