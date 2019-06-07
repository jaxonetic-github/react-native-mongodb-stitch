import React, { Component } from 'react';
import { StyleSheet,Image,View} from 'react-native';
import { Container, Button,Separator,Thumbnail, Header, Content, ListItem,
 Text, Icon, Title, Left, Body, Right,Accordion,Item } from 'native-base';
import { connect } from 'react-redux';
import {  addEventsToLocal,addEventRequest, updateEventRequest } from './Redux/Actions/eventActions.js';
import { bindActionCreators } from 'redux';
import {UPDATE_EVENT_NAME_BY_KEY,UPDATE_EVENT_DESC_BY_KEY, UPDATE_EVENT_EMAIL_BY_KEY,UPDATE_EVENT_PHONE_BY_KEY, UPDATE_EVENT_WEBSITE_BY_KEY,UPDATE_EVENT_IMAGE_BY_KEY,
       ADD_EVENT, ADD_EVENT_NAME, ADD_EVENT_DESC, ADD_EVENT_EMAIL, ADD_EVENT_PHONE, ADD_EVENT_WEBSITE, ADD_EVENT_IMAGE} from '../../redux/types';
import {getDefaultEvent, COMMON_ICON_STYLE,ROUTE_SIMPLE_INPUT_VIEW,ROUTE_EVENT_CALENDAR,ROUTE_MAPVIEW,
        TEXT_WEBSITE,ICON_IOS_PERSON, ICON_ANDROID_PERSON,TEXT_SAVE,ICON_IOS_CIRCLE,ICON_ANDROID_CIRCLE,ICON_ALL_ARROWFORWARD,
        ICON_IOS_MAIL, ICON_ANDROID_MAIL,TEXT_MAIL,ICON_IOS_PORTRAIT,ICON_ANDROID_PORTRAIT,
        TEXT_PHONE,TRANSPARENT_COLOR, ICON_IOS_GLOBE, ICON_ANDROID_GLOBE,ICON_IOS_DESCRIPTION,ICON_ANDROID_DESCRIPTION, TEXT_DESCRIPTION,
        ICON_IOS_LOCATION, ICON_ANDROID_LOCATION, ICON_IOS_CALENDAR,ICON_ANDROID_CALENDAR,
        TEXT_NAME,COMMON_DARK_BACKGROUND,ICON_REMOVE_CIRCLE   } from '../../constants.js';
import withRouter from '../../withRouterManager.js';

import SimpleInputEdit from "../simpleInput.js";

/**
*   ProfileView - The Screen to view and potentially edit a event. 
*    
*/
 class EventView extends Component {

  constructor(props) {
    super(props);
    console.log("Eventview::",this.props)
    const tmpEvt = getDefaultEvent();

    const update = this.props.match.params.id;
    if(!update)
    {
      this.props.addEventRequest(tmpEvt);

    }
    //setting default state
          this.state = {dataIndex:(update?this.props.match.params.id:tmpEvt.id), text: ''};
     }

componentDidMount(){
  console.log("mounting",this.props)
 // const tmpEvt = getDefaultEvent();
 // this.props.addEventRequest(tmpEvt);
//  this.setState({dataIndex:tmpEvt.id})
}

/**
 * Commit event data to backend
 */
  _saveEvent = () => {
    //create Event object from userInfo
    const tmpEvt = getDefaultEvent({ website:this.displayWebsite(), name:this.displayName(), phone:this.displayPhone(), email:this.displayEmail(),
               description:this.props.description, imageURI:this.displayImageURI(), calendar: this.props.calendar, location:this.props.location});

    //Update when we have bogus dataIndex
    if( this.state.dataIndex && this.state.dataIndex>-1 )
      this.props.updateEventRequest(this.props.events[this.state.dataIndex]) 
    else
       this.props.addEventRequest(tmpEvt);
  };

displayName = () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].name:this.props.name)
displayPhone = () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].phone:this.props.phone)
displayWebsite = () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].website:this.props.website)
displayLocation= () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].location:this.props.location)
displayCalendar= () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].calendar:this.props.calendar)
displayEmail = () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].email:this.props.email)
displayDescription = () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].description:this.props.description)
displayImageURI = () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].imageURI:this.props.imageURI)

arrowIcon = ()=>this.props.isGoogleUser ? <Icon style={COMMON_ICON_STYLE}  name={ICON_ALL_ARROWFORWARD} /> : null;
  
  /**
  * The "Edit" view for a particular widget
  */
_renderContent = (item) =>
    (<View style={{flex:1, alignItems:"center",backgroundColor:"silver", borderRadius:10}}>
      <Text>{this.state.dataIndex}</Text>
          <SimpleInputEdit inputType={ (this.state.dataIndex?item.updateAction: item.addAction)}
                    profileIndex={ this.state.dataIndex} inputInitialValue={item.displayText }/>
 </View>)

/**
 * A header view to display the profile data when not in "Edit" mode
 */
    _renderHeader=(expanded,icon_ios, icon_droid, iconsStyle,titleText,bodyText,rightComponent)=> 
            (<View key={titleText}  style={{flex:1,backgroundColor:"white"}}>
              <Item>
               <Icon ios={icon_ios} android={icon_droid} style={{fontSize: 20, color: 'silver'}}/>
            <Text style={{color:"silver"}}>{titleText}</Text>
            </Item>
            <Text style={{flex:1,alignSelf:"center",justifyContent:"center",backgroundColor:"white"}}>{bodyText}</Text>
            {expanded
          ? <Icon style={{fontSize: 20, color: 'silver', flex:1, alignSelf:"flex-end"}} name={ICON_REMOVE_CIRCLE} />
          : <Icon style={{fontSize: 20, color: 'silver', position:"absolute", right:5, top:20}} name="create"></Icon>}
          </View>)

  render() {
  const profileData= [
    {key:TEXT_NAME,titleText:TEXT_NAME, icon_ios:ICON_IOS_PERSON,icon_droid:ICON_ANDROID_PERSON,
     updateAction:UPDATE_EVENT_NAME_BY_KEY, addAction:ADD_EVENT_NAME,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.displayName(), actionIcon:this.arrowIcon() },
    {key:TEXT_MAIL,titleText:TEXT_MAIL, icon_ios:ICON_IOS_MAIL,icon_droid:ICON_ANDROID_MAIL,
      updateAction:UPDATE_EVENT_EMAIL_BY_KEY, addAction:ADD_EVENT_EMAIL,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.displayEmail(), actionIcon:this.arrowIcon() },
    {key:TEXT_PHONE,titleText:TEXT_PHONE, icon_ios:ICON_IOS_PORTRAIT,icon_droid:ICON_ANDROID_PORTRAIT,
      updateAction:UPDATE_EVENT_PHONE_BY_KEY, addAction:ADD_EVENT_PHONE,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.displayPhone(), actionIcon:this.arrowIcon() },
    {key:TEXT_WEBSITE,titleText:TEXT_WEBSITE, icon_ios:ICON_IOS_GLOBE,icon_droid:ICON_ANDROID_GLOBE,
           updateAction:UPDATE_EVENT_WEBSITE_BY_KEY, addAction:ADD_EVENT_WEBSITE,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.displayWebsite(), actionIcon:this.arrowIcon() },
    {key:TEXT_DESCRIPTION,titleText:TEXT_DESCRIPTION, icon_ios:ICON_IOS_DESCRIPTION,icon_droid:ICON_ANDROID_DESCRIPTION,
      updateAction:UPDATE_EVENT_DESC_BY_KEY, addAction:ADD_EVENT_DESC,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.displayDescription(), actionIcon:this.arrowIcon() }
      ];

 const items = profileData.map((record, index)=>{
return (<Accordion  key={record.key}
style={{ paddingBottom:15,paddingTop:5}}
        dataArray={[record]}
        animation={true}
         renderContent={this._renderContent}
       renderHeader= {(item, expanded)=> {
          const title = item;
            return (    
              this._renderHeader(expanded,item.icon_ios, item.icon_droid, COMMON_ICON_STYLE, item.titleText, item.displayText,
                  item.displayText,null )
            );
          }}/>);
 });
    return (
      <Container style={{backgroundColor: COMMON_DARK_BACKGROUND}}>
              
          <Header  style={{backgroundColor: COMMON_DARK_BACKGROUND, height:55, color:"white"}}>
            <Body>
              <Title>Event {this.state.dataIndex}</Title>
            </Body>

            <Right>             
            <Button transparent  onPress={() => this._saveEvent()} >
 
             <Icon ios={ICON_IOS_CIRCLE} android={ICON_ANDROID_CIRCLE} style={COMMON_ICON_STYLE}/>

               <Text>{TEXT_SAVE}</Text>
            </Button>

            </Right>
        </Header>
        <Content padder>

          {items}

          <Separator bordered>
            <Text style={{flex:1,alignSelf:"center"}}>Time & Place</Text>
          </Separator>
  <ListItem style={{backgroundColor: "silver"}}>
            <Left>
                <Icon ios={ICON_IOS_LOCATION} android={ICON_ANDROID_LOCATION} style={COMMON_ICON_STYLE}/>
              <Text>Location</Text>
            </Left>
            <Body>
              <Text>{this.displayLocation()}</Text>
            </Body>
            <Right>   
                 <Button transparent title="Event Location" onPress={() => this.props.history.push(ROUTE_MAPVIEW,{key:this.state.dataIndex, initialLocation:this.displayLocation()})} >
                 <Icon  style={COMMON_ICON_STYLE}  name="arrow-forward" /></Button>
            </Right>
          </ListItem>
  <ListItem style={{backgroundColor: "white"}}>
            <Left>
                <Icon ios={ICON_IOS_CALENDAR} android={ICON_ANDROID_CALENDAR} style={COMMON_ICON_STYLE}/>
              <Text>Calendar</Text>
            </Left>
            <Body>
              <Text>{this.displayCalendar()}</Text>
            </Body>
            <Right>   
                 <Button transparent title="Event Calendar" onPress={() => this.props.history.push(ROUTE_EVENT_CALENDAR,{key:this.state.dataIndex, initialDate:this.displayCalendar() })} >

                 <Icon  style={COMMON_ICON_STYLE}   name="arrow-forward" />
</Button>
            </Right>
          </ListItem>
          <ListItem style={{backgroundColor: "silver"}}>
              <Left>
              <Text>Current Image</Text>
              </Left>
              <Body>
                <Thumbnail large square source={{ uri: this.props.imageURI}} />                
              </Body>
            <Right>
            </Right>
            </ListItem>

        </Content>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    events: state.events.events,
    email: state.events.tmpEvent.email,
    name: state.events.tmpEvent.name,
    phone: state.events.tmpEvent.phone,
    website: state.events.tmpEvent.website,
    location: state.events.tmpEvent.location,
        calendar: state.events.tmpEvent.calendar,

    description: state.events.tmpEvent.description,
    imageURI: state.events.tmpEvent.imageURI
  }
}


function matchDispatchToProps(dispatch){
  return bindActionCreators({updateEventRequest:updateEventRequest,addEventsToLocal:addEventsToLocal, addEventRequest: addEventRequest }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EventView)

