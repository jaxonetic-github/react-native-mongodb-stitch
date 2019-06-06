 import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Button, StyleSheet, PermissionsAndroid} from 'react-native';
import {Container, Accordion ,Content, Icon, Text } from 'native-base';
import { googleSignOut, loginUserRequest,updateInternetConnectivity } from './Redux/Actions/authActions.js';
import SignUp from '../signUp';
import {NEED_AT_LEAST_ANONYMOUS_LOGIN, COMMON_ICON_STYLE, ICON_ANDROID_LOGOUT, ICON_IOS_LOGOUT,
        ICON_REMOVE_CIRCLE, ICON_ADD_CIRCLE} from '../../constants.js'
import {getLoggedUser} from '../../redux/authSelectors.js';

//import { GoogleLogin } from 'react-google-login-component';
import GoogleSignInComp from './googleSignIn'

const dataArray = [
  { title: "Register", content: "Lorem ipsum dolor sit amet" },
];


/**
 *  A component to centralize the authentication and connectivity aspects of the application 
 */
class AuthenticationComponent extends React.Component{


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
      <Button title="Logout" warning  onPress={() => this.props.googleSignOut()}  iconRight >
               <Icon ios={ICON_IOS_LOGOUT} android={ICON_ANDROID_LOGOUT} style={COMMON_ICON_STYLE}/>
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
      <View style={styles.header}>
      <Text >{title}</Text>
        {expanded
          ? <Icon style={COMMON_ICON_STYLE} name={ICON_REMOVE_CIRCLE} />
          : <Icon style={COMMON_ICON_STYLE} name={ICON_ADD_CIRCLE} />}
      </View>
    );
  }


/**  
 * Render Component
 */
    render(){
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
  header:{ alignItems: "center"  }
        //flexDirection: "row",
       // padding: 10,
        //justifyContent: "space-between",
       
        //flexDirection: "row",
       // padding: 10,
        //justifyContent: "space-between",
       // alignItems: "center"  
});

export default connect(mapStateToProps, matchDispatchToProps)(AuthenticationComponent);
