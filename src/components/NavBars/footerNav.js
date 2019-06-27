import React from "react";
//import PropTypes from 'prop-types';

import { FlatList , Image, StyleSheet,TouchableOpacity } from "react-native";
//import { Image, StyleSheet } from "react-primitives";
import { Accordion, Text,View, Container,  ListItem,  Header, Content,
 Card, CardItem, Icon,Left, Body, Right,  Footer, FooterTab,Button,} from "native-base";
//redux 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//actions
//components
import Authentication from '../Authentication/authenticationComponent';
//constants
import {COMMON_LISTVIEW_ITEM_SEPARATOR, NEED_AT_LEAST_ANONYMOUS_LOGIN, COMMON_DARK_BACKGROUND, ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR} from '../../constants.js'
 import {  Link } from 'react-router'



/**
 * sideBar component manages the drawer sidebar
 */
class FooterNav extends React.Component {


/** Only show the rows that the user is entitled  to see.  This will be  moved into Stitch User roles later
*/
_listDataFilter= (data) =>{
  const tmpData = data.filter((item)=>{

  return ((item.requiresVerification && this.props.isLoggedIn)|| !item.requiresVerification)?true:false;

  })

  return tmpData;
}

/** The Header  section */
renderHeader = () =>{return(
   <Container style={styles.container}>     
    <Image
            style={styles.headerImageStyles}
            source={{
              uri:"https://i0.wp.com/www.experience-ancient-egypt.com/wp-content/uploads/2015/05/egyptian-goddess-maat.jpg"
            }}
          />
          </Container>
        )}

/** 
  * Render a listitem/row into the list
  */
      _renderRow=(data) => {
        let iosIcon = "ios-"+data.icon;
        let androidIcon = "md-"+data.icon;
               return (
                <FooterTab style={{backgroundColor:COMMON_DARK_BACKGROUND,flex:1, alignItems:"center", justifyContent:"space-around"}} key={data.routeName}>
                <Link to={"/"+data.routeName} component={TouchableOpacity} replace> 
                <View style={{flex:1, alignItems:"center"}}>                
               <Icon ios={iosIcon} android={androidIcon} style={{fontSize: 20, color: 'gold'}}/>
               <Text style={{backgroundColor:COMMON_DARK_BACKGROUND,flex:1, color: 'gold', alignItems:"center", justifyContent:"center"}}>{data.label}</Text>          
                </View>
            </Link></FooterTab>)
             }


 /**
  * Extract a key from an object for the List
  */
    _keyExtractor = (item, index) =>{  return item.routeName};


 /**
  * Render
  */
  render() {
  const footerTabs =this._listDataFilter(this.props.sideBarData).map((data)=>this._renderRow(data));
    return (<Footer style={{backgroundColor:COMMON_DARK_BACKGROUND}} >{footerTabs}</Footer>);
  }
}

const styles = StyleSheet.create({
  headerImageStyles:{
              height: 120,
              width: 250,
              position: "relative",
              alignSelf: "stretch",
              top: 10
            },
  listItemStyles:{ flex: 1, padding: 0, borderRadius: 15 },
  container: {
    backgroundColor:COMMON_DARK_BACKGROUND,
        borderRadius: 14,
    
    alignItems: 'center',
    height:125
  }
})

const mapStateToProps = state => (
    {isLoggedIn: (state.auth!=1) && (state.auth.auth.loggedInProviderName=="oauth2-google"),
    profileIndex: ((state.auth!= NEED_AT_LEAST_ANONYMOUS_LOGIN) &&  (state.auth.auth.loggedInProviderName=="oauth2-google") && state.auth.auth.userProfile.identities[0].id) ?state.auth.auth.userProfile.identities[0].id:null,
    sideBarData: state.sideBar,
})

/**
 * Potential properties to override state

FooterNav.propTypes = {
  
  sideBarData:PropTypes.array
}; */
export default connect(mapStateToProps, null)(FooterNav)





