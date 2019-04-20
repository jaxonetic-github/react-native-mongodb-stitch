//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
//import react in our code. 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, ListView, TextInput, ActivityIndicator,FlatList, Alert} from 'react-native';
import { SwipeRow,Container, Subtitle, Header, Content, List, ListItem,Title,Icon, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import {deleteEventRequest} from './Redux/Actions/eventActions.js'
import {COMMON_ACTIVITY_INDICATOR, NO_PHOTO_AVAILABLE_URI, COMMON_DARK_BACKGROUND,ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR} from '../../constants.js'

/**
 * Represents a component that allows a user to search for events.
 */
 class EventSearchAndResultsScreen extends Component {

  constructor(props) {
    super(props);
    //setting default state
       this.state = { isLoading: true, text: ''};
  }

  /** Loads events into the component */
  componentDidMount() {
          this.setState({ isLoading: false});
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


  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={styles.listItemSeparatorStyle}
      />
    );
  };

 /** Exract a key from an object for the List */
    _keyExtractor = (item, index) =>(item.id ? item.id.toString() : Math.floor(Math.random() * Math.floor(999999)));

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
  */
_renderItem = (item) => { console.log(item);
//                

  return(

     <SwipeRow
            leftOpenValue={100}
            rightOpenValue={-75}
            left={
                <Button iconLeft danger transparent onPress={()=>this._onPressDelete(item.item.id)}>
                 <Icon name='trash' />

                  <Text>Delete</Text>
                </Button>
            }
            body={
              <View style={styles.viewStyle}>
              <Thumbnail source={{uri:/*item.item.imageURI||*/NO_PHOTO_AVAILABLE_URI}}/>
              <View style={styles.innerViewStyle}>
                  <Title style={styles.rightText} >{item.item.name}</Title>
                  <Text style={styles.rightText} >{item.item.calendar}</Text>
             <Text note numberOfLines={2}>{item.item.description}</Text>
              </View>
              </View>
            }
            right={
                <Button transparent onPress={() => this._onPress(item.item.id)}>
                  <Text>View</Text>
                </Button>

            }
          />

           
    );
}

/*
* 
*/
  addButton = ()=>{
    const _addButton = this.props.canAddEvent 
      ?  (<Button transparent  onPress={()=>this._onPressNew()} >
             <Icon ios='ios-add-circle' android="md-add-circle" style={{fontSize: 20, color: INACTIVE_TINT_COLOR}}/>
               <Text style={styles.textStyle}>New Event</Text>
            </Button>)
      : null;
      return _addButton; }



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
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (COMMON_ACTIVITY_INDICATOR );
    }

    return (
      //ListView to show with textinput used as search bar 
      <Container style={styles.viewStyle}>
        <Header style={styles.innerHeaderStyle}>
            <Body>
              <Title style={styles.textStyle}>{this.props.eventCount} Events</Title>
<Subtitle>Subtitle</Subtitle>
            </Body>
            <Right>             
           {this.addButton()}

            </Right>

        </Header>

<Content>

        <FlatList
              leftOpenValue="75"
            rightOpenValue="-75"
           
          data={this.SearchFilterFunction(this.state.text)}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this.renderSearchField}
           ItemSeparatorComponent = {this.ListViewItemSeparator}
        />
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
        canAddEvent : (state.auth!=1) && (state.auth.auth.loggedInProviderName=="oauth2-google"),

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
  innerViewStyle:{margin:5,padding:5, borderRadius:20,alignSelf:"flex-end", position:"absolute", top:0},
bodyViewStyle:{flex:1},
  rightText:{alignSelf:"flex-end"},

  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});


export default connect(mapStateToProps,matchDispatchToProps )(EventSearchAndResultsScreen)





