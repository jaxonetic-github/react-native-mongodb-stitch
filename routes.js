import React, { Component } from "react";
import {Icon } from 'native-base';
import {  createStackNavigator,createAppContainer, createSwitchNavigator,createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

//import TimelineView from "./components/timeline.js";
import VideoSearch from './components/Youtube/videoSearch.js';
import YouTubeList from './components/Youtube/youtubeList.js';
import SimpleWebView from './components/WebResources/simpleWebView.js';
import HomeScreen from "./components/home.js";
import SideBar from "./components/sidebar.js";
import EventSearch from './components/Event/eventSearch.js';
import MapView from './components/mapview.js';
import EventCalendar from './components/calendarView.js';
import EventView from './components/Event/eventView.js';
import ProfileSearch from './components/Profile/profileSearch.js';
import EditDescription from './components/Profile/descriptionEdit.js';
import SimpleInput from './components/Profile/simpleInput.js';
import SimpleEventInput from './components/Event/simpleEventInput.js';
import ProfileView  from './components/Profile/profileview.js';
import CommunityView from './components/WebResources/webResourcesList.js';
import SignUpScreen from './components/signUp.js';
import {COMMON_DARK_BACKGROUND,INACTIVE_TINT_COLOR,ACTIVE_TINT_COLOR,
ROUTE_MAPVIEW, ROUTE_EVENT_CALENDAR, ROUTE_SIMPLE_INPUT_VIEW} from './constants.js'

/**
 *  Returns a Drawer Navigator with routes
 *
 */
function createDrawerExample(options = {}) {
  let DrawerExample = createDrawerNavigator( 
  {
    Home: { screen: HomeScreen },
    ProfileView: { screen: ProfileView },
    SearchLayout: {screen: TabNavigator},
  },
  {
        initialRouteName: 'Home',
        drawerWidth: 280,
    contentComponent: props => <SideBar {...props} />
  }
  );

  return DrawerExample;
}


/*
 * Return a StackNavigator with overall routes
 */
function createTopStack(options = {}) {


  const innerNav = createStackNavigator({
  Home: HomeScreen,
  Drawer: {screen:createDrawerExample(), navigationOptions : { title: 'Black Arts Renaissance'} },
  VideoSearch:{screen:VideoSearch, navigationOptions: ({ navigation }) => ({title: `Debates Lectures Interviews`})  },
  YouTubeList:{screen:YouTubeList, navigationOptions: ({ navigation }) => ({title: `${navigation.state.params.title}`})  },
  //TimelineView:{screen:TimelineView, navigationOptions: ({ navigation }) => ({title: "Timeline"})  },
  SimpleWebView:{screen:SimpleWebView, navigationOptions: ({ navigation }) => ({title: `${navigation.state.params.title}`}) },
  Community:{screen:CommunityView, navigationOptions : { title: 'Community'} },
  EventView:{screen:EventView, navigationOptions : { title: 'New Event  Screen'} },
  ProfileView:{screen:ProfileView, navigationOptions : { title: 'New Profile  Screen'} },
  EditDescription:{screen:EditDescription, navigationOptions : { title: 'List Screen'} },
  SimpleInput:{screen:SimpleInput, navigationOptions : { title: 'Modify / Add'} },
  SimpleEventInput:{screen:SimpleEventInput, navigationOptions : { title: 'Modify / Add'} },
  Events: {screen: EventSearch, navigationOptions :{ title: 'Events'}},
  EventCalendar: {screen: EventCalendar, navigationOptions :{ title: 'Events'}},
  MapView: {screen: MapView, navigationOptions :{ title: 'MapView'}},
},
  {initialRouteName: "Drawer",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:COMMON_DARK_BACKGROUND ,
      },
      headerRight:<Icon ios='ios-menu' android="md-menu" style={{fontSize: 25, margin:10, color: 'white'}}/>,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }})
  return innerNav;


}

/******** TabNav Stack  **********/
const tabNavRoutes = {
  Events: EventSearch,
  ProfileSearch: ProfileSearch,
}

const TabNavigator = createMaterialTopTabNavigator(tabNavRoutes,{swipeEnabled:false,tabBarOptions:{inactiveTintColor:INACTIVE_TINT_COLOR ,activeTintColor:ACTIVE_TINT_COLOR,tabStyle:{backgroundColor:"#f8f8f8"}}});


/******* Main Stack *********/

export default mainStack = createSwitchNavigator({
    Signup: SignUpScreen,
    Inner: createTopStack()
   // SearchLayout:TabNavigator 
 },
  {
    initialRouteName: 'Inner',headerStyle: {
        backgroundColor: COMMON_DARK_BACKGROUND,
      }
  });


