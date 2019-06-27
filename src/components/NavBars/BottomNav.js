import React, { Component } from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import { NativeRouter, Link } from 'react-router-native'
import { BottomNavigation ,Navigation, Card, Tabs, Tab } from 'react-router-navigation'
import { connect } from 'react-redux';
//import { FaHome,  FaSearchengin, FaUser,FaRegBuilding } from "react-icons/fa";


import { NEED_AT_LEAST_ANONYMOUS_LOGIN,COMMON_DARK_BACKGROUND,COMMON_TEXT_STYLE,iconManager } from '../../constants.js';

/**
  * A Native-like Bottom Navigation bar for Apple or IOS (and web?)
  *
  */
 class BottomNav extends Component {

  constructor(props) {
    super(props);
  }

render=() =>{
const tabs = this.props.sideBarData.map((tabRecord)=>{
  const show = (!tabRecord.requiresVerification)||(tabRecord.requiresVerification && this.props.isLoggedIn );

  const tb = <Tab key={tabRecord.routeName}  labelStyle={styles.label} 
    path={tabRecord.path==="/Activities/ProfileView/"? tabRecord.path+this.props.profileIndex:tabRecord.path}
    label={tabRecord.label} />
      return show ? tb : null;
});
console.log(tabs);

  return (<View style={styles.bottomNavContainer}>
    <BottomNavigation   
        tabActiveTintColor={styles.tabActiveTintColor.color} 
        style={styles.lowBottomFix}
        tabStyle={styles.bottomNavTabStyle}>
 {tabs}
</BottomNavigation></View>);}

}

const mapStateToProps = state => (
    {isLoggedIn: (state.auth!=1) && (state.auth.auth.loggedInProviderName=="oauth2-google"),
    profileIndex: ((state.auth!= NEED_AT_LEAST_ANONYMOUS_LOGIN) &&  (state.auth.auth.loggedInProviderName=="oauth2-google") && state.auth.auth.userProfile.identities[0].id) ?state.auth.auth.userProfile.identities[0].id:null,

    sideBarData: state.sideBar,
})

const styles = StyleSheet.create({
  tabActiveTintColor:{color:"gold"},
  bottomNavTabStyle:{ opacity: .8,backgroundColor:COMMON_DARK_BACKGROUND },
  lowBottomFix:{marginBottom:20},
  bottomNavContainer :{height:70,backgroundColor:COMMON_DARK_BACKGROUND},
  label:{ backgroundColor:"silver", color:"gold", padding:10,}
});


export default connect(mapStateToProps, null)(BottomNav)

//     <FaBars color={COMMON_TEXT_STYLE} size="1.5em" style={{color:"white", paddingLeft:10, paddingTop:10, width:30}}/>
