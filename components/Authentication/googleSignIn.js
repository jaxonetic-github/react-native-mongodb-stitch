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
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { googleSignInRequest,googleServerAuthCodeReceived } from './Redux/Actions/authActions.js'

class GoogleSignInComp extends Component {

  
// Somewhere in your code
_signIn = async () => {
  try {
   
    this.props.googleSignInRequest();
    //this.props.loginUserRequest(userInfo)
  } catch (error) {
    console.error(error)
  }
};


  render() {
    return(
       <View style={styles.container}>
  <GoogleSigninButton
    style={styles.signInButtonStyles}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn}
/></View>
    )
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


