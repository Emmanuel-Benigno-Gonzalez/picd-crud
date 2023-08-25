import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal, Text } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import { API_URL } from "../util/constants";
import { useFormik } from 'formik';
import * as Yup from 'yup'


const NuevoUsuario = ({ navigation, route }) => {

  const { guardarConsultarAPI } = route.params;


  // campos formulario
  const [ nom, guardarNom ] = useState('');
  const [ tel, guardarTel ] = useState('');
  const [ numero_c, guardarNumero_c ] = useState('');
  const [ car, guardarCar ] = useState('');


  // Detectar si estamos editando o no 
  useEffect(() => {
    if(route.params.usuario) {

      //Si estamos Editando
      const { nombre, telefono, numero_cuenta, carrera } = route.params.usuario;

      guardarNom(nombre);
      guardarTel(telefono);
      guardarNumero_c(numero_cuenta);
      guardarCar(carrera);
    }
  }, []);


  const formik = useFormik({
    initialValues: {
      nombre: nom,
      telefono: tel,
      numero_cuenta: numero_c,
      carrera: car,
    },

    validationSchema: Yup.object({
      nombre: Yup.string()
                  .min(3, 'El campo requiere al menos 3 caracteres')
                  .required('El Nombre de usuario es obligatorio'),
      telefono: Yup.number()
                  .typeError('El campo debe ser un número')
                  .integer('El campo debe ser un número entero')
                  .min(1000000, 'El campo requiere al menos 7 digitos')
                  .required('El campo es obligatorio'),
      numero_cuenta: Yup.number()
                  .typeError('El campo debe ser un número')
                  .integer('El campo debe ser un número entero')
                  .min(1000000, 'El campo requiere al menos 7 digitos')
                  .required('El campo es obligatorio'),
      carrera: Yup.string()
                  .min(3, 'El campo requiere al menos 3 caracteres')
                  .required('El campo es obligatorio'),            
    }),
    onSubmit: async (datos) => {

      // Validar
      /*if(datos.nombre === '' || datos.telefono === '' || datos.numero_cuenta === '' || datos.carrera === ''){
        //console.log('Hay campos vacios');
        guardarAlerta(true);
        return;
      }*/
      
      // Convertir a enteros
      const telefonoInt = parseInt(datos.telefono);
      const nCuentaInt = parseInt(datos.numero_cuenta);

      // Validar que la conversión sea exitosa
      if (isNaN(telefonoInt) || isNaN(nCuentaInt)) {
        console.log('Error en la conversión a enteros');
        return;
      }

      // Generar el usuario
      const usuario = { nombre: datos.nombre, telefono: telefonoInt, numero_cuenta: nCuentaInt, carrera: datos.carrera }
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
      guardarNom('');
      guardarTel('');
      guardarNumero_c('');
      guardarCar('');

      // Cambiar a true para traernos al nuevo cliente
      guardarConsultarAPI(true);
    }

  })




  return (
    <View style={globalStyles.contenedor}>

        <Headline style={globalStyles.titulo}>Añadir Nuevo Usuario</Headline>
        
        <TextInput
          label="Nombre"
          placeholder="Tu nombre" 
          //onChangeText={(text) => formik.setFieldValue("nombre", text) }
          onChangeText={(text) =>
            formik.setFieldValue("nombre", route.params.usuario ? guardarNom(text) : text)
          }
          value={ route.params.usuario ? formik.values.nombre=nom : formik.values.nombre }
          //value={ route.params.usuario ? nom : formik.values.nombre }
          style={styles.input} 
          onBlur={formik.handleBlur("nombre")}
        />

        { formik.touched.nombre && formik.errors.nombre ? (
          <Text style={styles.texto}>{formik.errors.nombre}</Text>
        ) : null }

        <TextInput
          label="Teléfono"
          placeholder="Número de Teléfono"
          //onChangeText={ (text) => formik.setFieldValue("telefono", text) }
          onChangeText={(text) =>
            formik.setFieldValue("telefono", route.params.usuario ? guardarTel(text) : text)
          }
          //value={ route.params.usuario ? tel : formik.values.telefono }
          value={ route.params.usuario ? formik.values.telefono=tel : formik.values.telefono}
          style={styles.input}
          keyboardType="numeric" 
          onBlur={formik.handleBlur("telefono")}
        />

        { formik.touched.telefono && formik.errors.telefono ? (
          <Text style={styles.texto}>{formik.errors.telefono}</Text>
        ) : null }

        <TextInput
          label="Número de Cuenta"
          placeholder="Tu cuenta"
          //onChangeText={ (text) => formik.setFieldValue("numero_cuenta", text) }
          onChangeText={(text) =>
            formik.setFieldValue("numero_cuenta", route.params.usuario ? guardarNumero_c(text) : text)
          }
          //value={ route.params.usuario ? numero_c : formik.values.numero_cuenta}
          value={ route.params.usuario ? formik.values.numero_cuenta=numero_c : formik.values.numero_cuenta }
          style={styles.input}
          keyboardType="numeric" 
          onBlur={formik.handleBlur("numero_cuenta")}
        />

        { formik.touched.numero_cuenta && formik.errors.numero_cuenta ? (
          <Text style={styles.texto}>{formik.errors.numero_cuenta}</Text>
        ) : null }

        <TextInput
          label="Carrera"
          placeholder="Tu Licenciatura"
          //onChangeText={ (text) => formik.setFieldValue("carrera", text) }
          onChangeText={(text) =>
            formik.setFieldValue("carrera", route.params.usuario ? guardarCar(text) : text)
          }
          //value={ route.params.usuario ? car : formik.values.carrera}
          value={ route.params.usuario ? formik.values.carrera=car : formik.values.carrera }
          style={styles.input}
          onBlur={formik.handleBlur("carrera")}
        />
         { formik.touched.carrera && formik.errors.carrera ? (
          <Text style={styles.texto}>{formik.errors.carrera}</Text>
        ) : null }

        <Button icon="pencil-circle" mode="contained" onPress={formik.handleSubmit}>
          Guardar Usuario
        </Button>
      
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  texto: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center', 
  }
});

export default NuevoUsuario;

