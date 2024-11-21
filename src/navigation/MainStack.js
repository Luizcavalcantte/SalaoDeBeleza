import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import MainTab from './MainTab';
import LoadScreen from '../screens/LoadScreen';
import ServiceCategory from '../screens/ServiceCategory';
import ChosenService from '../screens/ChosenService';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoadScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoadScreen" component={LoadScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="ServiceCategory" component={ServiceCategory} />
      <Stack.Screen name="ChosenService" component={ChosenService} />
    </Stack.Navigator>
  );
}
