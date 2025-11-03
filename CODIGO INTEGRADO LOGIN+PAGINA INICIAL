import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Image, 
  ScrollView 
} from 'react-native';

const minhaImagem2 = require('./assets/MINHA SAUDE.png');
const minhaImagem3 = require('./assets/qual_o_melhor_plano_de_saude_banner_96.png');

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (email === '' || senha === '') {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    // Simulação de login
    if (email === 'teste@exemplo.com' && senha === '123456') {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      setIsLoggedIn(true);
    } else {
      Alert.alert('Erro', 'Email ou senha incorretos.');
    }
  };

  const dados = [
    ['MEU PLANO DE SAUDE','CADASTRO','PLANO'],
    ['CARENCIA','ATIVO','PESSOAL'],
  ];

  // SE NÃO ESTIVER LOGADO → Mostra tela de Login
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Seja Bem-vindo(a)!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // SE ESTIVER LOGADO → Mostra conteúdo do "Código 2"
  return (
    <ScrollView contentContainerStyle={styles2.container}>
      <Image source={minhaImagem2} style={styles2.imagem} />
    
      {/* Tabela */}
      <View>
        {dados.map((linha, index) => (
          <View
            key={index}
            style={[styles2.linha, index === 0 ? styles2.cabecalho : null]}
          >
            {linha.map((celula, i) => (
              <View key={i} style={styles2.celula}>
                <Text style={index === 0 ? styles2.textoCabecalho : styles2.texto}>
                  {celula}
                </Text>
              </View>
            ))}
          </View>
        ))}
		    <Image source={minhaImagem3} style={styles2.imagem2} />
      </View>
    </ScrollView>
  );
}

// ---------- ESTILOS DA TELA DE LOGIN ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: '#FF751F',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#000',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF751F',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  registerText: {
    color: '#FF751F',
    marginTop: 20,
    fontWeight: '500',
  },
});

// ---------- ESTILOS DO CONTEÚDO APÓS LOGIN ----------
const styles2 = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff5ee',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
  },
  imagem: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 30,
	},
	imagem2: {
    width: 500,
    height:300,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  linha: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cabecalho: {
    backgroundColor: '#FF7F50',
  },
  celula: {
    width: 120,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  texto: {
    fontSize: 16,
    color: 'black',
  },
  textoCabecalho: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
