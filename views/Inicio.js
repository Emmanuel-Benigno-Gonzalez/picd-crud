import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
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

            <Button icon="check" onPress={ () => navigation.navigate("Inicio", guardarConsultarAPI(true) ) }>
                Refresh
            </Button>

            <Headline style={globalStyles.titulo}>{ usuarios.length > 0 ? "Usuarios": "Aún no hay usuarios" }</Headline>

            <FlatList
                data={usuarios}
                keyExtractor={ usuario => (usuario.id).toString() }
                renderItem= { ({ item }) =>(
                    <List.Item
                        title={item.nombre}
                        description={item.numero_cuenta}
                        onPress={ () => navigation.navigate("DetallesUsuario", {item, guardarConsultarAPI }) }
                    />
                )}
            />

            <FAB
                icon="plus"
                style={globalStyles.fab}
                onPress={ () => navigation.navigate("NuevoUsuario", { guardarConsultarAPI }) }
            />

        </View>
    );
}


export default Inicio;