/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,NativeModules} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { googleSignInRequest,googleServerAuthCodeReceived } from './Redux/Actions/authActions.js'
import { GoogleLogin } from 'react-google-login';

class GoogleSignInComp extends Component {

  
// Somewhere in your code
_signIn = async (response) => {
  try {
   console.log("signIn response->",response);
    this.props.googleSignInRequest(response);
    //this.props.loginUserRequest(userInfo)
  } catch (error) {
    console.error(error)
  }
};


  render() {
    return(
       <View style={styles.container}>
       <GoogleLogin
    clientId="296133059037-s1j268jatnjbgrrkgtjv2sfn85qupakt.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this._signIn}
    onFailure={this._signIn}
    cookiePolicy={'single_host_origin'}
  />
</View>)
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }, 
  signInButtonStyles:{ width: 200, height: 45 }
});


function matchDispatchToProps(dispatch){
  return bindActionCreators({googleSignInRequest:googleSignInRequest }, dispatch)
}

export default connect(null, matchDispatchToProps)(GoogleSignInComp)


