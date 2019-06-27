//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, } from 'react-native';
import { Container,ListItem,Title,Icon,Picker, Thumbnail, Text,/*Tab, Tabs,*/Card, CardItem} from 'native-base';
import { COMMON_LISTVIEW_ITEM_SEPARATOR,
        COMMON_DARK_BACKGROUND, NO_PHOTO_AVAILABLE_URI,
         ROUTE_SIMPLE_WEB_VIEW, ROUTE_YOUTUBELIST_VIEW,TEXT_VIEW,
        renderListView, commonViewButton} from '../../constants.js'
import WebResourcesList from '../WebResources/webResourcesList.js';
import {categories} from '../../redux/state.js'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import withRouter from '../../withRouterManager.js';

/**
 * Represents a Trubrary component. It is the portal and container for the "Library"
 */
 class Trubrary extends Component {

  constructor(props) {
    super(props);
    this.state = {searchText: '',selected: "key1"};
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

  let imgURI = record.item.imageURI;
if(!imgURI)
 imgURI =  record.item.images? record.item.images[0] : NO_PHOTO_AVAILABLE_URI;
//attempting to combine the renderItems for 2 possible route options
  const route = record.item.payload ? ROUTE_YOUTUBELIST_VIEW :ROUTE_SIMPLE_WEB_VIEW ;
  //console.log(route);
   return (<ListItem style={styles.flexStyle}>       
   <Card style={styles.flexStyle}>
     <CardItem style={styles.flexStyle}>
      <View  style={styles.outerViewStyle}>
       <Thumbnail  source={{uri:imgURI}}/>
        <View><Title style={styles.title}>{record.item.title}</Title></View>
        {commonViewButton("View",(() => {
          console.log(route,"----",record.item);
          this.props.history.push(route, {record:record.item})}) )}
            </View>
          </CardItem> 
      <View style={styles.title}><Text>{record.item.generalCategory?record.item.generalCategory[0]:null}</Text></View>

</Card>

            </ListItem>);}
/* <View style={styles.buttonContainer}>
            <Button transparent onPress=
            {() => {this.props.navigation.push(route, {record:record.item, title:record.item.title, url:record.item.url})}}>
             <Text>{TEXT_VIEW}</Text>
            </Button>
             </View>*/


  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }


/** React Render
 * Render tabs
 * 
 **/
  render() {
  const pItems = categories.map((category)=>(<Picker.Item key={category.title} label={category.title} value={category.title} />));

console.log(this.state,":TRUBRARY:", this.props);
    return (<Container>

<Tabs>
    <TabList>
      <Tab>Our Master Teachers</Tab>
      <Tab>Media Outlets</Tab>
      <Tab>Roads to the Community</Tab>
    </TabList>
    <TabPanel>
    <View>
        <Picker
          mode="dropdown"
                        style={{ width: undefined }}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
            >
             {pItems}
            </Picker>
       {this.renderSearchField()}  
    </View>
        {renderListView(this._keyExtractor, null, this.renderItem, this.props.videoData, COMMON_LISTVIEW_ITEM_SEPARATOR, styles.outerViewStyle, styles.title,ROUTE_YOUTUBELIST_VIEW, TEXT_VIEW  )}
    </TabPanel>
    <TabPanel >{renderListView( ((item, index) => item.title),null, this.renderItem, this.props.onlineMediaContent,COMMON_LISTVIEW_ITEM_SEPARATOR,styles.outerViewStyle, styles.title, ROUTE_SIMPLE_WEB_VIEW, TEXT_VIEW)}</TabPanel>
    <TabPanel ><WebResourcesList history={this.props.history}/></TabPanel>
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
  outerViewStyle:{flexDirection: 'row',flex:1, backgroundColor:"silver", borderRadius:15},
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
Trubrary.propTypes = {
  videoData: PropTypes.array,
  onlineMediaContent: PropTypes.array,
  webResources:PropTypes.array
};
export default withRouter(connect(mapStateToProps,null )(Trubrary))





