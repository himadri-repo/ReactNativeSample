//jshint esversion:6
import  React from 'react';
import {StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, BackHandler, Alert } from 'react-native';
import {StackNavigator} from 'react-navigation';
import RNExitApp from 'react-native-exit-app';
import {StackActions, NavigationActions} from 'react-navigation';

const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Login', params: {intension: 'reset'}}),
    ],
    key: null 
});

export default class Profile extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            userName: '',
            password: ''
        }
        this.prevPage = this.props.navigation.state.params.prevPage;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

        console.log("Profile : constructor");
    }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     alert(nextProps);
    // }

    // static getDerivedStateFromProps(nextProps, prevState) {
        
    // }

    componentWillMount() {
        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        //alert("Profile :: did mount");
        //alert(this.props.navigation.state.params.prevPage);
    }
    
    componentDidCatch(error, errorinfo) {
        console.log("we dis catch", error, errorinfo);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        console.log("Profile : handleBackButtonClick");
        if(this.prevPage.toLowerCase()=="login") {
            Alert.alert(
                'Exit App',
                'Do you want to exit?', [{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    onPress: () => {
                        //BackAndroid.exitApp();
                        try
                        {
                            console.log("Profile : handleBackButtonClick : onPress");
                            BackHandler.exitApp();
                            this.props.navigation.dispatch(resetAction);
                            //this.props.navigation.dispatch(resetAction);
                            return false;
                        }
                        catch(e) {
                            alert(e);
                        }

                        return true;
                    }
                }], 
                {
                    cancelable: false
                }
             );
        }
        else {
            this.props.navigation.goBack(null);
        }
        return true;
    }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     this.prevProps = prevProps;
    //     this.prevState = prevState;

    //     //alert("getSnapshotBeforeUpdate - " + JSON.stringify(prevProps) + " - " + JSON.stringify(prevState));

    //     return 0;
    // }

    componentDidUpdate(mProps, mState) {
        //alert("componentDidUpdate - Props: " + JSON.stringify(mProps) + "\nStates: " + JSON.stringify(mState));

        if(mProps.navigation.state.params!==null) {
            this.prevPage = mProps.navigation.state.params.prevPage;
            console.log(`Profile : componentDidUpdate : ${mProps.navigation.state.params.prevPage}`);
        }
        //alert("prevPage : " + mProps.navigation.state.params.prevPage);
    }

    componentDidMount() {
        console.log(`Profile : componentDidMount : ${this.props.navigation.state.params.prevPage}`);
    }
    
    render() {
        let pic = {
          url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };

        return (
            <View style={styles.container}>
                <Text>Profile Page</Text>
                <TouchableOpacity style={styles.btn} onPress={this.logout}><Text>Logout</Text></TouchableOpacity>
            </View>
        );
    }

    async removeItemValue(key) {
        try {
          AsyncStorage.removeItem(key).done();
          return true;
        }
        catch(exception) {
          return false;
        }
    }

    logout = () => {
        //good return to Login.
        this.removeItemValue('currentuser').done();
        this.props.navigation.navigate('Login', {'prevPage': 'Profile'});
    };
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
      flex: 1,
      paddingLeft: 40,
      paddingRight: 40,
      backgroundColor: '#2896d3',
      /*alignItems: 'center',
      justifyContent: 'center',*/
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontWeight: 'bold',
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        width: 70,
        alignItems: 'center'
    }
  });