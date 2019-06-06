import React, { Component } from 'react';

import Home from './components/home.js';
import YouTubeList from './components/Trubrary/youtubeList.js';
import ProfileView  from './components/Profile/profileview';
import EventView from './components/Event/eventView.js';
import SimpleWebview from './components/WebResources/simpleWebView';

import CalendarView from './components/calendarView';
import MapView from './components/mapview';

import Trubrary from './components/Trubrary/trubrary.js';
import Activities from './components/Activities.js';
import { BrowserRouter, Route, Link } from "react-router-dom";

import {StyleSheet,Header, Button, Text,View} from 'react-native';

import {slide as Menu} from 'react-burger-menu';
import { FaBars } from "react-icons/fa";
import { COMMON_DARK_BACKGROUND, ROUTE_MAPVIEW, ROUTE_EVENT_CALENDAR } from './constants.js';
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';
import SideBar from './components/NavBars/sidebar.js';
import { createBrowserHistory, createMemoryHistory } from 'history';

export default class App extends Component {
 
 constructor(props) {
    super(props);
   this.history = createBrowserHistory();

  }

render=()=>(<BrowserRouter history={this.history}><div id="outer-container" >
  <Menu isOpen id="menu" pageWrapId={'page-wrap'} outerContainerId={'outer-container'} >
        <SideBar/>
      </Menu><main id="page-wrap">
        <Route exact path="/"  render={() => <Home />} />
        <Route path="/Home" render={() => <Home />}/>
        <Route path={ROUTE_MAPVIEW} render={(props) => <MapView {...props}/>}/>
        <Route  path="/Trubrary" render={(props) => <Trubrary {...props} />} />
        <Route  path={ROUTE_EVENT_CALENDAR} render={(props) => <CalendarView {...props} />} />
        <Route  path="/SimpleWebView" render={(props) => <SimpleWebview {...props} />} />
        <Route  path="/YoutubeListView" render={(props) => <YouTubeList {...props} />} />
        <Route exact path="/Activities" render={ (props)=> <Activities {...props} />} />
        <Route exact path="/Activities/ProfileView/" render={(props) => <ProfileView {...props}  />} />
        <Route path="/Activities/ProfileView/:id" render={(props) => <ProfileView {...props}  />} />
        <Route path="/Activities/EventView/:id" render={(props) => <EventView {...props}  />}/>
        <Route path="/Activities/EventView" render={(props) => <EventView {...props}  />}/>
      </main>
<SideBar/>
      </div>
      </BrowserRouter>)
          

 

}

const styles = StyleSheet.create({
  tabActiveTintColor:{color:"gold"},
  bottomNavTabStyle:{ opacity: .8,backgroundColor:COMMON_DARK_BACKGROUND },
  lowBottomFix:{marginBottom:20},
  bottomNavContainer :{height:70,backgroundColor:COMMON_DARK_BACKGROUND},
  label:{ backgroundColor:"silver", color:"gold", padding:10,}
});
