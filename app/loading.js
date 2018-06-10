//jshint esversion: 6
//jshint ignore:start
import React from 'react';
import {Text, ActivityIndicator} from 'react-native';
import firebase from 'react-native-firebase';

export default class Loading extends React.Component {
    state = {stage: ''};
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user? "Profile":"Signup", {'prevPage': 'Loading'});
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Loading ...</Text>
                <ActivityIndicator size="large"/>
            </View>
        );
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
    text: {

    }
});

//jshint ignore:end