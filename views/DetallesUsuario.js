import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper'
import globalStyles from '../styles/global';
import { API_URL } from "../util/constants";
import axios from 'axios';


const DetallesUsuario = ({ navigation, route }) => {

  //console.log(route.params);

  const { guardarConsultarAPI } = route.params;
  const { nombre, telefono, numero_cuenta, carrera, id } = route.params.item;

  const mostrarConfirmacion = () => {
    Alert.alert(
      '¿Deseas eliminar este usuario?',
      'Un usuario eliminado no se puede recuperar',
      [
        { text: 'Si, eliminar', onPress: () => eliminarUsuario() },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  }

  const eliminarUsuario = async () => {
    //console.log('Eliminando....', numero_cuenta);
    const url = `${API_URL}/personas/${id}`;
    //console.log(url);
    try {
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }

    // Redireccionar
    navigation.navigate("Inicio");

    // Volver a consultar la api
    guardarConsultarAPI(true);

  }

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>Número de Cuenta: <Subheading>{numero_cuenta}</Subheading> </Text>
      <Text style={styles.texto}>Teléfono: <Subheading>{telefono}</Subheading> </Text>
      <Text style={styles.texto}>Licenciatura: <Subheading>{carrera}</Subheading> </Text>

      <Button 
        style={styles.boton} 
        mode="contained" 
        icon="cancel"
        onPress={ () => mostrarConfirmacion() }
      >
        Eliminar Usuario
      </Button>

      <FAB
          icon="pencil"
          style={globalStyles.fab}
          onPress={ () => navigation.navigate("NuevoUsuario", { usuario: route.params.item, guardarConsultarAPI }) }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18
  },
  boton: {
    marginTop: 100,
    backgroundColor: 'red'
  }
});

export default DetallesUsuario;