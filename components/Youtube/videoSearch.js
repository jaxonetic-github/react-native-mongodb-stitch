//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
//import react in our code. 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, ListView, TextInput, ActivityIndicator,FlatList, Alert} from 'react-native';
import { SwipeRow,Container, Subtitle, Header, Content, List, ListItem,Title,Icon, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import {resourceData,ALT_LISTVIEW_ITEM_SEPARATOR, COMMON_LISTVIEW_ITEM_SEPARATOR,COMMON_DARK_BACKGROUND,ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR} from '../../constants.js'
import WebResourcesList from '../WebResources/webResourcesList.js';
/**
 * Represents a component that allows a user to search for events.
 */
 class VideoSearch extends Component {

  constructor(props) {
    super(props);
    //setting default state
    console.log("props", props);
    console.log("this.params",this.props.navigation.state.params.record );
          this.state={record:null}
    }

  /** Loads events into the component */
  async componentDidMount() {
        
          const videoData = resourceData.youTubeResources;
          this.setState({
            record:videoData
          })   
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

    return newData;
  }

/**
 * Filter events based on what the user types in the search field
 *
 * @Rreturn events with the text parameter in part of it's data fields
 */
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.props.events.filter(function(item) {
      // ignore undefined rows brought from DB
      if (!item) 
      { 
        console.log('Todo: Log this (Undefined Events from DB)');
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
   this.props.navigation.navigate('EventView',{id:itemId})
  };
  /* Navigate to artist-creation screen on [add] buttonpress  */
  _onPressNew = () => (this.props.navigation.push('EventView', { } ))
//onPress={() => this.props.navigation.push('EventView', { })} 
/** Navigate to event-creation screen  */
   _onPressDelete = (itemId) => {
  this.props.deleteEventRequest({id:itemId})
  };

/**
  * A component to display a summary of an individual event from the list of events
  * available to the component
  * @param {object} item - event Data item
  *
_renderItem = (item) => { console.log(item);

  return(


    );
}

/*
* 
*/
  



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
      //ListView to show with textinput used as search bar 
      <Container>
        <Header style={styles.innerHeaderStyle}>
            <Body>
              <Title style={styles.textStyle}>Our Elders</Title>
<Subtitle>Malcom and Martin weren't our last leaders</Subtitle>
            </Body>
        </Header>

<Content style={{margin:10, backgroundColor:COMMON_DARK_BACKGROUND}}>
        {ALT_LISTVIEW_ITEM_SEPARATOR()}
   <View style={{backgroundColor:"gold"}}><Text>Our Master Teachers</Text></View>
           {ALT_LISTVIEW_ITEM_SEPARATOR()}
        <FlatList
            
          data={this.state.record}
          renderItem={(record)=>{
            return (<ListItem  style={{backgroundColor:"gold"}}>
              <Text>{record.item.title}</Text>
              <Button transparent onPress={() => {
                console.log("renderyoutubelistrenderitembuttonpress----",record.item);
               this.props.navigation.push('YouTubeList',{record:record.item, title:record.item.title})
              }}>
                  <Text>View</Text>
                </Button>
            </ListItem>);}
            }
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this.renderSearchField}
           ItemSeparatorComponent = {COMMON_LISTVIEW_ITEM_SEPARATOR}
        />
        {ALT_LISTVIEW_ITEM_SEPARATOR()}
   <View  style={{backgroundColor:"gold"}}><Text>Online Media Outlets</Text></View>
           {ALT_LISTVIEW_ITEM_SEPARATOR()}

        <FlatList
            horizontal
          data={resourceData.onlineMediaContent}
          renderItem={(record)=>{
            console.log(record.item);
            return (<ListItem  style={{backgroundColor:"gold", borderWidth:2, paddingLeft:15}}>
              <Text>{record.item.title}</Text>
              <Button transparent onPress={() => {
               this.props.navigation.push('SimpleWebView', {url:record.item.url , title:record.item.title})
              }}>
                  <Text>View</Text>
                </Button>
            </ListItem>);}
            }
          keyExtractor={(item, index) => item.title}
      
        ItemSeparatorComponent = {COMMON_LISTVIEW_ITEM_SEPARATOR}
        />
        {ALT_LISTVIEW_ITEM_SEPARATOR()}
   <View  style={{backgroundColor:"gold"}}><Text>Roads to the Community</Text></View>
           {ALT_LISTVIEW_ITEM_SEPARATOR()}
<WebResourcesList navigation={this.props.navigation} resourceData={resourceData.webResources}/>


        </Content>

      </Container>
    );
  }
}



const mapStateToProps = state => {
console.log('stateevents',state.events)
   const eventKeys = Object.keys(state.events.events)
console.log('mapstatetoprops events',eventKeys.map(pkey => state.events.events[pkey]));
  return {
        canAddEvent : (state.auth.auth!=1) && (state.auth.auth.auth.loggedInProviderName=="oauth2-google"),

    eventCount: eventKeys.length, 
    events: eventKeys.map(pkey => state.events.events[pkey])
  }

}




function matchDispatchToProps(dispatch){
  return bindActionCreators({deleteEventRequest: deleteEventRequest}, dispatch)
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
  },
innerHeaderStyle:{backgroundColor: COMMON_DARK_BACKGROUND},

  textStyle: {
    padding: 10, color:ACTIVE_TINT_COLOR
  },
bodyViewStyle:{flex:1},

  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});


export default connect(null,null )(VideoSearch)





