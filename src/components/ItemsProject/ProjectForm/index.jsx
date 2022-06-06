import Styles from './projectForm.module.css'
import Input from '../../form/Input'
import Select from '../../form/Select'
import SubmitButton from '../../form/SubmitButton'
import { useEffect, useState } from 'react'
import { api } from '../../../services/api'

const ProjectForm = ({ handleSubmit, btnText, projectData }) => {

    const [ categories, setCategories ] = useState([])
    const [ project, setProject ] = useState( projectData || {})

    useEffect(() => {
        fetch(`${api.baseURL}/categories`, {
        method: "GET",
        headers: api.headers
    })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    const handleSelect = (e) => {
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }
        })
    }

    return (
        <form onSubmit={submit} className={Styles.Form}>
            <Input 
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleSelect}
                value={project.category ? project.category.id : '' }
            />
            <SubmitButton text={ btnText } />
        </form>
    )
}

export default ProjectForm