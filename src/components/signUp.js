
// SignUp.js
import React from 'react'
import {
  Text,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'
import {  Container, Content, Card, CardItem} from "native-base";

import GoogleSignInComp from './Authentication/googleSignIn'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import {loginUserRequest} from './Authentication/Redux/Actions/authActions.js';


/**
 *  A component which allows a user to login anonymously for now
 */
 class SignUp extends React.Component {

 STATE_LOGIN  = "STATE_LOGIN";
 STATE_CREATE = "STATE_CREATE";
 STATE_REQUEST = "STATE_REQUEST";

    constructor(props) {
    super(props);
    //setting default state
    this.state={
    username: '', password: '', email: '', phone_number: '', signInState:this.STATE_LOGIN
  };
       }

  /** Check state for auth signal and navigate to app if authorized*/
async componentDidUpdate() {
  if(this.props.auth.userId)
  {
    this.props.navigation.navigate("Inner");
  }

}


  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  
   /** Capture user login attempts  and handle appropriate actions call or errors*/
    _signUp =() => {
    //const { username, password, email, phone_number } = this.state
    try {

      // send login action
     let tmp =  this.props.doLogin()
    console.log(tmp)
    } catch (err) {
      console.log('TODO: Properly handle or log this login attempt error.', err)
    }
  }
     responseGoogle(props) {
    console.log('googleresponse::==>>', props);
    //setting default state
     }


  render() {    
    return (
      <Container style={styles.container}>
        <Content style={styles.contentContainer}>
        <Card>
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />

         {(this.state.signInState === this.STATE_CREATE) &&
 <TextInput
          style={styles.input}
          placeholder='Profile Name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('profile_name', val)}
        />
      }
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
 {(this.state.signInState === this.STATE_CREATE) &&
 <TextInput
          style={styles.input}
          placeholder='Password Confirmation'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password_confirmation', val)}
        />
      }
</Card>

<Card>

  {(this.state.signInState === this.STATE_LOGIN) &&
 <CardItem>
         <GoogleSignInComp />
        </CardItem>
      }
      {(this.state.signInState === this.STATE_LOGIN) &&
 <CardItem>
          <Text>OR</Text>  
        </CardItem>
      } 
   {(this.state.signInState === this.STATE_LOGIN) &&
 <CardItem>
        <Button warning
          title='Create Account'
          onPress={ ()=>this.setState({signInState:this.STATE_CREATE})}
        />
         </CardItem>
      } 
   {(this.state.signInState === this.STATE_CREATE) &&
 <CardItem>
        <Button disabled
          title='Complete'
          onPress={ ()=>this.setState({signInState:this.STATE_REQUEST})}
        />

         </CardItem>
      } 
 
          </Card>

        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer:{ width:"100%"},
  input: {
   
    height: 40,
    backgroundColor: '#243244',
    margin: 4,
    padding: 0,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    width: "100%",
    flex: 1,
    justifyContent: 'center',
        borderRadius: 14,

    borderColor:'black',
    alignItems: 'center',
    height:'100%'
  }
})




const mapStateToProps = state => {
  console.log('----------------',state.auth.auth);
  return {auth:state.auth.auth};
}


function matchDispatchToProps(dispatch){
  return bindActionCreators({ doLogin: loginUserRequest }, dispatch);
}

//export default withRouter(connect(mapStateToProps, matchDispatchToProps)(SignUp))
export default connect(mapStateToProps, matchDispatchToProps)(SignUp);


