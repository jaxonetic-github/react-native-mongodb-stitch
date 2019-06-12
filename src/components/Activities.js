import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput} from 'react-native';
import { Container, Content, Tab, Tabs, TabHeading} from 'native-base';
import {COMMON_DARK_BACKGROUND, header} from './../constants.js'
import EventSearch from './Event/eventSearch.js'
import ProfileSearch from './Profile/profileSearch.js'

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
      return (<Container><Content padding>
  <Tabs locked>
    <Tab activeTabStyle={{backgroundColor:"silver"}} tabStyle={{backgroundColor:COMMON_DARK_BACKGROUND}} heading={"Events"}><EventSearch/></Tab>
    <Tab activeTabStyle={{backgroundColor:"silver"}} tabStyle={{backgroundColor:COMMON_DARK_BACKGROUND}} heading={"Profiles"}><ProfileSearch /></Tab>
  </Tabs></Content>
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





