import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Container from '../components/Container';
import {useNavigation, useRoute} from '@react-navigation/native';
import {formatTime} from '../Api';


export default function ServiceCategory() {
  const navigation = useNavigation();
  const route = useRoute();
  const [categoryServices, setCategoryServices] = useState({
    data: route.params.data,
  });

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerText}>{categoryServices.data.category}</Text>
      </View>
      <ScrollView style={styles.scroll}>
        {categoryServices.data.services.map((item, key) => (
          <TouchableOpacity
            style={styles.service}
            key={key}
            onPress={() => {
              navigation.navigate('ChosenService', {chosenService: item});
            }}>
            <Image
              style={styles.servicesImage}
              source={{
                uri: 'https://negociosdebeleza.beautyfair.com.br/wp-content/uploads/2023/11/unhas-francesinhas-2024-novas-ideias.png',
              }}
            />
            <View style={styles.body}>
              <Text style={styles.bodyTitle}>{item.name}</Text>
              <Text style={styles.bodyText}> R$ {item.price.toFixed(2)}</Text>
              <Text style={styles.bodyText}>
                Tempo medio de {formatTime(item.duration)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button
        title="teste"
        onPress={() => {
          console.log(formatTime());
        }}
      />
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
  service: {
    backgroundColor: '#cb8fdd',
    minHeight: 120,
    marginTop: 20,
    marginHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  servicesImage: {
    height: 100,
    width: 100,
    marginLeft: 10,

    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 15,
  },
  body: {
    justifyContent: 'center',
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
  scroll: {
    paddingBottom: 100,
  },
});
