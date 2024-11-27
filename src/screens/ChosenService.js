import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Container from '../components/Container';
import {formatTime} from '../Api';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAppointments, getUserInfo, createAppointment} from '../Api';
import {useNavigation} from '@react-navigation/native';

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
  const weekDay = [
    'Domingo',
    'Segunda',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sabádo',
  ];
  const hours = [
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
  ];
  const navigation = useNavigation();

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
  const [selectedHour, setSelectedHour] = useState('');

  const [formatedDateList, setFormatedDateList] = useState([]);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [avaliableHours, setAvaliableHours] = useState([]);

  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userUid, setUserUid] = useState('');
  const [showLoadModal, setShowLoadModal] = useState(false);

  function getDaysInMonthSelected() {
    return new Date(selectedYear, selectedMonth, 0).getDate();
  }
  function filterDisponibilityHours() {
    let currentDate = selectedDay + '-' + selectedMonth + '-' + selectedYear;

    checkDisponibility = appointmentsList.filter(d => d.date == currentDate);
    if (checkDisponibility[0]) {
      let unavailableDate = checkDisponibility[0].unavailableDate;

      let newAvaliableHours = hours;

      for (let i = 0; i < unavailableDate.length; i++) {
        newAvaliableHours = newAvaliableHours.filter(
          h => h != unavailableDate[i].hour,
        );
      }
      setAvaliableHours(newAvaliableHours);
    } else {
      setAvaliableHours(hours);
    }
  }

  useEffect(() => {
    filterDisponibilityHours();
    async function updateAppointments() {
      try {
        let NewAppointments = await getAppointments();
        let newUserInfo = await getUserInfo();
        setUserName(newUserInfo.name);
        setUserPhone(newUserInfo.phone);
        setUserUid(newUserInfo.uid);
        setAppointmentsList(NewAppointments);
      } catch (error) {
        console.log(error);
      }
    }
    updateAppointments();

    function getFormatedDate() {
      let deaysInMonth = getDaysInMonthSelected();
      let daysList = [];

      for (let i = 1; i < deaysInMonth; i++) {
        let weekD = new Date(selectedYear, selectedMonth, i);
        daysList.push({
          number: i,
          weekDay: weekDay[weekD.getDay()],
          date: i + '-' + selectedMonth + '-' + selectedYear,
          avaliableTimes: [],
        });
      }
      setFormatedDateList(daysList);
    }
    getFormatedDate();
  }, [selectedMonth, selectedDay, selectedHour]);

  async function registerAppointment() {
    setShowLoadModal(true);
    const appointmentService = {
      date: selectedDay + '-' + selectedMonth + '-' + selectedYear,
      unavailableDate: [
        {
          hour: selectedHour,
          confirmed: false,
          serviceName: item.chosenService.name,
          value: item.chosenService.price.toFixed(2),
          dayNumber: selectedDay,
          weekDay:
            weekDay[
              new Date(selectedYear, selectedMonth, selectedDay).getDay()
            ],
          hour: selectedHour,
          clientName: userName,
          clientPhone: userPhone,
          uid: userUid,
        },
      ],
    };

    await createAppointment(appointmentService);
    setSelectedDay('');
    setSelectedHour('');
    setShowLoadModal(false);
    navigation.navigate('AppointmentList');
  }

  function previusMonth() {
    if (selectedYear > currentYear) {
      if (selectedMonth !== 0) {
        setSelectedDay('');
        setSelectedMonth(m => m - 1);
      } else {
        setSelectedMonth(11);
        setSelectedYear(y => y - 1);
      }
    } else if (selectedYear == currentYear && selectedMonth > currentMonth) {
      setSelectedDay('');
      setSelectedMonth(m => m - 1);
    } else {
      alert('nao é possivel marcar horario no passado');
    }
  }

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
          <Text style={styles.footerTitle}>Horarios Disponiveis:</Text>
          <View style={styles.calender}>
            <View style={styles.month}>
              <TouchableOpacity
                onPress={() => {
                  previusMonth();
                }}>
                <Icon name="arrow-back" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.monthText}>{months[selectedMonth]}</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedDay('');
                  if (selectedMonth !== 11) {
                    setSelectedMonth(m => m + 1);
                  } else {
                    setSelectedMonth(0);
                    setSelectedYear(y => y + 1);
                  }
                }}>
                <Icon name="arrow-forward" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginHorizontal: 15}}>
              {formatedDateList.map((day, key) => (
                <TouchableOpacity
                  style={[
                    styles.week,
                    {
                      backgroundColor:
                        day.number == selectedDay ? '#2196F3' : '#cb8fdd',
                    },
                  ]}
                  key={key}
                  onPress={() => {
                    setSelectedDay(day.number);
                    setSelectedHour('');
                  }}>
                  <Text style={styles.weekText}>
                    {day.weekDay.substring(0, 3)}
                  </Text>
                  <Text style={styles.weekText}>{day.number}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text
              style={[
                styles.weekText,
                {fontSize: 20, fontWeight: 'bold', marginTop: 30},
              ]}>
              Dia {selectedDay}{' '}
              {
                weekDay[
                  new Date(selectedYear, selectedMonth, selectedDay).getDay()
                ]
              }
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginHorizontal: 15}}>
              {avaliableHours.map((hour, key) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.hours,
                      {
                        backgroundColor:
                          hour == selectedHour ? '#2196F3' : '#cb8fdd',
                      },
                    ]}
                    key={key}
                    onPress={() => {
                      setSelectedHour(hour);
                    }}>
                    <Text style={styles.weekText}>{hour}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View
              style={{
                width: '100%',
                alignItems: 'flex-end',
                marginTop: 20,
                marginRight: 10,
              }}>
              <Text style={styles.weekText}>{selectedYear}</Text>
            </View>
            <TouchableOpacity
              style={styles.makeAppointment}
              onPress={() => {
                if (selectedDay != '' && selectedHour != '') {
                  registerAppointment();
                } else {
                  alert('Preencha todos os campos');
                }
              }}>
              <Text style={styles.makeAppointmentText}>Marcar Horario</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.makeAppointment}
              onPress={() => {
                previusMonth();
              }}>
              <Text style={styles.makeAppointmentText}>teste</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {showLoadModal && (
        <View style={styles.modal}>
          <ActivityIndicator
            color={'#fff'}
            size={'large'}
            clo></ActivityIndicator>
        </View>
      )}
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
  footerTitle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },

  calender: {
    backgroundColor: '#6a2c81',
    width: '100%',
    minHeight: 150,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  month: {
    flexDirection: 'row',

    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  monthText: {
    fontSize: 18,
    color: '#fff',
  },
  week: {
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    width: 50,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 5,
    borderColor: '#fff',
    backgroundColor: '#cb8fdd',
  },
  weekText: {
    color: '#fff',
    fontSize: 16,
  },
  hours: {
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',

    width: 60,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 5,
    borderColor: '#fff',
    backgroundColor: '#cb8fdd',
  },
  makeAppointment: {
    backgroundColor: '#2196F3',
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    marginHorizontal: 'auto',
    marginBottom: 50,
  },
  makeAppointmentText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  modal: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

    justifyContent: 'center',
  },
});
