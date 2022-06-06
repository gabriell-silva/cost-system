import Styles from '../Container/container.module.css'

const Container = ({children, customClass}) => {
    return (
        <div className={`${Styles.Container} ${Styles[customClass]}`}>
            {children}
        </div>
    )
}

export default Container