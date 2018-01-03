/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ActivityIndicator,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var Login =   require('./Login');
var AppContainer =   require('./AppContainer');
var AuthService = require('./AuthService');

export default class App extends Component<{}> {

  constructor(props){
    super(props);
     this.state = {isLoggedIn : false}
     this.state = {checkingAuth: true}
  }

  componentDidMount(){
      AuthService.getAuthInfo((err,authInfo) =>{
          this.setState({
            checkingAuth: false,
            isLoggedIn: authInfo != null
          })
      });
  }

  render() {
     if(this.state.checkingAuth){
        return (
            <View style={styles.container}>
              <ActivityIndicator
                  animating={true}
                  size='large'
                  style={styles.loader}/>
            </View>
          );
     }

    if(this.state.isLoggedIn){
      return(
        <AppContainer /> 
      );
    }else{
      return (
        <Login onLogin={() => {this.onLogin()}} />
      );
    } 
  }

  onLogin(){
    console.log('onLogin aaa');
    this.setState({
      isLoggedIn: true
    });
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  welcome:{
    fontSize: 20,
    color: '#333333',
    marginBottom: 5
  }
});
