import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, Platform} from 'react-native';
import { Container, Content , Tab as NativeTab, Tabs as NativeTabs} from 'native-base';
import {COMMON_DARK_BACKGROUND} from '../../constants.js'
import EventSearch from '../Event/eventSearch'
import ProfileSearch from '../Profile/profileSearch.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
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

  const webActivitiesView =()=>(<Container><Content padding>
        <Tabs>
    <TabList>
      <Tab>Events</Tab>
      <Tab>Profile</Tab>
    </TabList>
    <TabPanel ><EventSearch/></TabPanel>
    <TabPanel ><ProfileSearch /></TabPanel>
  </Tabs>
</Content></Container>);
  
 const nativeView =()=><NativeTabs locked>
    <NativeTab activeTabStyle={{backgroundColor:"silver"}} tabStyle={{backgroundColor:COMMON_DARK_BACKGROUND}} heading={"Events"}><EventSearch/></NativeTab>
    <NativeTab activeTabStyle={{backgroundColor:"silver"}} tabStyle={{backgroundColor:COMMON_DARK_BACKGROUND}} heading={"Profiles"}><ProfileSearch /></NativeTab>
  </NativeTabs>

      return Platform.OS === 'web' ? webActivitiesView() : nativeView();
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





