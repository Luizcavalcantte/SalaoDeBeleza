import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Services({data}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ServiceCategory', {data: data});
      }}>
      {data && (
        <View style={styles.container}>
          <Image
            style={styles.servicesImage}
            source={{
              uri: 'https://negociosdebeleza.beautyfair.com.br/wp-content/uploads/2023/11/unhas-francesinhas-2024-novas-ideias.png',
            }}
          />
          <View style={styles.body}>
            <Text style={styles.bodyTitle}>{data.category}</Text>
            <View>
              {data.services.map((item, k) => (
                <Text style={styles.bodyText} key={k}>
                  - {item.name}
                </Text>
              ))}
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cb8fdd',
    minHeight: 120,
    marginVertical: 20,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    justifyContent: 'center',
  },
  servicesImage: {
    height: 100,
    width: 100,
    marginLeft: 10,

    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 30,
  },
  bodyTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  bodyText: {
    color: '#fff',
    fontSize: 16,
  },
});

const services = [
  {
    category: 'manicure',
    services: [
      {
        serviceName: 'corte e pintura',
        servicePrice: 80,
        serviceTime: 30,
      },
      {
        serviceName: 'gel',
        servicePrice: 100,
        serviceTime: 30,
      },
    ],
  },
  {
    category: 'cabelo',
    services: [
      {
        serviceName: 'corte',
        servicePrice: 80,
        serviceTime: 30,
      },
      {
        serviceName: 'escova',
        servicePrice: 100,
        serviceTime: 60,
      },
    ],
  },
];

console.log(services[1].services[0].serviceName);
