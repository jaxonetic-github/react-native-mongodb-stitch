import React, { Component } from 'react';

//Navigatable components
import Home from './components/home.js';
import YouTubeList from './components/Trubrary/youtubeList.js';
import ProfileView  from './components/Profile/profileview';
import EventView from './components/Event/eventView.js';
import SimpleWebview from './components/WebResources/simpleWebView';
import CalendarView from './components/calendarView';
import MapView from './components/mapview';
import Trubrary from './components/Trubrary/trubrary.js';
import Activities from './components/Activities.js';

import { BrowserRouter, Route } from "react-router-dom";

import {StyleSheet} from 'react-native';

import {slide as Menu} from 'react-burger-menu';
import {  ROUTE_PROFILE_VIEW, ROUTE_EVENT_VIEW, ROUTE_YOUTUBELIST_VIEW,
         ROUTE_HOME, ROUTE_ACTIVITIES, ROUTE_TRUBRARY, ROUTE_MAPVIEW, ROUTE_EVENT_CALENDAR } from './constants.js';
import SideBar from './components/NavBars/sidebar.js';
import { createBrowserHistory } from 'history';

export default class App extends Component {
 
 constructor(props) {
    super(props);
   this.history = createBrowserHistory();

  }

render=()=>(<BrowserRouter history={this.history}><div id="outer-container" >
  <Menu isOpen id="menu" pageWrapId={'page-wrap'} outerContainerId={'outer-container'} >
        <SideBar />
      </Menu><main id="page-wrap">
        <Route exact path="/"  render={() => <Home />} />
        <Route path={ROUTE_HOME} render={() => <Home />}/>
        <Route path={ROUTE_MAPVIEW} render={(props) => <MapView {...props}/>}/>
        <Route  path={ROUTE_TRUBRARY} render={(props) => <Trubrary {...props} />} />
        <Route  path="/EventCalendar" render={(props) => <CalendarView {...props} />} />
        <Route  path="/SimpleWebView" render={(props) => <SimpleWebview {...props} />} />
        <Route  path={ROUTE_YOUTUBELIST_VIEW} render={(props) => <YouTubeList {...props} />} />
        <Route exact path={ROUTE_ACTIVITIES} render={ (props)=> <Activities {...props} />} />
        <Route exact path={ROUTE_PROFILE_VIEW} render={(props) => <ProfileView {...props}  />} />
        <Route path={ROUTE_PROFILE_VIEW+"/:id"} render={(props) => <ProfileView {...props}  />} />
        <Route path={ROUTE_EVENT_VIEW+"/:id"} render={(props) => <EventView {...props}  />}/>} />
        <Route path={ROUTE_EVENT_VIEW} render={(props) => <EventView {...props}  />}/>} />
 </main>

      </div>
      </BrowserRouter>)
          

 

}
