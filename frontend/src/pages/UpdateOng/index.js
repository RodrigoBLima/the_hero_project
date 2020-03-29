import './styles.css'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api'

import React, { useState, useEffect } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


export default function UpdateOng() {
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    const [ong, setOng] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    // console.log(ongId)
    useEffect(() => {
        api.get(`/ongs/${ongId}`, {
            headers: {
                Authorization: ongId
            }
        }).then(res => {
            // console.log(res.data.ong)
            const ong = res.data.ong[0]
            // console.log(ong)
            setOng(ong)
            setName(ong.name)
            setEmail(ong.email)
            setWhatsapp(ong.whatsapp)
            setCity(ong.city)
            setUf(ong.uf)
        })
    }, [ongId])

    async function handleUpdateOng(e) {
        e.preventDefault()

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try {
            const res = await api.put(`/ongs/${ongId}`, data)
            // console.log(res.data)
            localStorage.setItem('ongName', res.data.name)

            toast("Dados atualizados com sucesso.")
            setTimeout(() => {
                history.push('/profile')
            }, 1000);

        }
        catch (e) {
            toast("Erro ao atualizar, tente novamente.")
        }
    }

    return (
        <div>
            <div className="profile-container">
                <header>
                    <img src={logoImg} alt="Be the Hero" />
                    <span>Bem vindo(a), {ongName}</span>
                    <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>

                    <Link to="/profile">
                        <button type="button">
                            <FiArrowLeft size={18} color="e02041" />
                        </button>
                    </Link>

                </header>

                <form className="form-register" style={{ marginTop: "130px" }} onSubmit={handleUpdateOng}>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nome da ONG"
                        style={{ marginBottom: "9px" }}
                    />

                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="E-mail"
                        type="email"
                        style={{ marginBottom: "9px" }}
                    />

                    <input
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        placeholder="WhatsApp"
                        style={{ marginBottom: "9px" }}
                    />

                    <div className="input-group">
                        <input
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="Cidade"
                            style={{ marginBottom: "9px" }}
                        />
                        <input
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            placeholder="UF"
                        />
                    </div>

                    <button
                        className="button"
                        type="submit"
                    >
                        Atualizar
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
