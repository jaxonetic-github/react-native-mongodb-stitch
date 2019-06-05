
// SignUp.js
import React from 'react'
import {
  Text,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'
import {  Container,  Header, Content, Card, CardItem, Body} from "native-base";

import GoogleSignInComp from './Authentication/googleSignIn.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import {loginUserRequest} from './Authentication/Redux/Actions/authActions.js';


/**
 *  A component which allows a user to login anonymously for now
 */
 class Faqs extends React.Component {

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
     <CardItem>
     <Text>What did the white man come from?</Text>
     <Text>Where did the idea of "white" people come from?</Text>
     </CardItem>
     <CardItem>
     <Text>What did the white man come from?</Text>
     <Text>Where did the idea of "white" people come from?</Text>
     </CardItem>
     </Card>
    <Card>
     <CardItem>
      <Text>Why is Christopher Columbus a big deal?</Text>
     <View style={{padding:5, marginLeft:5, marginRight:5, borderWidth:1, borderRadius:10}}><Text>item.item.titlesertima</Text></View>
     <View style={{padding:5, marginLeft:5, marginRight:5, borderWidth:1, borderRadius:10}}><Text>item.item.titleDrJeffries</Text></View>
     </CardItem>
     </Card>
    
     
     <Card>
     <CardItem>
     <Text>Who and what are the Moors?</Text>
     <View style={{padding:5, marginLeft:5, marginRight:5, borderWidth:1, borderRadius:10}}><Text>item.item.titlesertima</Text></View>
     <View style={{padding:5, marginLeft:5, marginRight:5, borderWidth:1, borderRadius:10}}><Text>item.item.titlemoor</Text></View>
          <View style={{padding:5, marginLeft:5, marginRight:5, borderWidth:1, borderRadius:10}}><Text>item.item.titlebrKabahiwatha</Text></View>
          <View style={{padding:5, marginLeft:5, marginRight:5, borderWidth:1, borderRadius:10}}><Text>item.item.titledanareynolds</Text></View>
     </CardItem>
     <CardItem>
    
     </CardItem>
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




//export default withRouter(connect(mapStateToProps, matchDispatchToProps)(SignUp))
export default connect(null, null)(Faqs);


