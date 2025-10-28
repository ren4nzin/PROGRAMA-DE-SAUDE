import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App de Consultas!</Text>
      <Button
        title="Marcar Consulta"
        onPress={() => navigation.navigate('MarcarConsulta')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function MarcarConsultaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu profissional de saúde</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Início" component={HomeScreen} />
        <Stack.Screen name="MarcarConsulta" component={MarcarConsultaScreen} options={{ title: 'Marcar Consulta' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
 