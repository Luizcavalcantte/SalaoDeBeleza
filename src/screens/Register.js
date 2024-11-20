import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Container from '../components/Container';
import CustomTextInput from '../components/CustomTextInput';
import Logo from '../assets/logo.png';
import {useNavigation} from '@react-navigation/native';
import {createUser, validateEmail} from '../Api';

export default function Register() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />
      </View>
      <View style={styles.body}>
        <CustomTextInput
          placeholder={'Nome'}
          value={name}
          onChangeText={t => {
            setName(t);
          }}
        />
        <CustomTextInput
          placeholder={'E-mail'}
          value={email}
          onChangeText={t => {
            setEmail(t);
          }}
        />
        <CustomTextInput
          placeholder={'Telefone'}
          value={phone}
          onChangeText={t => {
            setPhone(t);
          }}
        />
        <CustomTextInput
          secureTextEntry={true}
          placeholder={'Senha'}
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
            if (name != '' && email != '' && phone != '' && password != '') {
              if (validateEmail(email)) {
                if (password.length >= 6) {
                  createUser(name, email, phone, password, navigation);
                } else {
                  alert('A Senha Precisa Ter no Minimo 6 Digitos');
                }
              } else {
                alert('E-mail Invalido!');
              }
            } else {
              alert('Preencha Todos os Campos!');
            }
          }}>
          <Text style={styles.buttomLoginText}>Confirmar</Text>
        </TouchableOpacity>
        <View style={styles.registercontainer}>
          <Text style={styles.registerText}>Já possui uma conta? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
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
              Entre
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
