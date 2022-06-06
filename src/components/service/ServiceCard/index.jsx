import Styles from '../../ItemsProject/ProjectCard/projectCard.module.css'
import { BsFillTrashFill } from 'react-icons/bs'
import formatMoney from '../../utils/formatMoney'

const ServiceCard = ({ id, name, cost, description, handleRemove }) => {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className={Styles.Container}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> {formatMoney.format(cost)}
            </p>
            <p>{description}</p>
            <div className={Styles.Actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard