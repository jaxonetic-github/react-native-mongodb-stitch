import React, { Component } from "react";
import {Icon, Button, Text } from 'native-base';
import {  createStackNavigator } from 'react-navigation';
import {createSwitchNavigator, createAppContainer}  from '@react-navigation/core';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';

//import { createBrowserApp } from "@react-navigation/web";

//const MyNavigator = createSwitchNavigator(routes);

//const App = createBrowserApp(MyNavigator);
import Activities from "./components/Activities.js";
import TimelineView from "./components/timeline.js";
import Trubrary from './components/Trubrary/trubrary.js';
import YouTubeList from './components/Trubrary/youtubeList.js';
import SimpleWebView from './components/WebResources/simpleWebView.js';
import HomeScreen from "./components/home.js";
import SideBar from "./components/sidebar.js";
import EventSearch from './components/Event/eventSearch.js';
import MapView from './components/mapview';
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
    Home: { screen: HomeScreen,    defaultNavigationOptions : ({ navigation }) => (    {
      headerStyle: {backgroundColor:COMMON_DARK_BACKGROUND },
      headerRight:<Button transparent onPress={() => navigation.toggleDrawer()}><Icon ios='ios-menu' android="md-menu" style={{fontSize: 25, color: 'white'}}/></Button>,
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'}
    })    },
    Activities:{screen: Activities},
    Trubrary:{screen: Trubrary },
    ProfileView: { screen: ProfileView },
  },
  {
        initialRouteName: 'Home',
        
        defaultNavigationOptions : ({ navigation }) => (    {
          headerStyle: {backgroundColor:COMMON_DARK_BACKGROUND },
          headerRight:<Button transparent onPress={() => navigation.toggleDrawer()}><Icon ios='ios-menu' android="md-menu" style={{fontSize: 25, color: 'black'}}/>fgsfgd</Button>,
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'}
        }),
        drawerWidth: 280,
        contentComponent: props => <SideBar {...props} />
  });

  return DrawerExample;
}

/*
 * Return a StackNavigator with overall routes
 */
function createTopStack(options = {}) {
  const drawerNavigation = createDrawerExample();

  const innerNav = createStackNavigator({

  Drawer: {screen:drawerNavigation },
  Activities:{screen:Activities},
  Trubrary:{screen:Trubrary, navigationOptions: ({ navigation }) => ({title: `Our Truebrary`})  },
  YouTubeList:{screen:YouTubeList, navigationOptions: ({ navigation }) => ({title: `${navigation.state.params.title}`})  },
  TimelineView:{screen:TimelineView, navigationOptions: ({ navigation }) => ({title: "Timeline"})  },
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
  {         initialRouteName: "Drawer",
    defaultNavigationOptions : ({ navigation }) => (    {
      headerStyle: {backgroundColor:COMMON_DARK_BACKGROUND },
      headerRight:<Button transparent onPress={() => navigation.toggleDrawer()}><Icon ios='ios-menu' android="md-menu" style={{fontSize: 25, color: 'white'}}/></Button>,
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'}
    }) 


  })
  return innerNav;
}


/******* Main Stack *********/

export default mainStack = createDrawerExample();

const pld= createSwitchNavigator({
    Signup: SignUpScreen,
    Inner: createTopStack()
 },
  {
    initialRouteName: 'Inner' });


