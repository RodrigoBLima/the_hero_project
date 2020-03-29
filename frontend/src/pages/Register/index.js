import React, { useState } from 'react'
import './styles.css'

import logoImg from '../../assets/logo.svg';
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try {
            const res = await api.post('ongs', data)

            toast(`Seu ID de acesso: ${res.data.id}`)
            setTimeout(() => {
                history.push('/')
            }, 5000);
        }
        catch (e) {
            toast('Erro no cadastro, tente novamente.')
        }
    }


    return (
        <div className="register-container">
            <div className="content">
                <section className="">
                    <img src={logoImg} alt="" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="e02141" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nome da ONG"
                    />

                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="E-mail"
                        type="email"
                    />

                    <input
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        placeholder="WhatsApp"
                    />

                    <div className="input-group">
                        <input
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="Cidade"
                        />
                        <input
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            placeholder="UF"
                            style={{ width: 80 }}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
