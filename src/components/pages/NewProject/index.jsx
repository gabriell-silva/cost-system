import { useNavigate } from 'react-router-dom'
import { api } from '../../../services/api'
import ProjectForm from '../../ItemsProject/ProjectForm'
import Styles from './newProject.module.css'

const NewProject = () => {

    const navigate = useNavigate()

    const createPost = (project) => {
        //initialize cost and services

        project.cost = 0
        project.services = []

        fetch(`${api.baseURL}/projects`, {
            method: "POST",
            headers: api.headers,
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                //redirect
                navigate('/projects', { state: { message: 'Adicionado com sucesso'}})
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className={Styles.Container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject