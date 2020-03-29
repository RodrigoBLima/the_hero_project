import './styles.css'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';

import React, { useState, useEffect } from 'react'
import { FiPower, FiTrash2, FiEdit2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'


export default function Profile() {

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')
    const history = useHistory()

    const [incidents, setIncidents] = useState([])

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(res => {
            console.log(res.data)
            setIncidents(res.data.incidents)
        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        try {

            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });
            toast(`Caso deletado com sucesso`)
            setTimeout(() => {
                setIncidents(incidents.filter(incident => incident.id !== id))
            }, 1000);
        } catch (err) {
            toast('Erro no cadastro, tente novamente.')
        }
    }

    function handlesetIncident(incident) {
        console.log(incident)
        localStorage.setItem("incident", JSON.stringify(incident))
    }
    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vindo(a),
                <Link to="/update/profile/" className="onglink"> {ongName}</Link>
                </span>
                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
            </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident =>
                    <li key={incident.id}>

                        <strong>Caso: </strong>
                        <p>{incident.title} </p>

                        <strong>Descrição:  </strong>
                        <p>{incident.description}</p>

                        <strong>Valor: </strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>


                        <button type="button" style={{ marginRight: 30 }} onClick={() => handlesetIncident(incident)} >
                            <Link to="/edit/indicent"><FiEdit2 size={20} color="#a8a8b3" /></Link>
                        </button>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>

                    </li>
                )}
            </ul>
            <ToastContainer />
        </div>
    )
}
