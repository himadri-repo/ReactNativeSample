//jshint esversion:6
import  React from 'react';
import {StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, BackHandler, Alert} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: ''
        }

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     alert(nextProps);
    // }

    // static getDerivedStateFromProps(nextProps, prevState) {
        
    // }

    // componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        if(this.prevPage.toLowerCase()=="login") {
            Alert.alert(
                'Exit App',
                'Do you want to exit?', [{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    onPress: () => BackHandler.exitApp()
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

    getSnapshotBeforeUpdate(prevProps, prevState) {
        this.prevProps = prevProps;
        this.prevState = prevState;

        //alert("getSnapshotBeforeUpdate - " + JSON.stringify(prevProps) + " - " + JSON.stringify(prevState));

        return 0;
    }

    componentDidUpdate(mProps, mState) {
        //alert("componentDidUpdate - Props: " + JSON.stringify(mProps) + "\nStates: " + JSON.stringify(mState));

        this.prevPage = mProps.navigation.state.params.prevPage;
        //alert("prevPage : " + mProps.navigation.state.params.prevPage);
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        var user = await AsyncStorage.getItem('currentuser');
        
        this.setState({username: user.username, password: user.password});
        if(user!==null) {
            this.props.navigation.navigate('Profile');
        }

    };
    
    render() {
        let pic = {
          url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };

        return (
            <View>
                <Text>Profile Page</Text>
            </View>
        );
    }
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