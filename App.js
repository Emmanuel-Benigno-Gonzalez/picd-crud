import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet
} from 'react-native';

import Inicio from './views/Inicio';
import NuevoUsuario from './views/NuevoUsuario';
import DetallesUsuario from './views/DetallesUsuario';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

//Definir el Tema del Diseño
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774f2',
    accent: '#0655BF'
  }
}

//console.log(theme);

const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          >
            <Stack.Screen
              name="Inicio"
              component={Inicio}
              options={ ({navigation, route}) => ({
                headerTitleAlign: 'center',
                //headerLeft: (props) => <BarraSuperior {...props}
                //                          navigation={navigation}
                //                          route={route}
                //                        />
              })
              }
            />
            <Stack.Screen
              name="NuevoUsuario"
              component={NuevoUsuario}
              options={{
                title: "Nuevo Usuario"
              }}
            />
            <Stack.Screen
              name="DetallesUsuario"
              component={DetallesUsuario}
              options={{
                title: "Detalles Usuario"
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({

});

export default App;
