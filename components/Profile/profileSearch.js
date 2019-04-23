//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';

//import react in our code. 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, RefreshControl, StyleSheet, View, TextInput, ActivityIndicator, FlatList, Alert} from 'react-native';
import { SwipeRow, Container, Subtitle, Header, Content, List, ListItem,Title, Thumbnail,Icon, Text, Left, Body, Right, Button } from 'native-base';
import { NavigationEvents } from 'react-navigation';
 import {deleteProfileRequest,fetchProfileRequest} from './Redux/Actions/profile.js'
import {COMMON_ICON_STYLE, COMMON_DARK_BACKGROUND,COMMON_ACTIVITY_INDICATOR, ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR, ROUTE_PROFILE_VIEW,
        COMMON_LISTVIEW_ITEM_SEPARATOR, GOOGLE_PROVIDER_NAME, ROUTE_YOUTUBELIST_VIEW, TEXT_VIEW,NO_PHOTO_AVAILABLE_URI,
      renderListView} from '../../constants.js'

/**
 * A List component with search abilities
 */ 
 class SearchAndResultsScreen extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: '',   refreshing: false};
     }

 _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.fetchProfileRequest();
  }

  /** Loads profiles into the component */
  componentDidMount() {
          this.setState({ isLoading: false,  text: ''})
  }

/**
 * Filter events based on what the user types in the search field
 * and updates the local state text
 * @Rreturn events with the text parameter in part of it's data fields
 */ 
  SearchFilterAndUpdateStateFunction(text) {
    //passing the inserted text from textinput to filter user's viewable events
    const newData = this.SearchFilterFunction(text)

    //update state and re-render the list accordingly
    this.setState({ text: text });
  }

/**
 * Filter events based on what the user types in the search field
 *
 * @Rreturn events with the text parameter in part of it's data fields
 */
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.props.profiles.filter(function(item) {
     if (!item) 
      { 
        console.log('Todo: Log this (Undefined Profiles from DB)');
        return false;
      }
      //applying filter for the inserted text in search bar
      const name = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const description = item.description ? item.description.toUpperCase() : ''.toUpperCase();
      const phone = item.phone ? item.phone.toUpperCase() : ''.toUpperCase();
      const website = item.website ? item.website.toUpperCase() : ''.toUpperCase();
      const email = item.email ? item.email.toUpperCase() : ''.toUpperCase();

      const textData = text.toUpperCase();

      return ((name.indexOf(textData) > -1)||(description.indexOf(textData) > -1) ||
        (phone.indexOf(textData) > -1)||(website.indexOf(textData) > -1)||(email.indexOf(textData) > -1));
    });

    return newData;
  }



 /** Exract a key from an object for the List */
    _keyExtractor = (item, index) =>(item.id ? item.id.toString() : Math.floor(Math.random() * Math.floor(999999)));


/** Navigate to artist-creation screen on [add] buttonpress  */
  _onPress = (itemId) => (this.props.navigation.push(ROUTE_PROFILE_VIEW,{id:itemId}))

/** Navigate to artist-creation screen on [add] buttonpress  */
  _onPressNew = () => (this.props.navigation.push(ROUTE_PROFILE_VIEW ))


/** Navigate to event-creation screen  */
   _onPressDelete = (itemId) => {
  this.props.deleteProfileRequest({id:itemId})
  };

/** The Search field */
renderSearchField = () =>(
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterAndUpdateStateFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />)


/**
  * A component to display a summary of an individual event from the list of events
  * available to the component
  * @param {object} item - event Data item
  */
  _renderItem = (profile) => (

     <SwipeRow
            leftOpenValue={100}
            rightOpenValue={0}
            left={
              <Button iconLeft danger transparent onPress={()=>this._onPressDelete(profile.item.id)}>
                 <Icon name='trash' />
                  <Text>Delete</Text>
                </Button>
            }
            body={
                            
              <View  style={{ margin:0,padding:0, flexDirection: 'row',flex:1, justifyContent: 'center'}}>
              <Thumbnail source={{uri:profile.item.imageURI||NO_PHOTO_AVAILABLE_URI}}/>
              <Text style={{flex:1, alignSelf:"center"}}>{profile.item.name}</Text>
              <View style={{flex:1}}>
              <Button transparent  onPress={() => this._onPress(profile.item.id)} style={{flex:1,alignSelf:"flex-end"}}>
                  <Text>View</Text>
                </Button>
                </View >
                </View>

            }

          />
  );

/*
              <View style={{margin:0,padding:0, flexDirection: 'row',flex:1, justifyContent: 'center'}}>
              <Thumbnail source={{uri:profile.item.imageURI||NO_PHOTO_AVAILABLE_URI}}/>
    
    <View style={{flex:1,alignSelf:"flex-start"}}>
     <View style={{flex:1,alignSelf:"flex-end"}}>    
                  <Button transparent onPress={() => this._onPress(profile.item.id)}>
                  <Text>View</Text>
                </Button></View>
                <Text style={{flex:1,alignSelf:"center"}}>{profile.item.name}</Text>
                <Text note numberOfLines={2}>{profile.item.description}</Text>
              </View>
    */         

/*
* duplicate code also found in eventsearch
*/
  addButton = ()=>{
    const _addButton = this.props.canAddProfile 
      ?  (<Button transparent  onPress={()=>this._onPressNew()} >
             <Icon ios='ios-add-circle' android="md-add-circle" style={COMMON_ICON_STYLE}/>
               <Text style={styles.textStyle}>Add Artist</Text>
            </Button>)
      : null;
      return _addButton; }

/*
* Render component
*/
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (COMMON_ACTIVITY_INDICATOR);
    }

    return (
      <Container style={styles.viewStyle}>
        <Header  style={styles.innerHeaderStyle}>
            <Body>
              <Title style={styles.textStyle}>{this.props.profileCount} Artists</Title>
            </Body>
            <Right>{this.addButton()}</Right>
        </Header>
        <Content>
        {renderListView(this._keyExtractor, this.renderSearchField,this._renderItem, this.SearchFilterFunction(this.state.text), COMMON_LISTVIEW_ITEM_SEPARATOR, styles.outerViewStyle, styles.title,ROUTE_YOUTUBELIST_VIEW, TEXT_VIEW,NO_PHOTO_AVAILABLE_URI  )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
   title:{flex:1, alignSelf:"center"},
  innerHeaderStyle:{backgroundColor: COMMON_DARK_BACKGROUND},
  outerViewStyle:{ margin:0,padding:0, flexDirection: 'row',flex:1, justifyContent: 'center'},

  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
  },
  thumbnailStyle:{width:70 , height:70, borderRadius:15},
innerHeaderStyle:{backgroundColor: COMMON_DARK_BACKGROUND},
  rightText:{alignSelf:"flex-end"},

  textStyle: {
    padding: 10, color:ACTIVE_TINT_COLOR
  },

  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});



const mapStateToProps = state => {
  const profileKeys = Object.keys(state.profiles.profiles);

  return {
    canAddProfile : (state.auth!=1) && (state.auth.auth.loggedInProviderName==GOOGLE_PROVIDER_NAME),
    profileIndex : (state.auth!=1) && (state.auth.auth.loggedInProviderName==GOOGLE_PROVIDER_NAME) ? state.auth.auth.userProfile.identities[0].id: null,
    profileCount: profileKeys.length, 
    profiles: profileKeys.map(pkey => state.profiles.profiles[pkey])
  }

}


function matchDispatchToProps(dispatch){
  return bindActionCreators({fetchProfileRequest:fetchProfileRequest, deleteProfileRequest: deleteProfileRequest}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchAndResultsScreen)


