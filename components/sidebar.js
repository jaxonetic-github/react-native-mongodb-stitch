import React from "react";
//import PropTypes from 'prop-types';

import { FlatList , Image, StyleSheet } from "react-native";
//import { Image, StyleSheet } from "react-primitives";
import { Accordion, Text,View, Container,  ListItem,  Header, Content, Card, CardItem, Icon,Left, Body, Right} from "native-base";
//redux 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//actions
import {deleteProfileRequest,fetchProfileRequest} from './Profile/Redux/Actions/profile.js'
//components
import Authentication from './Authentication/authenticationComponent.js';
//constants
import {COMMON_LISTVIEW_ITEM_SEPARATOR, NEED_AT_LEAST_ANONYMOUS_LOGIN, COMMON_DARK_BACKGROUND, ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR} from './../constants.js'
 


/**
 * sideBar component manages the drawer sidebar
 */
class SideBar extends React.Component {


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
        let iosIcon = "ios-"+data.item.icon;
        let androidIcon = "md-"+data.item.icon;
               return (
                <ListItem style={styles.listItemStyles}
                  button onPress={() => this.props.navigation.navigate(data.item.routeName, {user:true, id:this.props.profileIndex})}>

                  <Left>
               <Icon ios={iosIcon} android={androidIcon} style={{fontSize: 20, color: '#000'}}/>
               <Text>{data.item.label}</Text>
              </Left>            
            </ListItem>)
             }


 /**
  * Exract a key from an object for the List
  */
    _keyExtractor = (item, index) =>{  return item.routeName};


 /**
  * Render
  */
  render() {
    return (
      <Container>
<Content>
<Card>
<CardItem>
 <FlatList
          ListHeaderComponent={this.renderHeader}
          data={this._listDataFilter(this.props.sideBarData)}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
           ItemSeparatorComponent = {COMMON_LISTVIEW_ITEM_SEPARATOR}
        />
 </CardItem>  
 <CardItem>      
<Authentication/>
</CardItem>
</Card>
     </Content>
      </Container>
    );
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

SideBar.propTypes = {
  
  sideBarData:PropTypes.array
}; */
export default connect(mapStateToProps, null)(SideBar)





