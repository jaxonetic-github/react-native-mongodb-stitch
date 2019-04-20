 import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Button, StyleSheet} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import {Container, Accordion ,Content, Icon, Text } from 'native-base';
import { googleSignOut, loginUserRequest,updateInternetConnectivity } from './Redux/Actions/authActions.js';
import SignUp from '../signUp';
import {NEED_AT_LEAST_ANONYMOUS_LOGIN} from '../../constants.js'

import {getLoggedUser} from '../../redux/authSelectors.js';

//import { GoogleLogin } from 'react-google-login-component';
import GoogleSignInComp from './googleSignIn.js'

const dataArray = [
  { title: "Register", content: "Lorem ipsum dolor sit amet" },
];

class AuthenticationComponent extends React.Component{


async componentDidMount(){
 // this.setState({title:this._titleIfConnected()});
const _isConnectedToNetwork = await NetInfo.isConnected.fetch();

//listen for network connectivity changes
NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
}

/** 
 * At the moment simply note the change
 */
 handleConnectivityChange=(isConnected)=> {
  this.props.updateInternetConnectivity(isConnected);
}

 _titleIfConnected = () => {
    console.log(this.props.auth);
    const title = (this.props.isConnected? `Hello ${this.props.name}` : "Sign in");
    return title;
 }

  _renderContent = (item) =>{

    let contentView;
if (this.props.isConnected) {
      contentView = 
      <Button title="Logout" warning  onPress={() => this.props.googleSignOut()}  style={styles.buttonStyle} iconRight >
               <Icon ios='ios-log-out' android="md-log-out" style={{fontSize: 20, color: 'blue'}}/>
              </Button>
    } else {
      contentView = <SignUp/> ;
    }

    return (
      <View>
      <Text>{this.props.isConnected}</Text>
             {contentView}
      </View>
    );
  }


    _renderHeader=(item, expanded)=> {

     const title = this._titleIfConnected();
    return (
      <View style={{
        //flexDirection: "row",
       // padding: 10,
        //justifyContent: "space-between",
        alignItems: "center"  }}>
      <Text style={{ fontWeight: "600" }}>
          {" "}{title} 
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }



    render(){
      console.log("Rendererer")
return(
  <Accordion 
           
            dataArray={dataArray}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
)

 
}//render
}

function mapStateToProps(state){
	console.log((state.auth!= NEED_AT_LEAST_ANONYMOUS_LOGIN) ,'mapStatetoprops auth::', state.auth);
  console.log( (state.auth.loggedInProviderName=="oauth2-google") ,'mapStatetoprops auth::', state.auth.loggedInProviderName);
console.log(((state.auth!= NEED_AT_LEAST_ANONYMOUS_LOGIN) && state.auth.auth &&  (state.auth.auth.loggedInProviderName=="oauth2-google")));
 const isConnected =  ((state.auth!= NEED_AT_LEAST_ANONYMOUS_LOGIN) && state.auth.auth &&  (state.auth.auth.loggedInProviderName=="oauth2-google"));
    return { 
      /** Check if there is at least an anonymous authorized connection */
    isConnected:isConnected,
      name: isConnected? state.auth.auth.userProfile.name:"Divine",
      auth: state.auth  };
}


function matchDispatchToProps(dispatch){
  return bindActionCreators({googleSignOut:googleSignOut, loginUserRequest:loginUserRequest, 
                              updateInternetConnectivity:updateInternetConnectivity}, dispatch)
}


const styles = StyleSheet.create({
  container: {
    //justifyContent: 'center',
    //display: 'flex',
    margin: 0,
    padding: 0,
    backgroundColor:'black'
  },
  buttonStyle: { 
 	 backgroundColor: "pink" , borderStyle:'solid', borderColor:"maroon", padding: 0, margin:0,
  },
  textStyle: { 
  	 backgroundColor: "transparent" , borderStyle:'solid', borderColor:"maroon",
    padding: 10
  },

  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

export default connect(mapStateToProps, matchDispatchToProps)(AuthenticationComponent);
