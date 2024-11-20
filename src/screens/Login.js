import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import Container from '../components/Container';
import Logo from '../assets/logo.png';
import CustomTextInput from '../components/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import {login} from '../Api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <Container>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />
      </View>
      <View style={styles.body}>
        <CustomTextInput
          placeholder={'E-mail'}
          value={email}
          onChangeText={t => {
            setEmail(t);
          }}
        />
        <CustomTextInput
          placeholder={'Senha'}
          secureTextEntry={true}
          value={password}
          onChangeText={t => {
            setPassword(t);
          }}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttomLogin}
          onPress={() => {
            if (email != '' && password != '') {
              login(email, password, navigation);
            } else {
              alert('Preencha Todos os Campos');
            }
          }}>
          <Text style={styles.buttomLoginText}>Confirmar</Text>
        </TouchableOpacity>
        <View style={styles.registercontainer}>
          <Text style={styles.registerText}>Ainda nao possui uma conta? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text
              style={[
                styles.registerText,
                {
                  fontWeight: 'bold',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                },
              ]}>
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#cb8fdd',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    marginRight: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 50,
  },
  logo: {
    height: 200,
    width: 200,
  },
  body: {
    marginTop: 70,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 50,
  },
  buttomLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5c0087',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    width: 200,
    height: 40,
    marginBottom: 20,
  },
  buttomLoginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  registercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
  },
});
