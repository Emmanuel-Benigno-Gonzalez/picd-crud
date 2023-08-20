import React from 'react'
import { Button } from 'react-native-paper'

const BarraSuperior = ({navigation, route}) => {

  const handlePress = () => {
    //console.log('Vamos a Crear un Cliente');
    navigation.navigate("NuevoUsuario");
  }
    
  return (
    <Button icon="plus-circle" buttonColor='#FFF' onPress={ () => handlePress() }>
        Usuario
    </Button>
  )
}

export default BarraSuperior