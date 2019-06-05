import React, { Component } from 'react';
import Home from './components/home.web.js';
import YouTubeList from './components/Trubrary/youtubeList.js';
import ProfileView  from './components/Profile/profileview.js';
import EventView from './components/Event/eventView.js';


import Trubrary from './components/Trubrary/trubrary.js';
import Activities from './components/Activities.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {Container} from 'native-base';
import {StyleSheet,Header, Button, Text,View} from 'react-native';

import {slide as Menu} from 'react-burger-menu';
import { FaBars } from "react-icons/fa";
import { COMMON_DARK_BACKGROUND,COMMON_TEXT_STYLE } from './constants.js';
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';
import SideBar from './components/NavBars/sidebar.js';
import SideMenu from 'react-native-side-menu';

export default class App extends Component {
 
render() {
  const menu = <SideBar/>;

 return (<Container  style={{backgroundColor:COMMON_DARK_BACKGROUND}}>

  <Router>
<SideMenu menu={menu}>

      <Card path="/Home"  component={Home} />
         <Card path="/Trubrary" component={Trubrary} />
         <Card path="/Activities" component={Activities} />
          <Card path="/YouTubeList" component={YouTubeList} />
          <Card path="/ProfileView" component={ProfileView} />
          <Card path="/EventView" component={EventView} />
          
      
</SideMenu>

    </Router>
    </Container>);
            }

 constructor(props) {
    super(props);
   
  }

}

const styles = StyleSheet.create({
  tabActiveTintColor:{color:"gold"},
  bottomNavTabStyle:{ opacity: .8,backgroundColor:COMMON_DARK_BACKGROUND },
  lowBottomFix:{marginBottom:20},
  bottomNavContainer :{height:70,backgroundColor:COMMON_DARK_BACKGROUND},
  label:{ backgroundColor:"silver", color:"gold", padding:10,}
});
