import React, {useEffect} from 'react';
import Container from '../components/Container';
import Logo from '../assets/logo.png';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import {checkPersistence} from '../Api';
import {useNavigation} from '@react-navigation/native';

export default function LoadScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    checkPersistence(navigation);
  }, []);

  return (
    <Container>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />
      </View>
      <ActivityIndicator style={{}} size={'large'} color={'#fff'} />
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
    marginBottom: 250,
  },

  logo: {
    height: 200,
    width: 200,
  },
});
