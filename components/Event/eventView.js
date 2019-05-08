import React, { Component } from 'react';
import { StyleSheet,Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Container, Button,Separator,Thumbnail, Header, Content, List, ListItem, Text,Textarea, Icon, Title, Left, Body, Right, Switch } from 'native-base';
import { connect } from 'react-redux';
import {  addEventRequest, updateEventRequest } from './Redux/Actions/eventActions.js';
import { bindActionCreators } from 'redux';
import {UPDATE_EVENT_NAME_BY_KEY, UPDATE_EVENT_EMAIL_BY_KEY,UPDATE_EVENT_PHONE_BY_KEY, UPDATE_EVENT_WEBSITE_BY_KEY,UPDATE_EVENT_IMAGE_BY_KEY,
       ADD_EVENT, ADD_EVENT_NAME, ADD_EVENT_DESC, ADD_EVENT_EMAIL, ADD_EVENT_PHONE, ADD_EVENT_WEBSITE, ADD_EVENT_IMAGE} from '../../redux/types';
import {getDefaultEvent, COMMON_ICON_STYLE,ROUTE_SIMPLE_INPUT_VIEW,ROUTE_EVENT_CALENDAR,ROUTE_MAPVIEW,
        TEXT_WEBSITE,ICON_IOS_PERSON, ICON_ANDROID_PERSON,TEXT_SAVE,ICON_IOS_CIRCLE,ICON_ANDROID_CIRCLE,ICON_ALL_ARROWFORWARD,
        ICON_IOS_MAIL, ICON_ANDROID_MAIL,TEXT_MAIL,ICON_IOS_PORTRAIT,ICON_ANDROID_PORTRAIT,
        TEXT_PHONE,TRANSPARENT_COLOR, ICON_IOS_GLOBE, ICON_ANDROID_GLOBE,ICON_IOS_DESCRIPTION,ICON_ANDROID_DESCRIPTION, TEXT_DESCRIPTION,
        ICON_IOS_LOCATION, ICON_ANDROID_LOCATION, ICON_IOS_CALENDAR,ICON_ANDROID_CALENDAR   } from '../../constants.js';
/**
*   ProfileView - The Screen to view and potentially edit a event. 
*    
*/
export class EventView extends Component {

  constructor(props) {
    super(props);
    if(this.props.navigation.state.params && this.props.navigation.state.params.id)
    //setting default state
    this.state = { dataIndex: this.props.navigation.state.params.id, text: ''};
    else
      this.state = {newEntry:"PrepareToCreate"}
     }


  _saveEvent = () => {
    const tmpEvt = getDefaultEvent({ website:this.displayWebsite(), name:this.displayName(), phone:this.displayPhone(), email:this.displayEmail(),
               description:this.props.description, imageURI:this.displayImageURI(), calendar: this.props.calendar, location:this.props.location});
    
    const request = this.state.dataIndex?this.props.updateEventRequest(this.props.events[this.state.dataIndex]) : this.props.addEventRequest(tmpEvt);
  };

displayName = () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].name:this.props.name)
displayPhone = () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].phone:this.props.phone)
displayWebsite = () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].website:this.props.website)
displayLocation= () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].location:this.props.location)
displayCalendar= () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].calendar:this.props.calendar)
displayEmail = () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].email:this.props.email)
displayDescription = () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].description:this.props.description)
displayImageURI = () =>(this.state.dataIndex && this.props.events[this.state.dataIndex]?this.props.events[this.state.dataIndex].imageURI:this.props.imageURI)

  render() {
    return (
      <Container>
          <Header style={{backgroundColor: '#a9c3d2'}}>
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
        <Content>
          <ListItem icon>
            <Left>
              <Button transparent>
               <Icon ios={ICON_IOS_PERSON} android={ICON_ANDROID_PERSON} style={COMMON_ICON_STYLE}/>
              </Button>
              <Text>Name : {this.displayName()}</Text>
            </Left>
            <Body>
             </Body>
            <Right>
            <Button transparent onPress={() => this.props.navigation.navigate(ROUTE_SIMPLE_INPUT_VIEW, { inputType:(this.state.dataIndex?UPDATE_EVENT_NAME_BY_KEY: ADD_EVENT_NAME), eventIndex: this.state.dataIndex, inputInitialValue:this.displayName()})} >
              <Icon  style={COMMON_ICON_STYLE} name={ICON_ALL_ARROWFORWARD} />
            </Button>
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button transparent>
               <Icon ios={ICON_IOS_MAIL} android={ICON_ANDROID_MAIL} style={COMMON_ICON_STYLE}/>
              </Button>
              <Text>{TEXT_MAIL}</Text>
            </Left>
            <Body>
              <Text>{this.displayEmail()}</Text>
            </Body>
             
            <Right>
            <Button transparent onPress={() => this.props.navigation.navigate(ROUTE_SIMPLE_INPUT_VIEW, { inputType: (this.state.dataIndex?UPDATE_EVENT_EMAIL_BY_KEY: ADD_EVENT_EMAIL), eventIndex: this.state.dataIndex, inputInitialValue:this.displayEmail() })} >
              <Icon style={COMMON_ICON_STYLE} name={ICON_ALL_ARROWFORWARD} />
            </Button>
            </Right>
             
          </ListItem>
          <ListItem icon>
            <Left>
              <Button transparent >
               <Icon ios={ICON_IOS_PORTRAIT} android={ICON_ANDROID_PORTRAIT} style={COMMON_ICON_STYLE}/>
              </Button>
              <Text>{TEXT_PHONE}</Text>
            </Left>
            <Body>
              <Text>{this.displayPhone()}</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate(ROUTE_SIMPLE_INPUT_VIEW, { inputType: (this.state.dataIndex?UPDATE_EVENT_PHONE_BY_KEY: ADD_EVENT_PHONE), eventIndex: this.state.dataIndex, inputInitialValue:this.displayPhone()  })} >
              <Icon style={COMMON_ICON_STYLE}  name={ICON_ALL_ARROWFORWARD}  />
              </Button>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button transparent style={{ backgroundColor:{TRANSPARENT_COLOR}  }}>
             <Icon ios={ICON_IOS_GLOBE} android={ICON_ANDROID_GLOBE} style={COMMON_ICON_STYLE}/>
              </Button>
               <Text>{TEXT_WEBSITE}</Text>
            </Left>
            <Body>
             
              <Text>{this.displayWebsite()}</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate('SimpleEventInput', { inputType:  (this.state.dataIndex?UPDATE_EVENT_WEBSITE_BY_KEY: ADD_EVENT_WEBSITE), eventIndex: this.state.dataIndex, inputInitialValue:this.displayWebsite() })} >

              <Icon style={COMMON_ICON_STYLE} name={ICON_ALL_ARROWFORWARD} />
             </Button>

            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button transparent>
                <Icon ios={ICON_IOS_DESCRIPTION} android={ICON_ANDROID_DESCRIPTION} style={COMMON_ICON_STYLE}/>
              </Button>
              <Text>{TEXT_DESCRIPTION}</Text>
            </Left>
            <Body>
              <Text>{this.displayDescription()}</Text>
            </Body>
            <Right>  
              <Button transparent onPress={() => this.props.navigation.navigate("EditDescription")} >
                 <Icon style={COMMON_ICON_STYLE} name={ICON_ALL_ARROWFORWARD} />
          </Button>
            </Right>
          </ListItem>
          <Separator bordered>
            <Text>MIDFIELD</Text>
          </Separator>
  <ListItem icon>
            <Left>
                <Icon ios={ICON_IOS_LOCATION} android={ICON_ANDROID_LOCATION} style={COMMON_ICON_STYLE}/>
              <Text>Location</Text>
            </Left>
            <Body>
              <Text>{this.displayLocation()}</Text>
            </Body>
            <Right>   
                 <Button transparent title="Event Calendar" onPress={() => this.props.navigation.push('MapView',{id:this.state.dataIndex})} >

                 <Icon  style={COMMON_ICON_STYLE}       name="arrow-forward" />
</Button>
            </Right>
          </ListItem>
  <ListItem icon>
            <Left>
                <Icon ios={ICON_IOS_CALENDAR} android={ICON_ANDROID_CALENDAR} style={COMMON_ICON_STYLE}/>
              <Text>Calendar</Text>
            </Left>
            <Body>
              <Text>{this.displayCalendar()}</Text>
            </Body>
            <Right>   
                 <Button transparent title="Event Calendar" onPress={() => this.props.navigation.push('EventCalendar',{id:this.state.dataIndex})} >

                 <Icon  style={COMMON_ICON_STYLE}   name="arrow-forward" />
</Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
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
  console.log(state);
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
  return bindActionCreators({updateEventRequest:updateEventRequest, addEventRequest: addEventRequest }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EventView)

