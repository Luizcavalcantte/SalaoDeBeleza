import React, {useEffect, useState} from 'react';
import {Button, Text, View, StyleSheet, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Container from '../components/Container';
import {formatTime} from '../Api';
import {ScrollView} from 'react-native-gesture-handler';

export default function ChosenService() {
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
  const weekDay = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const route = useRoute();
  const date = new Date();
  const [item, setItem] = useState({chosenService: route.params.chosenService});

  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentDay, setCurrentDay] = useState(date.getDate());
  const [currentWeekDay, setCurrentWeekDay] = useState(weekDay[date.getDay()]);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDay, setSelectedDay] = useState(currentDay);

  const [formatedDateList, setFormatedDateList] = useState([]);

  function getDaysInMonthSelected() {
    return new Date(selectedYear, selectedMonth, 0).getDate();
  }

  function getFirsthWeekDayOfMonth() {
    const date = new Date(selectedYear, selectedMonth, 1);
    return date.getDay();
  }
  useEffect(() => {
    function getFormatedDate() {
      let deaysInMonth = getDaysInMonthSelected();
      let firsthWeekDayOfMonth = getFirsthWeekDayOfMonth();
      let daysList = [];

      for (let i = 1; i < deaysInMonth; i++) {
        let weekD = new Date(selectedYear, selectedMonth, i);
        daysList.push({
          number: i,
          weekDay: weekDay[weekD.getDay()],
        });
      }
      setFormatedDateList(daysList);
    }
    getFormatedDate();
  }, []);

  return (
    <Container>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{item.chosenService.name}</Text>
          </View>
          <Image
            style={styles.imageHeader}
            source={{
              uri: 'https://negociosdebeleza.beautyfair.com.br/wp-content/uploads/2023/11/unhas-francesinhas-2024-novas-ideias.png',
            }}
          />
        </View>
        <Button
          title="testes"
          onPress={() => {
            console.log(formatedDateList);
          }}></Button>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            Valor: {item.chosenService.price.toFixed(2)}R$
          </Text>
          <Text style={styles.bodyText}>
            Tempo Medio de {formatTime(item.chosenService.duration)}
          </Text>
          <Text style={styles.bodyText}>{item.chosenService.description}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.calender}>
            <View style={styles.month}>
              <Text>{'<'}</Text>
              <Text>{months[date.getMonth()]}</Text>
              <Text>{'>'}</Text>
            </View>
            <ScrollView horizontal >
              {formatedDateList.map((day, key) => (
                <View style={styles.week} key={key}>
                  <Text>{day.weekDay}</Text>
                  <Text>{day.number}</Text>
                </View>
              ))}
            </ScrollView>
            <View>
              <Text>{date.getFullYear()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 220,
  },
  header: {
    backgroundColor: '#cb8fdd',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginRight: 'auto',
    paddingHorizontal: 15,
    zIndex: 10,
    position: 'absolute',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  imageHeader: {
    height: '100%',
  },
  body: {
    backgroundColor: '#cb8fdd',
    padding: 20,
    marginLeft: 15,

    borderWidth: 2,
    borderColor: '#fff',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: -10,
  },
  bodyText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: '#cb8fdd',
    padding: 20,
    marginRight: 15,

    borderWidth: 2,
    borderColor: '#fff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 5,
    alignItems: 'center',
    marginBottom: 50,
  },
  calender: {
    backgroundColor: '#fff',
    width: '100%',
    height: 300,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6a2c81',
    borderRadius: 5,
  },
  month: {
    flexDirection: 'row',
  },
  week: {
    borderWidth: 1,
    padding: 5,
  },
});
