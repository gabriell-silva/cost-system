import { Link } from 'react-router-dom'
import Styles from './projectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import formatMoney from '../../utils/formatMoney'

const ProjectCard = ({ id, name, budget, category, handleRemove }) => {
    
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }
    
    return (
        <div className={Styles.Container}>
            <h4>{name}</h4>
            
            <p>
                <span>Orçamento:</span> {formatMoney.format(budget)}
            </p>
            
            <p className={Styles.Category_text}>
                <span className={`${Styles[category.toLowerCase()]}`}></span> {category}
            </p>
                            
            <div className={Styles.Actions}>
                <Link to={`/project/${id}`}> <BsPencil />Editar</Link>
                <button onClick={remove}><BsFillTrashFill/> Remover</button>
            </div>
        </div>
    )
}

export default ProjectCard