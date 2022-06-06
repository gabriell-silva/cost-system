import Styles from './submitButton.module.css'

const SubmitButton = ({ text }) => {
    return (
        <div>
            <button className={Styles.button}>{text}</button>
        </div>
    )
}

export default SubmitButton