import React from "react";
import { FlatList, Image, StatusBar,StyleSheet } from "react-native";
import { Accordion, Text,View, Container, List, ListItem,  Header, Content, Card, CardItem, Icon,Left, Body, Right} from "native-base";
//redux 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//actions
import {deleteProfileRequest,fetchProfileRequest} from './Profile/Redux/Actions/profile.js'
//components
import Authentication from './Authentication/authenticationComponent.js';
//constants
import {NEED_AT_LEAST_ANONYMOUS_LOGIN, COMMON_DARK_BACKGROUND, ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR} from './../constants.js'
 
const sideBarData = [{routeName:"Home", label:"Home", requiresVerification:false, icon:"home"}, {routeName:"ProfileView", label:"Profile", requiresVerification:true, icon:"person"}, 
                      {routeName:"SearchLayout", label:"Events & Creators", requiresVerification:false, icon:"search"},{routeName:"VideoSearch", label:"Library", requiresVerification:false, icon:"hourglass"},
                      {routeName:"Community", label:"Community", requiresVerification:false, icon:'business'}];

/** sideBar component manages the drawer sidebar */
class SideBar extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
                  dataArray : sideBarData
                  };
  }

/** The separator for the FlatList */
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={styles.listLineSeparator}
      />
    );
  };


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
                  button
                  onPress={() => this.props.navigation.navigate(data.item.routeName, {user:true, id:this.props.profileIndex})}>

                  <Left>
               <Icon ios={iosIcon} android={androidIcon} style={{fontSize: 20, color: '#000'}}/>
               <Text>{data.item.label}</Text>
              </Left>            

                </ListItem>)
            
             }


 /** Exract a key from an object for the List */
    _keyExtractor = (item, index) =>{  return item.routeName};

  render() {
    return (
      <Container>
<Content>
<Card>
<CardItem>
 <FlatList
          ListHeaderComponent={this.renderHeader}
          data={this._listDataFilter(this.state.dataArray)}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
           ItemSeparatorComponent = {this.ListViewItemSeparator}
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
  listItemStyles:{ flex: 1, padding: 0,borderRadius: 15 },
 listLineSeparator:{  height: 1,
          backgroundColor: COMMON_DARK_BACKGROUND},
  container: {
    //flex: 1,
    //justifyContent: 'center',
    backgroundColor:COMMON_DARK_BACKGROUND,
        borderRadius: 14,
    padding:0,
    borderColor:'black',
    alignItems: 'center',
    height:125
  }
})



const mapStateToProps = state => (
    {isLoggedIn: (state.auth!=1) && (state.auth.auth.loggedInProviderName=="oauth2-google"),
    profileIndex: ((state.auth!= NEED_AT_LEAST_ANONYMOUS_LOGIN) &&  (state.auth.auth.loggedInProviderName=="oauth2-google") && state.auth.auth.userProfile.identities[0].id) ?state.auth.auth.userProfile.identities[0].id:null,
}
)


export default connect(mapStateToProps, null)(SideBar)





