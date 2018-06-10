//jshint esversion: 6
//jshint ignore:start
import React from 'react';
import {StyleSheet,Text, TextInput, KeyboardAvoidingView, TouchableOpacity, AppState} from 'react-native';
import firebase from 'react-native-firebase';

export default class Signup extends React.Component {
    state = {username: '', password: '', errorMessage: null};

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View styles={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage && 
                    <Text style={{color: '#ff0000'}}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput placeholder="Email"
                    autoCapitalize="none" style={styles.textInput} onChangeText={email => this.setState({email})} 
                    value={this.state.email}>
                </TextInput>
                <TextInput secureTextEntry placeholder="Password" autoCapitalize="none" style={styles.textInput} 
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password} />
                <Button title="Sign Up" onPress={this.handleSignUp} />
                <Button
                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        );
    }

    handleSignUp = () => {
        console.log('handleSignUp');
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(()=> {
            this.props.navigation.navigate('Profile', {'prevPage': 'Signup'});
        }).catch(error => this.setState({errorMessage: error.message}));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: '#2896d3',
        justifyCenter: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
});
//jshint ignore:end