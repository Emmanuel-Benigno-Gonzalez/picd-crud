import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import { API_URL } from "../util/constants";


const NuevoUsuario = ({ navigation, route }) => {

  //console.log(route.params);

  const { guardarConsultarAPI } = route.params;

  // campos formulario
  const [ nombre, guardarNombre ] = useState('');
  const [ telefono, guardarTelefono ] = useState('');
  const [ numero_cuenta, guardarNumero_cuenta ] = useState('');
  const [ carrera, guardarCarrera ] = useState('');
  const [ alerta, guardarAlerta ] = useState(false);

  // Detectar si estamos editando o no 
  useEffect(() => {
    if(route.params.usuario) {
      //Si estamos Editando
      const { nombre, telefono, numero_cuenta, carrera } = route.params.usuario;

      guardarNombre(nombre);
      guardarTelefono(telefono);
      guardarNumero_cuenta(numero_cuenta);
      guardarCarrera(carrera);
    }
  }, []);


  // almacena el cliente en la BD
  const guardarUsuario = async () => {
    //console.log('Guardando Usuario');
    
    // Validar
    if(nombre === '' || telefono === '' || numero_cuenta === '' || carrera === ''){
      //console.log('Hay campos vacios');
      guardarAlerta(true);
      return;
    }
    
    // Convertir a enteros
    const telefonoInt = parseInt(telefono);
    const nCuentaInt = parseInt(numero_cuenta);

    // Validar que la conversión sea exitosa
    if (isNaN(telefonoInt) || isNaN(nCuentaInt)) {
      console.log('Error en la conversión a enteros');
      return;
    }

    // Generar el usuario
    const usuario = { nombre, telefono: telefonoInt, numero_cuenta: nCuentaInt, carrera }
    //console.log(usuario);

    // Si estamos editando o creando un nuevo usuario
    if(route.params.usuario) {
      // Editando un usuario
      const { id } = route.params.usuario;
      usuario.id = id;
      const url = `${API_URL}/personas/${id}`;
      //console.log(url);

      try {
        await axios.put(url, usuario);
      } catch (error) {
        console.log(error);
      }

    } else {
      // Guardar el usuario en la api
      try {

        const url = `${API_URL}/personas`;

        if(Platform.OS === 'ios') {
          //Para IOS
          //await axios.post('http://localhost:3000/usuarios', usuario);
          await axios.post(url, usuario); 

        } else {
          // Para andriod
          //await axios.post('http://192.168.100.14:3000/usuarios', usuario); 
          await axios.post(url, usuario); 
      
        }

      } catch (error) {
        console.log(error);
      }
    }

    // redireccionar
    navigation.navigate('Inicio');

    // limpiar el dorm (opcional)
    guardarNombre('');
    guardarTelefono('');
    guardarNumero_cuenta('');
    guardarCarrera('');

    // Cambiar a true para traernos al nuevo cliente
    guardarConsultarAPI(true);

  }


  return (
    <View style={globalStyles.contenedor}>
      
      <Headline style={globalStyles.titulo}>Añadir Nuevo Usuario</Headline>
      
      <TextInput
        label="Nombre"
        placeholder="Tu nombre"
        onChangeText={ texto => guardarNombre(texto) }
        value={nombre}
        style={styles.input}
      />

      <TextInput
        label="Teléfono"
        placeholder="Número de Teléfono"
        onChangeText={ texto => guardarTelefono(texto) }
        value={telefono}
        style={styles.input}
      />

      <TextInput
        label="Número de Cuenta"
        placeholder="Tu cuenta"
        onChangeText={ texto => guardarNumero_cuenta(texto) }
        value={numero_cuenta}
        style={styles.input}
      />

      <TextInput
        label="Carrera"
        placeholder="Tu Licenciatura"
        onChangeText={ texto => guardarCarrera(texto) }
        value={carrera}
        style={styles.input}
      />

      <Button icon="pencil-circle" mode="contained" onPress={ () => guardarUsuario() }>
        Guardar Usuario
      </Button>

      <Portal>
        <Dialog
          visible={alerta}
          //on Dismiss--> Cuando se da clic fuera del cuadro de alerta
          onDismiss={ () => guardarAlerta(false) }
        >
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={ () => guardarAlerta(false) }>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent'
  }
});

export default NuevoUsuario;

