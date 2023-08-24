import React, {useState} from 'react'
import { Button } from 'react-native-paper'
import axios from 'axios';


const Refresh = ({navigation, route}) => {

  const [ usuarios, guardarUsuarios ] = useState([]);

  const handlePress = async () => {
    try {
        const url = `${API_URL}/personas`;

        //const resultado = await axios.get('http://192.168.100.14:3000/usuarios');
        const resultado = await axios.get(url);
        guardarUsuarios(resultado.data);
        navigation.navigate("Inicio");
    } catch (error) {
        console.log(error);
    }
  }
    
  return (
    <Button icon="check" buttonColor='#FFF' onPress={ () => handlePress() }>
        Refresh
    </Button>
  )
}

export default Refresh