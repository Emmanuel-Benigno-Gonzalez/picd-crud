import React, { useEffect, useState } from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import axios from 'axios'
import { List, Headline, Button, FAB } from 'react-native-paper'
import { API_URL } from "../util/constants";
import globalStyles from '../styles/global';

const Inicio = ({navigation}) => {

    // state de la app
    const [ usuarios, guardarUsuarios ] = useState([]);
    const [ consultarAPI, guardarConsultarAPI ] = useState(true);

    useEffect( () => {
        const obtenerClientesApi = async () => {
            try {
                const url = `${API_URL}/personas`;

                //const resultado = await axios.get('http://192.168.100.14:3000/usuarios');
                const resultado = await axios.get(url);
                guardarUsuarios(resultado.data);
                guardarConsultarAPI(false);
            } catch (error) {
                console.log(error);
            }
        }
        
        if(consultarAPI) {
            obtenerClientesApi();
        }

    }, [consultarAPI]);

    return (
        <View style={globalStyles.contenedor}>

            <Button icon="plus-circle" onPress={ () => navigation.navigate("NuevoUsuario", { guardarConsultarAPI }) }>
                Nuevo Usuario
            </Button>

            <Headline style={globalStyles.titulo}>{ usuarios.length > 0 ? "Usuarios": "Aún no hay usuarios" }</Headline>

            <FlatList
                data={usuarios}
                keyExtractor={ usuario => (usuario.id).toString() }
                renderItem= { ({ item }) =>(
                    <List.Item
                        title={item.nombre}
                        description={item.numero_cuenta}
                    />
                )}
            />

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={ () => navigation.navigate("NuevoUsuario", { guardarConsultarAPI }) }
            />

        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    }
});

export default Inicio;