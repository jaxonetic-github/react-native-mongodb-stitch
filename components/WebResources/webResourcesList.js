//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
//import react in our code. 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, ListView, TextInput, ActivityIndicator,FlatList,Image, Alert,TouchableOpacity} from 'react-native';
import { Container, Subtitle, Header, Content, List, ListItem,Title,Icon, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import {resourceData, COMMON_DARK_BACKGROUND, NO_PHOTO_AVAILABLE_URI} from '../../constants.js'

/**
 * A list of imaged links .
 *  <WebResourcesList/>
 */
 class WebResourcesList extends Component {

  constructor(props) {
    super(props);
console.log("props;;",props);
    this.state = { webResources :props? props.resourceData: {}};
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
//console.log('eventsfilterfunct', newData);
    return newData;
  }


  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 5,
          
          backgroundColor: COMMON_DARK_BACKGROUND,
        }}
      />
    );
  };

 /** Exract a key from an object for the List */
    _keyExtractor = (item, index) =>{console.log(item); 
      return (item.url ? item.url.toString() : Math.floor(Math.random() * Math.floor(999999)))};

/** Navigate to event-creation screen  */
   _onPress = (itemId) => {
   this.props.navigation.navigate('EventView',{id:itemId})
  };
  
/** Navigate to event-creation screen  */
   _onPressDelete = (itemId) => {
  this.props.deleteEventRequest({id:itemId})
  };

/**
  * A component to display a summary of an individual event from the list of events
  * available to the component
  * @param {object} item - event Data item
  */
_renderItem = (item) => 
 {
 return (
            <ListItem thumbnail>
 
<TouchableOpacity  style={styles.touchable} onPress={() => this.props.navigation.push('SimpleWebView', {url:item.item.url , title:item.item.title})} >
 
          <Text>{item.item.title}</Text>
            <View style={styles.view}>
          <Image  source={{uri:(item.item.imageURI||NO_PHOTO_AVAILABLE_URI)}} style={{padding:0,width: 250, height: 110}}/>

            </View>
          </TouchableOpacity>
            </ListItem>
    );
}

  render() {

    return (
      //ListView to show with textinput used as search bar 
      <Container style={styles.viewStyle}>
        <Header >
            <Body>
              <Title>Community</Title>
<Subtitle>Keep it in the community</Subtitle>
            </Body>
            <Right>             
            <Button transparent  onPress={() => this.props.navigation.push('EventView', { })} >
             <Icon ios='ios-information-circle' android="md-information-circle" style={{fontSize: 30,  color: COMMON_DARK_BACKGROUND}}/>
            </Button>
            </Right>

        </Header>
<Content>

        <FlatList
          
          data={resourceData.webResources}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}

           ItemSeparatorComponent = {this.ListViewItemSeparator}
        />
              </Content>

      </Container>
    );
  }
}


const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
  },

  textStyle: {
    padding: 10,
  },

  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
  },
});


export default connect(null,null )(WebResourcesList)





