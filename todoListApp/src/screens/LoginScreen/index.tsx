import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../modal/types';
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: 'user' }),
      });

      if (!response.ok) throw new Error('Erro ao fazer login');
      const { token } = await response.json();

      await AsyncStorage.setItem('token', token);
      setError(null);
      navigation.navigate('TaskScreen');
    } catch (error) {
      setError('Erro de autenticação. Verifique suas credenciais.');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f9eaed',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: '#c02e4c',
          marginBottom: 20,
        }}
      >
       Quem é você
      </Text>

      <View
        style={{
          width: '90%',
          maxWidth: 320,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 25,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          gap: 20,
        }}
      >
        {/* User */}
        <View style={{ width: '90%' }}>
          <Text style={{ marginBottom: 5, fontSize: 16 }}>Usuário:</Text>
          <View style={{ position: 'relative' }}>
            <AntDesign name="user" size={24} color="#999" style={{ position: 'absolute', left: 10, top: 12 }} />
            <TextInput
              placeholder="Informe seu user"
              value={username}
              onChangeText={setUsername}
              style={{
                paddingLeft: 40,
                paddingVertical: 14,
                backgroundColor: '#EDEDED',
                borderRadius: 10,
                fontSize: 16,
              }}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Password */}
        <View style={{ width: '90%' }}>
          <Text style={{ marginBottom: 5, fontSize: 16 }}>Senha:</Text>
          <View style={{ position: 'relative' }}>
            <MaterialIcons name="lock" size={24} color="#999" style={{ position: 'absolute', left: 10, top: 12 }} />
            <TextInput
              placeholder="Informe sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{
                paddingLeft: 40,
                paddingVertical: 14, 
                backgroundColor: '#EDEDED',
                borderRadius: 10,
                fontSize: 16,
              }}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {error && (
          <Text style={{ color: '#FF595E', marginTop: 5 }}>{error}</Text>
        )}

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            width: '90%',
            padding: 14,
            backgroundColor: '#d36d82',
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#F4F1DE' }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;




