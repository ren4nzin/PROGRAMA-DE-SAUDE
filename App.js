import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ Importação

const minhaImagem2 = require('./assets/MINHA SAUDE.png');
const minhaImagem3 = require('./assets/qual_o_melhor_plano_de_saude_banner_96.png');

export default function App() {
  const [screen, setScreen] = useState('login'); // 'login' | 'register' | 'home'
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarios, setUsuarios] = useState([]); // Armazena usuários cadastrados
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // ---------- CARREGAR USUÁRIOS SALVOS AO INICIAR ----------
  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const usuariosSalvos = await AsyncStorage.getItem('usuarios');
        if (usuariosSalvos) {
          setUsuarios(JSON.parse(usuariosSalvos));
        }
      } catch (error) {
        console.log('Erro ao carregar usuários:', error);
      }
    };
    carregarUsuarios();
  }, []);

  // ---------- SALVAR USUÁRIOS NO ASYNCSTORAGE ----------
  const salvarUsuarios = async (novosUsuarios) => {
    try {
      await AsyncStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
    } catch (error) {
      console.log('Erro ao salvar usuários:', error);
    }
  };

  // ---------- FUNÇÕES DE LOGIN / CADASTRO ----------
  const handleLogin = () => {
    if (email === '' || senha === '') {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      setScreen('home');
      setEmail('');
      setSenha('');
    } else {
      Alert.alert('Erro', 'Email ou senha incorretos.');
    }
  };

  const handleRegister = async () => {
    if (!nome || !email || !cpf || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    const usuarioExistente = usuarios.find((u) => u.email === email);
    if (usuarioExistente) {
      Alert.alert('Erro', 'Já existe um usuário com este e-mail.');
      return;
    }

    const novoUsuario = { nome, email, cpf, senha };
    const novosUsuarios = [...usuarios, novoUsuario];
    setUsuarios(novosUsuarios);

    await salvarUsuarios(novosUsuarios); // ✅ Salva localmente

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Faça login.');
    setScreen('login');

    // Limpar campos
    setNome('');
    setEmail('');
    setCpf('');
    setSenha('');
    setConfirmarSenha('');
  };

  const handleLogout = () => {
    setScreen('login');
  };

  // ---------- TELAS ----------
  if (screen === 'login') {
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

        <TouchableOpacity onPress={() => setScreen('register')}>
          <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'register') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Criar Conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />

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
          placeholder="CPF"
          placeholderTextColor="#888"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="#888"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen('login')}>
          <Text style={styles.registerText}>Já tem conta? Fazer login</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ---------- TELA APÓS LOGIN ----------
  const dados = [
    ['MEU PLANO DE SAUDE', 'CADASTRO', 'PLANO'],
    ['CARENCIA', 'ATIVO', 'PESSOAL'],
  ];

  return (
    <ScrollView contentContainerStyle={styles2.container}>
      <Image source={minhaImagem2} style={styles2.imagem} />

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

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ---------- ESTILOS ----------
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    color: '#FF751F',
    fontWeight: 'bold',
    marginBottom: 30,
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
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#FF751F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

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
    height: 300,
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
