import './styles.css'
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'


export default function Logon() {

    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const res = await api.post('sessions', { id })

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', res.data.ong.name)

            toast(`Login realizado com sucesso`)
            setTimeout(() => {
                history.push('/profile')
            }, 1000);            

        }
        catch (e) {
            toast('Erro no cadastro, tente novamente.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="" />
                <form onSubmit={handleLogin}>
                    <h1>Faça o seu Login</h1>

                    <input
                        value={id}
                        onChange={e => setId(e.target.value)}
                        placeholder="seu ID"
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="e02141" />
                        Não tenho cadastro
                    </Link>
                </form>
                <ToastContainer />
            </section>
            <img src={heroesImg} alt="heroesimage" />
        </div>
    )
}
