//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import react in our code. 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, ListView, FlatList, Text, TextInput} from 'react-native';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { SwipeRow,Container, Subtitle, Header, Content, List, ListItem,
  Title,Icon,Picker, Thumbnail, Label,Item,
  Tab, Tabs,Card,TabHeading, CardItem} from 'native-base';
import {resourceData,ALT_LISTVIEW_ITEM_SEPARATOR, COMMON_LISTVIEW_ITEM_SEPARATOR,
        COMMON_DARK_BACKGROUND,ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR,GOOGLE_PROVIDER_NAME,NEED_AT_LEAST_ANONYMOUS_LOGIN, NO_PHOTO_AVAILABLE_URI,
         ROUTE_EVENT_VIEW, ROUTE_SIMPLE_WEB_VIEW, ROUTE_YOUTUBELIST_VIEW,TEXT_VIEW,
        renderListView, commonViewButton,header} from './../constants.js'
import WebResourcesList from './WebResources/webResourcesList.js';
import EventSearch from './Event/eventSearch.js'
import ProfileSearch from './Profile/profileSearch.js'

import {categories} from './../redux/state.js'
/**
 * Represents a Trubrary component. It is the portal and container for the "Library"
 */
 class Activities extends Component {

  constructor(props) {
    super(props);
    this.state = {searchText: '',selected: ""};
    }

/**
 * Filter events based on what the user types in the search field
 * and updates the local state text
 * @return events with the text parameter in part of it's data fields
 */ 
  SearchFilterAndUpdateStateFunction(text) {
    //passing the inserted text from textinput to filter user's viewable events
    const newData = this.SearchFilterFunction(text)
      console.log("item---",newData);

    //update state and re-render the list accordingly
    this.setState({ text: text });
    //  console.log("item---",newData);

    return newData;
  }

/**
 * Filter events based on what the user types in the search field
 *
 * @return events with the text parameter in part of it's data fields
 */
  SearchFilterFunction(text, collection) {
    const dataToFilter  = collection||this.props.videoData;
    const filterText = text?text.toUpperCase() : "";
    //passing the inserted text in textinput
    const newData = dataToFilter.filter(function(item) {
      // ignore undefined rows brought from DB
      if (!item) 
      { 
        return false;
      }
      //applying filter for the inserted text in search bar
      const name = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      return ((name.indexOf(filterText) > -1));
    });
    return newData;
  }


/** The Search field */
renderSearchField = () =>(
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterAndUpdateStateFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />)



  onValueChange = (value)=> {
    this.setState({
      selected: value
    });
  }


/** React Render
 * Render tabs
 **/
  render() {
    console.log("------",this.props);
      return (<Container>
  <Tabs locked>
    <Tab activeTabStyle={{backgroundColor:"silver"}} tabStyle={{backgroundColor:COMMON_DARK_BACKGROUND}} heading={"Events"}><EventSearch navigation={this.props}/></Tab>
    <Tab activeTabStyle={{backgroundColor:"silver"}} tabStyle={{backgroundColor:COMMON_DARK_BACKGROUND}} heading={"Profiles"}><ProfileSearch navigation={this.props}/></Tab>
  </Tabs>
           </Container>
    );
  }
}



/**
 * map redux state to component props
 */
const mapStateToProps = state => {
  return {
  }
}

/** component specific styles*/
const styles = StyleSheet.create({});


export default connect(mapStateToProps,null )(Activities)





