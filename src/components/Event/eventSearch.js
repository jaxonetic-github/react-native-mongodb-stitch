//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
//import react in our code. 
import { connect } from 'react-redux';
import withRouter from '../../withRouterManager.js';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, TextInput,FlatList} from 'react-native';
import { SwipeRow,Container, Header, Content,Title,Icon,
Picker, Thumbnail, Text, Body, Right, Button } from 'native-base';
import {deleteEventRequest, addEventsToLocal,addEventRequest} from './Redux/Actions/eventActions.js'
import {COMMON_ACTIVITY_INDICATOR, NO_PHOTO_AVAILABLE_URI, COMMON_DARK_BACKGROUND,ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR,
ROUTE_EVENT_VIEW, TEXT_DELETE,EMPTY_STRING, TRANSPARENT_COLOR,ICON_ALL_TRASH,
GOOGLE_PROVIDER_NAME, LIST_SWIPELEFT_OPENVALUE, LIST_SWIPERIGHT_OPENVALUE, PLACEHOLDER_SEARCH_TEXT, TEXT_VIEW,
COMMON_LISTVIEW_ITEM_SEPARATOR,NEED_AT_LEAST_ANONYMOUS_LOGIN,ICON_IOS_CIRCLE,ICON_ANDROID_CIRCLE } from '../../constants.js'

/**
 * Represents a component that allows a user to search for events.
 */
 class EventSearchAndResultsScreen extends Component {

  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: EMPTY_STRING, location:"All"};
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

      //applying filter for the inserted text in search bar
      const name = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const description = item.description ? item.description.toUpperCase() : ''.toUpperCase();
      const phone = item.phone ? item.phone.toUpperCase() : ''.toUpperCase();
      const website = item.website ? item.website.toUpperCase() : ''.toUpperCase();
      const location = item.location ? item.location.toUpperCase() : ''.toUpperCase();
      const calendar = item.calendar ? item.calendar.toUpperCase() : ''.toUpperCase();
      const email = item.email ? item.email.toUpperCase() : ''.toUpperCase();

      const textData = text.toUpperCase();

      return ((location.indexOf(textData) > -1)||(calendar.indexOf(textData) > -1)||(name.indexOf(textData) > -1)||(description.indexOf(textData) > -1) ||
        (phone.indexOf(textData) > -1)||(website.indexOf(textData) > -1)||(email.indexOf(textData) > -1));
    });
    return newData;
  }


 /** Exract a key from an object for the List */
    _keyExtractor = (item, index) =>(item.id ? item.id.toString() : Math.floor(Math.random() * Math.floor(999999)));

/** Navigate to event-creation screen  */
   _onPress = (itemId) => {
console.log(ROUTE_EVENT_VIEW+"/"+itemId);
 this.props.history.push(ROUTE_EVENT_VIEW+"/"+itemId );
  };
  /* Navigate to artist-creation screen on [add] buttonpress  */
  _onPressNew =async () => {
        
//add a new local event
//const tst= await this.props.addEventRequest(tmpEvt);
//go to the detail of that local event
    this.props.history.push(ROUTE_EVENT_VIEW);
  }

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
_renderItem = (item) => { 
  return(<SwipeRow
            leftOpenValue={LIST_SWIPELEFT_OPENVALUE}
            rightOpenValue={LIST_SWIPERIGHT_OPENVALUE}
            left={
                <Button iconLeft danger transparent onPress={()=>this._onPressDelete(item.item.id)}>
                 <Icon name={ICON_ALL_TRASH} />
                  <Text>{TEXT_DELETE}</Text>
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
                  <Text>{TEXT_VIEW}</Text>
                </Button>
            }
          />);
}

/*
* 
*/
  addButton = ()=>{
    const _addButton = this.props.isGoogleUser 
      ?  (<Button transparent  onPress={()=>this._onPressNew()} >
             <Icon ios={ICON_IOS_CIRCLE} android={ICON_ANDROID_CIRCLE} style={{fontSize: 20, color: INACTIVE_TINT_COLOR}}/>
               <Text style={styles.textStyle}></Text>
            </Button>)
      : null;
      return _addButton; }


  onLocationChange(value: string) {
    this.setState({
      location: value
    });
  }


/** The Search field */
renderSearchField = () =>(
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterAndUpdateStateFunction(text)}
          value={this.state.text}
          underlineColorAndroid={TRANSPARENT_COLOR}
          placeholder={PLACEHOLDER_SEARCH_TEXT}
        />)

/** React Render **/
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (COMMON_ACTIVITY_INDICATOR );
    }
  const locations = this.props.events.map((event)=>(<Picker.Item key={event.id} label={event.location} value={event.location} />));

    return (
      //ListView to show with textinput used as search bar 
      <Container style={styles.viewStyle}>
        <Header style={styles.innerHeaderStyle}>
            <Body>
              <Title style={styles.textStyle}>{this.props.eventCount} Events</Title>
            </Body>
            <Right>             
           {this.addButton()}
            </Right>
        </Header>
       <Content>
            <Picker
              mode="dropdown"
              iosHeader="Locations"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
              style={{ width: undefined }}
              selectedValue={this.state.location}
              onValueChange={this.onLocationChange.bind(this)}
            >
            <Picker.Item key={"All"} label={"All Locations"} value={"All"} />
             {locations}
            </Picker>
        <FlatList
            leftOpenValue={LIST_SWIPELEFT_OPENVALUE}
            rightOpenValue={LIST_SWIPERIGHT_OPENVALUE}
           
          data={this.SearchFilterFunction(this.state.text)}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this.renderSearchField}
           ItemSeparatorComponent = {COMMON_LISTVIEW_ITEM_SEPARATOR}
        />
          </Content>
      </Container>
    );
  }
}



const mapStateToProps = state => {
   const eventKeys = Object.keys(state.events.events);
  const isConnected =  ((state.auth!== NEED_AT_LEAST_ANONYMOUS_LOGIN) && state.auth.auth &&  (state.auth.auth.loggedInProviderName===GOOGLE_PROVIDER_NAME));
const isGoogleUser = (isConnected && state.auth.auth.userProfile.identities[0].id);
  
console.log(isGoogleUser, "--",isConnected, "--",state.auth.auth.userProfile);
  return {
    isConnected : isConnected,
    isGoogleUser: (isConnected && state.auth.auth.userProfile.identities[0].id),

        canAddEvent : (state.auth!==1) && (state.auth.auth.loggedInProviderName==={GOOGLE_PROVIDER_NAME}),

    eventCount: eventKeys.length, 
    events: eventKeys.map(pkey => state.events.events[pkey])
  }

}




function matchDispatchToProps(dispatch){
  return bindActionCreators({addEventRequest:addEventRequest,addEventsToLocal:addEventsToLocal, deleteEventRequest: deleteEventRequest}, dispatch)
}

const styles = StyleSheet.create({
  viewStyle: {justifyContent: 'center',flex: 1,padding: 10,
  },
innerHeaderStyle:{backgroundColor: COMMON_DARK_BACKGROUND},height:50,
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


export default withRouter(connect(mapStateToProps,matchDispatchToProps )(EventSearchAndResultsScreen))





