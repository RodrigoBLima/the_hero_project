import './styles.css'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api'

import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export default function EditIncident() {
    const data = JSON.parse(localStorage.incident)
    const ongId = localStorage.getItem('ongId')
    const [incident, setIncident] = useState(data)
    const [title, setTitle] = useState(data.title)
    const [id, setId] = useState(data.id)
    const [description, setDescription] = useState(data.description)
    const [value, setValue] = useState(data.value)

    const history = useHistory()

    async function handleEditIncident(e) {
        e.preventDefault()
        const data = {
            id,
            title,
            description,
            value,
        }

        try {
            await api.put(`incidents/${id}`, data, {
                headers: {
                    Authorization: ongId
                }
            })

            toast(`Caso atualizado com sucesso.`)
            setTimeout(() => {
                history.push('/profile')
            }, 1000);
            history.push('/profile')
        }
        catch (e) {
            toast("Erro ao atualizar, tente novamente.")
        }
    }
    // console.log(data)
    return (
        <div>
            <div className="new-incident">
                <div className="content">
                    <section className="">
                        <img src={logoImg} alt="" />
                        <h1>Atualizar caso</h1>
                        <Link to="/profile" className="back-link">
                            <FiArrowLeft size={16} color="e02141" />
                            Voltar para home
                        </Link>
                    </section>

                    <form onSubmit={handleEditIncident}>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Titulo do caso"
                            required
                        />
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Descrição"
                            required
                        />
                        <input
                            placeholder="Valor em reais"
                            type="number"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            required
                        />

                        <button
                            className="button"
                            type="submit"
                        >
                            Atualizar
                         </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}
