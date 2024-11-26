import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import AppointmentList from '../screens/AppointmentList';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MainTab() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'AppointmentList') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6a2c81',
        tabBarInactiveTintColor: '#6a2c81',
        tabBarStyle: {backgroundColor: '#cb8fdd'},
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} options={{title: 'Início'}} />
      <Tab.Screen
        name="AppointmentList"
        component={AppointmentList}
        options={{title: 'Agendamentos'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Usuario'}}
      />
    </Tab.Navigator>
  );
}
