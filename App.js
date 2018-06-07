//jshint esversion:6
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './app/login';
import Profile from './app/profile';

// const Application = createStackNavigator({
//   Login: {
//     screen: Login,
//     navigationOptions: {
//       title: "Login",
//       header: {
//         visible: false,
//       },
//     },
//   },
//   Profile: {
//     screen: Profile,
//     navigationOptions: {
//       title: "Profile",
//       header: {
//         left: null,
//       }
//     },
//   }
// });

const Application = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({
        title: 'Login',
        header: null,
        headerBackImage: null,
        gesturesEnabled: false,
        headerLeft: null
      }),
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({navigation}) => ({
        title: 'Profile',
        headerStyle: {backgroundColor: '#034c96'},
        headerTitleStyle: {color: '#ffffff', textAlign: 'center', alignSelf: 'center',},
        headerBackImage: null,
        gesturesEnabled: false,
        headerLeft: null
      }),
    } 
  }, {navigationOptions: {
    title: 'This is testing',
    header: false
  }}
);
//   {
//     Login: {screen: Login},
//     Profile: {screen: Profile}
//   }, {navigationOptions: {
//     title: 'This is testing',
//     header: false
//   }}
// );

export default class App extends React.Component {
  render() {
    return (
      <Application />
    );
  }
}
