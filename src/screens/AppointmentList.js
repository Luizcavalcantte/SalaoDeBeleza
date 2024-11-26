import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {getUserAppointments} from '../Api';
import Container from '../components/Container';

export default function AppointmentList() {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    async function getAppointment() {
      const updateAppointment = await getUserAppointments();
      setAppointmentList(updateAppointment);
    }
    getAppointment();
  }, []);

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerText}>Seus Agendamentos</Text>
      </View>
      {appointmentList && (
        <ScrollView>
          {appointmentList.map((i, k) => (
            <View key={k} style={styles.body}>
              <Text style={styles.bodyTitle}> Data marcada: </Text>
              <Text style={styles.bodyTitle}>
                Dia {i.date.split('-')[0]} de {months[i.date.split('-')[1]]} de{' '}
                {i.date.split('-')[2]}
              </Text>
              {i.unavailableDate.map((i, k) => (
                <View key={k} style={styles.description}>
                  <Image
                    style={styles.imageDescription}
                    source={{
                      uri: 'https://negociosdebeleza.beautyfair.com.br/wp-content/uploads/2023/11/unhas-francesinhas-2024-novas-ideias.png',
                    }}
                  />
                  <View>
                    <Text style={styles.bodyText}>
                      Serviço: {i.serviceName}
                    </Text>
                    <Text style={styles.bodyText}>
                      Dia marcado: {i.weekDay},{' '}
                      {i.dayNumber < 10 ? '0' + i.dayNumber : i.dayNumber}
                    </Text>
                    <Text style={styles.bodyText}>Horario: {i.hour} horas</Text>
                    <Text style={styles.bodyText}>Valor: {i.value} R$</Text>
                  </View>
                </View>
              ))}
            </View>
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
  body: {
    backgroundColor: '#cb8fdd',
    margin: 10,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  bodyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#6a2c81',
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  bodyText: {
    color: '#fff',
    fontSize: 16,
  },
  imageDescription: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginRight: 10,
  },
});
