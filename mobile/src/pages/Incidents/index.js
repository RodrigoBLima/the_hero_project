import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons/'
import { useNavigation } from '@react-navigation/native'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import styles from './styles'
import logoImg from '../../assets/logo.png'
import api from '../../services/index'

export default function Incidents() {
    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToDetail(incident) {
        navigation.navigate("Detail", { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return
        }
        if (total > 0 && incidents.length === total) {
            return
        }
        setLoading(true)
        const response = await api.get('incidents',{
            params: {page}
        })
        // setLoading(false)
        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(true)

    }

    useEffect(() => {
        //     // async load
        loadIncidents()
        //    
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos.</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={styles.incidentList}
                data={incidents}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                keyExttractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>Caso:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailButtonText}> Ver mais detalhes </Text>
                            <Feather name="arrow-right" size={17} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}

            />

        </View>
    );
}
