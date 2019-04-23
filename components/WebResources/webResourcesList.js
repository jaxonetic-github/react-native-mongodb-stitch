//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
//import react in our code. 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, ListView, TextInput, ActivityIndicator,FlatList,Image, Alert,TouchableOpacity, ImageBackground} from 'react-native';
import { Container, Subtitle, Header, Content, List, ListItem,Title,Icon, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import {resourceData,COMMON_ICON_STYLE, COMMON_DARK_BACKGROUND, NO_PHOTO_AVAILABLE_URI, COMMON_LISTVIEW_ITEM_SEPARATOR,
        ROUTE_SIMPLE_WEB_VIEW, ROUTE_EVENT_VIEW} from '../../constants.js'

/**
 * A list of imaged links .
 *  <WebResourcesList/>
 */
 class WebResourcesList extends Component {

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

 /** Exract a key from an object for the List */
    _keyExtractor = (item, index) =>{console.log(item); 
      return (item.url ? item.url.toString() : Math.floor(Math.random() * Math.floor(999999)))};

/**
  * A component to display a summary of an individual event from the list of events
  * available to the component
  * @param {object} item - event Data item
  
  */
_renderItem = (item) => 
 {
 return (
            <ListItem style={{backgroundColor:"transparent",  justifyContent:"center", flex:1}}>  
            <Thumbnail  large source={{uri:(item.item.imageURI||NO_PHOTO_AVAILABLE_URI)}} style={{padding:30, width:190}}/>
    <View style={{flex:1, alignSelf:"flex-end"}}>
      <TouchableOpacity  onPress={() => this.props.navigation.push(ROUTE_SIMPLE_WEB_VIEW, {url:item.item.url , title:item.item.title})} >
      <Text>{item.item.title}</Text>   
      </TouchableOpacity>
    </View>
            </ListItem>
    );
}

  render() {

    return (
      //ListView to show with textinput used as search bar 
      <Container style={styles.viewStyle}>
        <Header >
        <Body>
           <Text>Keeping it in the Community</Text> 
        </Body>
            <Right>             
            <Button transparent disabled onPress={() => this.props.navigation.push('EventView', { })} >
             <Icon ios='ios-information-circle' android="md-information-circle" style={COMMON_ICON_STYLE}/>
            </Button>
            </Right>

        </Header>
<Content>

        <FlatList style={{backgroundColor:"transparent", margin:0, padding:0}}
          data={this.props.webResources}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}

           ItemSeparatorComponent = {COMMON_LISTVIEW_ITEM_SEPARATOR}
        />
              </Content>

      </Container>
    );
  }
}


const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
  },
imageStyle:{padding:0,width: 250, height: 110}

});

const mapStateToProps = state => ({webResources: state.resourcesData.webResources})
export default connect(mapStateToProps,null )(WebResourcesList)





