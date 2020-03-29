import React, { useState } from 'react'
import './styles.css'
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export default function NewIncident() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const ongId = localStorage.getItem('ongId')
    const history = useHistory()

    async function handleRegisterNewIncident(e) {
        e.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })
            toast("Caso cadastradocom sucesso.")
            setTimeout(() => {
                history.push('/profile')
            }, 1500);
            // history.push('/profile')
        }
        catch (e) {
            toast('Erro no cadastro, tente novamente.')
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section className="">
                    <img src={logoImg} alt="" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="e02141" />
                        Voltar para home
                </Link>
                </section>

                <form onSubmit={handleRegisterNewIncident}>
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
                        Cadastrar
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
