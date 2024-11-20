import React, {useEffect, useState} from 'react';
import {Text, ScrollView, StyleSheet, View, Button} from 'react-native';
import Container from '../components/Container';
import Services from '../components/Services';
import {getServices} from '../Api';

export default function Home() {
  const [beautyServices, setBeautyServices] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const services = await getServices();
        setBeautyServices(services);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nossos Serviços</Text>
      </View>
      {beautyServices && (
        <ScrollView style={styles.scroll}>
          {beautyServices.map((item, key) => (
            <Services key={key} data={item} />
          ))}
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#cb8fdd',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginRight: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  scroll: {
    marginHorizontal: 10,
  },
  servicesBody: {
    backgroundColor: '#cb8fdd',
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  servicesImage: {
    height: 100,
    width: 100,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
  },
});
