//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
//import react in our code. 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, ListView, TextInput, ActivityIndicator,FlatList, Alert} from 'react-native';
import { SwipeRow,Container, Subtitle, Header, Content, List, ListItem,Title,Icon, Thumbnail, Text, Left, Body, Right, Button ,Accordion,Tab, Tabs} from 'native-base';
import {resourceData,ALT_LISTVIEW_ITEM_SEPARATOR, COMMON_LISTVIEW_ITEM_SEPARATOR,
        COMMON_DARK_BACKGROUND,ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR,GOOGLE_PROVIDER_NAME,NEED_AT_LEAST_ANONYMOUS_LOGIN, NO_PHOTO_AVAILABLE_URI,
         ROUTE_EVENT_VIEW, ROUTE_SIMPLE_WEB_VIEW, ROUTE_YOUTUBELIST_VIEW,TEXT_VIEW,
        renderListView} from '../../constants.js'
import WebResourcesList from '../WebResources/webResourcesList.js';
/**
 * Represents a component that allows a user to search for events.
 */
 class VideoSearch extends Component {

  constructor(props) {
    super(props);
    //setting default state
          this.state={record:null}
    }

  /** Loads events into the component */
  async componentDidMount() {
        
    const videoData = resourceData.youTubeResources;
   this.setState({record:videoData})   
  }

/**
 * Filter events based on what the user types in the search field
 * and updates the local state text
 * @return events with the text parameter in part of it's data fields
 */ 
  SearchFilterAndUpdateStateFunction(text) {
    //passing the inserted text from textinput to filter user's viewable events
    const newData = this.SearchFilterFunction(text)

    //update state and re-render the list accordingly
    this.setState({ text: text });

    return newData;
  }

/**
 * Filter events based on what the user types in the search field
 *
 * @return events with the text parameter in part of it's data fields
 */
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.props.events.filter(function(item) {
      // ignore undefined rows brought from DB
      if (!item) 
      { 
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
    _keyExtractor = (item, index) =>(item.title);

/** Navigate to event-creation screen  */
   _onPress = (itemId) => {
   this.props.navigation.navigate(ROUTE_EVENT_VIEW,{id:itemId})
  };
  /* Navigate to artist-creation screen on [add] buttonpress  */
  _onPressNew = () => (this.props.navigation.push(ROUTE_EVENT_VIEW, { } ))
//onPress={() => this.props.navigation.push('EventView', { })} 
/** Navigate to event-creation screen  */
   _onPressDelete = (itemId) => {
  this.props.deleteEventRequest({id:itemId})
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


/** React Render **/
  render() {

    return (
      <Container>
    <Tabs>
    <Tab heading="Our Master Teachers">{renderListView(this._keyExtractor, this.state.record,this.props.navigation, COMMON_LISTVIEW_ITEM_SEPARATOR, styles.outerViewStyle, styles.title,ROUTE_YOUTUBELIST_VIEW, TEXT_VIEW,NO_PHOTO_AVAILABLE_URI  )}</Tab>
    <Tab heading="Media Outlets">{renderListView( ((item, index) => item.title), resourceData.onlineMediaContent,this.props.navigation, COMMON_LISTVIEW_ITEM_SEPARATOR,styles.outerViewStyle, styles.title, ROUTE_SIMPLE_WEB_VIEW, TEXT_VIEW,NO_PHOTO_AVAILABLE_URI)}</Tab>
    <Tab heading="Roads to the Community"><WebResourcesList navigation={this.props.navigation} resourceData={resourceData.webResources}/></Tab>
  </Tabs>

      </Container>
    );
  }
}


const mapStateToProps = state => {
   const eventKeys = Object.keys(state.events.events)

  return {
        canAddEvent : (state.auth.auth!=NEED_AT_LEAST_ANONYMOUS_LOGIN) && (state.auth.auth.auth.loggedInProviderName==GOOGLE_PROVIDER_NAME),

    eventCount: eventKeys.length, 
    events: eventKeys.map(pkey => state.events.events[pkey])
  }

}


function matchDispatchToProps(dispatch){
  return bindActionCreators({deleteEventRequest: deleteEventRequest}, dispatch)
}

const styles = StyleSheet.create({
  title:{flex:1, alignSelf:"center"},
  innerHeaderStyle:{backgroundColor: COMMON_DARK_BACKGROUND},
  outerViewStyle:{ margin:0,padding:0, flexDirection: 'row',flex:1, justifyContent: 'center'},
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});


export default connect(null,null )(VideoSearch)





