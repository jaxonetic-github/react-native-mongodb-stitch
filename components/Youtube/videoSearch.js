//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import react in our code. 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, ListView, TextInput, ActivityIndicator,FlatList, Alert} from 'react-native';
import { SwipeRow,Container, Subtitle, Header, Content, List, ListItem,Title,Icon, Thumbnail, Text, Left, Body, Right, Button ,Accordion,Tab, Tabs,Card, CardItem} from 'native-base';
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
 * renderItem:Renders the listitem views for two lists in this VideoSearch view
 * @param record: record.item.payload should contain a non empty array
 */
renderItem =(record)=>{
 //doing a bit of filtering that should probably done earlier
 if(!record.item.payload && record.item.payload===''){ return null;}

//attempting to combine the renderItems for 2 possible route options
  const route = record.item.payload ? ROUTE_YOUTUBELIST_VIEW :ROUTE_SIMPLE_WEB_VIEW ;

   return (<ListItem style={styles.flexStyle}>       
   <Card style={styles.flexStyle}>
     <CardItem style={styles.flexStyle}>
      <View  style={styles.outerViewStyle}>
       <Thumbnail  source={{uri:/*item.item.imageURI||*/NO_PHOTO_AVAILABLE_URI}}/>
        <View><Title style={styles.title}>{record.item.title}</Title></View>
        <View style={styles.buttonContainer}>
            <Button transparent onPress={() => {this.props.navigation.push(route, {record:record.item, title:record.item.title, url:record.item.url})}}>
             <Text>{TEXT_VIEW}</Text>
            </Button>
             </View>
            </View>
          </CardItem> 
      <View style={styles.title}><Text>{record.item.generalCategory?record.item.generalCategory[0]:null}</Text></View>

</Card>

            </ListItem>);}


/** React Render
 * Render tabs
 **/
  render() {

    return (
      <Container>
    <Tabs>
    <Tab heading="Our Master Teachers">{renderListView(this._keyExtractor, null,this.renderItem, this.props.videoData, COMMON_LISTVIEW_ITEM_SEPARATOR, styles.outerViewStyle, styles.title,ROUTE_YOUTUBELIST_VIEW, TEXT_VIEW  )}</Tab>
    <Tab heading="Media Outlets">{renderListView( ((item, index) => item.title),null, this.renderItem, this.props.onlineMediaContent,COMMON_LISTVIEW_ITEM_SEPARATOR,styles.outerViewStyle, styles.title, ROUTE_SIMPLE_WEB_VIEW, TEXT_VIEW)}</Tab>
    <Tab heading="Roads to the Community"><WebResourcesList navigation={this.props.navigation}/></Tab>
  </Tabs>

      </Container>
    );
  }
}

/**
 * map redux state to component props
 */
const mapStateToProps = state => {
  console.log("videosearch resourcesdata",state.resourcesData);
  return {
    videoData: state.resourcesData.youTubeResources, 
    onlineMediaContent: state.resourcesData.onlineMediaContent,
    webResources: state.resourcesData.webResources
  }
}

/** component specific styles*/
const styles = StyleSheet.create({
  flexStyle:{flex:1},
  buttonContainer:{ flex:1,flexDirection: 'row', alignSelf:"flex-end", justifyContent:"flex-end"},
  title:{flex:1, alignSelf:"center"},
  innerHeaderStyle:{backgroundColor: COMMON_DARK_BACKGROUND},
  outerViewStyle:{flexDirection: 'row',flex:1},
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

/**
 * Potential properties to override state
 */
VideoSearch.propTypes = {
  videoData: PropTypes.array,
  onlineMediaContent: PropTypes.array,
  webResources:PropTypes.array
};
export default connect(mapStateToProps,null )(VideoSearch)





