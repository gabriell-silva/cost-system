import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../services/api'
import { v4 as uuidv4 } from 'uuid'
import Styles from './project.module.css'
import Loader from '../../utils/Loader'
import Container from '../../layouts/Container'
import Message from '../../utils/Message'
import formatMoney from '../../utils/formatMoney'
import ProjectForm from '../../ItemsProject/ProjectForm'
import ServiceForm from '../../service/ServiceForm'
import ServiceCard from '../../service/ServiceCard'

const Project = () => {

    const { id } = useParams()

    const [ project, setProject ] = useState([])
    const [ services, setServices ] = useState([])
    const [ showProjectForm, setShowProjectForm ] = useState(false)
    const [ showServiceForm, setShowServiceForm ] = useState(false)
    const [ message, setMessage ] = useState()
    const [ type, setType ] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`${api.baseURL}/projects/${id}`, {
                method: "GET",
                headers: api.headers
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch((err) => console.log(err))
        }, 300)
    }, [id])

    const createService = (project) => {
        setMessage('')
        //last service
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximum value validation
        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        //add service cost to project total cost
        project.cost = newCost

        //update project
        fetch(`${api.baseURL}/projects/${project.id}`, {
            method: "PATCH",
            headers: api.headers,
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setTimeout(() => {
                    setMessage('Serviço adicionado com sucesso!')
                    setType('sucess')
                    setShowServiceForm(false)
                }, 2000)
            })
            .catch((err) => console.log(err))
    }

    const removeService = (id,cost) => {
        setMessage('')
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`${api.baseURL}/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: api.headers,
            body: JSON.stringify(projectUpdated)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(projectUpdated)
                setServices(servicesUpdated)
                setMessage('Serviço removido com sucesso!')
                setType('error')

            })
            .catch((err) => console.log(err))
    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)
    }

    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)
    }

    const editPost = (project) => {
        setMessage('')
        //budget validation
        if(project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`${api.baseURL}/projects/${project.id}`, {
            method: "PATCH",
            headers: api.headers,
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto Atualizado!')
                setType('sucess')
            })
            .catch((err) => console.log(err))
    }


    return (
        <>
            {project.name ? (
                <div className={Styles.Container}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
                        <div className={Styles.DetailsContainer}>
                            <h1>Projeto: {project.name}</h1>
                            <button  className={Styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={Styles.ProjectInfo}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de orçamento:</span> {formatMoney.format(project.budget)}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> {formatMoney.format(project.cost)}
                                    </p>
                                </div>
                            ) : (
                                <div className={Styles.ProjectInfo}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir edição"
                                        projectData={project}
                                    >

                                    </ProjectForm>
                                </div>
                            )}
                        </div>
                        <div className={Styles.ServiceContainer}>
                            <h2>Adicione um serviço: </h2>
                            <button  className={Styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={Styles.ServiceInfo}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                    </Container>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {services.length > 0 &&
                            services.map((service) => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))
                        }
                        {services.length === 0 && <p>Não há serviços cadastrados!</p>}
                    </Container>
                </div>
            ) : <Loader /> }
        </>
    )
}

export default Project