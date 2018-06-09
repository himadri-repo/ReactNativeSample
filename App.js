//jshint esversion:6
import React from 'react';
import { StyleSheet, Text, View, Image, BackHandler, AppState } from 'react-native';
import {createStackNavigator, StackNavigator, StackActions, NavigationActions} from 'react-navigation';
import Login from './app/login';
import Profile from './app/profile';

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
      params: {intension: ''}
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
      params: {intension: ''}
    } 
  }, {navigationOptions: {
    title: 'This is testing',
    header: false
  }}
);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {hasError: false};
    this.prevState = '';
  }

  componentDidCatch(error, errorinfo) {
      this.setState({ hasError: true });
      console.log("we did catch", error, errorinfo);

      //BackHandler.exitApp();
  }
  
  requestItems = () => {
    console.log("App :: " + AppState.currentState + " | Prev.State :: " + this.prevState );
    this.prevState = AppState.currentState;
  }

  componentWillMount() {
    AppState.addEventListener('change', this.requestItems);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.requestItems);
  }

  render() {
    if(!this.state.hasError) {
      return (
        <Application/> 
      );
    }
    else {
      return null;
    }
  }
}
