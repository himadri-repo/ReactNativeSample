//jshint esversion:6
//jshint ignore:start
import  React from 'react';
import {StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, AppState} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Profile from './profile';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        //alert(JSON.stringify(props));
        this.state = {
            username: '',
            password: ''
        }
        this.prevState = '';
        AppState.addEventListener('change', this.requestItems);
    }

    requestItems = () => {
        console.log("Login :: " + AppState.currentState + " | Prev.State :: " + this.prevState );
    
        if(this.prevState==="background" && AppState.currentState==="active") {
            this._loadInitialState().done();
        }
    
        this.prevState = AppState.currentState;
    }
        
    getSnapshotBeforeUpdate(prevProps, prevState) {
        // this.prevProps = prevProps;
        // this.prevState = prevState;

        // alert(JSON.stringify(prevProps) + " - " + JSON.stringify(prevState));
        //alert('Login::getSnapshotBeforeUpdate');
        return 0;
    }

    componentDidUpdate(mProps, mState) {
        //mProps.navigation.prevPage = 'Login';
        //alert(JSON.stringify(mProps));
    }

    componentWillUnmount() {
        //alert('Login :: Unmount');
        AppState.removeEventListener('change', this.requestItems);

        console.log("Login: UM : " + JSON.stringify(this.props.navigation.state.params));
        //if(this.props.state && this.props.state.params) {
            let intension = this.props.navigation.state.params?this.props.navigation.state.params.intension:'N/A';
            console.log("Login :: did unmount | (State: " + AppState.currentState + ") | " + intension);
        //}
    }
    // componentWillReceiveProps(nextProps) {
    //     //alert('hi');
    // }

    componentDidMount() {
        try
        {
            //alert('Login :: did mount');
            console.log("Login: M : " + JSON.stringify(this.props.navigation.state.params));
            //if(this.props.navigation.state.params && this.props.navigation.state.params) {
                let intension = this.props.navigation.state.params?this.props.navigation.state.params.intension:'N/A';
                console.log("Login :: did mount | (State: " + AppState.currentState + ") | " + intension);
            //}
           
            if(intension.toLowerCase()!=='reset') {
                this._loadInitialState().done();
            }
        }
        catch(e) {
            alert(e);
        }
    }

    _loadInitialState = async () => {
        var user = await AsyncStorage.getItem('currentuser');
        alert(JSON.stringify(user));
        if(user) {
            alert(JSON.stringify(user));
            this.setState({'username': user.username, 'password': user.password});
            //this.props.navigation.prevPage = 'Login';
            this.props.navigation.navigate('Profile', {'prevPage': 'Login'});
        }
    };
    
    render() {
        let pic = {
          url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.header}>- Login -</Text>
                    <TextInput style={styles.textInput} placeholder='Username' onChangeText={ (username) => this.setState({username})} 
                                underlineColorAndroid='transparent'/>
                    <TextInput style={styles.textInput} placeholder='Password' onChangeText={ (password) => this.setState({password})} 
                                underlineColorAndroid='transparent'/>

                    <TouchableOpacity style={styles.btn} onPress={this.login}><Text>Log In</Text></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }

    login = async () => {
        //good return to profile.
        alert("State Username: " + this.state.username);
        await AsyncStorage.setItem('currentuser', JSON.stringify({username: this.state.username, password: this.state.password}));

        alert("After Save: " + JSON.stringify(await AsyncStorage.getItem('currentuser')));
        this.props.navigation.navigate('Profile', {'prevPage': 'Login'});
        //alert('Done!');
        
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
      alignItems: 'center',
      justifyContent: 'center',
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
        alignItems: 'center'
    }
  });
  //jshint ignore:end