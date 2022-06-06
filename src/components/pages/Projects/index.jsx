import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { api } from "../../../services/api"
import Container from "../../layouts/Container"
import LinkButton from '../../LinkButton'
import ProjectCard from "../../ItemsProject/ProjectCard"
import Loader from "../../utils/Loader"
import Message from "../../utils/Message"
import Styles from "./projects.module.css"

const Projects = () => {

    const [ projects, setProjects ] = useState([])
    const [ removeLoading, setRemoveLoading ] = useState(false)
    const [ projectMessage, setProjectMessage ] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch(`${api.baseURL}/projects`, {
                method: "GET",
                headers: api.headers
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
            }, 300)
        }, [])

    const removeProject = (id) => {
        fetch(`${api.baseURL}/projects/${id}`, {
            method: "DELETE",
            headers: api.headers
        })
            .then((resp) => resp.json())
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage('Projeto removido com sucesso')
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className={Styles.Container}>
            <div className={Styles.Container_Title}>
                <h1 className={Styles.Container_h1}>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Message type="sucess" msg={message}/>}
            {projectMessage && <Message type="error" msg={projectMessage}/>}
            <Container customClass="start">
                {projects.length > 0 && projects.map((project) => 
                    <ProjectCard 
                    id={project.id}
                    name={project.name} 
                    budget={project.budget}
                    category={project.category.name}
                    key={project.id}
                    handleRemove={removeProject}
                    />
                )}
                {!removeLoading && <Loader />}
                {removeLoading && projects.length === 0 &&
                    <p>Não há projetos cadastrados!</p>
                }
            </Container>
        </div>
    )
}

export default Projects