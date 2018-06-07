//jshint esversion:6
import  React from 'react';
import {StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage} from 'react-native';
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

    // componentWillReceiveProps(nextProps) {
    //     //alert('hi');
    // }

    componentDidMount() {
        try
        {
            this._loadInitialState().done();
        }
        catch(e) {
            alert(e);
        }
    }

    _loadInitialState = async () => {
        var user = await AsyncStorage.getItem('currentuser');
        if(user!==null) {
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

    login = () => {
        //good return to profile.
        alert(this.state.username);
        AsyncStorage.setItem('currentuser', JSON.stringify({username: this.state.username, password: this.state.password})).done();
        //alert('Done!');
        this.props.navigation.navigate('Profile', {'prevPage': 'Login'});
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