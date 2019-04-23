import React, { Component } from 'react';
import { StyleSheet,Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Container, Button,Separator,Thumbnail, Header, Content, List, ListItem, Text,Textarea, Icon, Title, Left, Body, Right, Switch } from 'native-base';
import { connect } from 'react-redux';
import {  addEventRequest, updateEventRequest } from './Redux/Actions/eventActions.js';
import { bindActionCreators } from 'redux';
import {UPDATE_EVENT_NAME_BY_KEY, UPDATE_EVENT_EMAIL_BY_KEY,UPDATE_EVENT_PHONE_BY_KEY, UPDATE_EVENT_WEBSITE_BY_KEY,UPDATE_EVENT_IMAGE_BY_KEY,
       ADD_EVENT, ADD_EVENT_NAME, ADD_EVENT_DESC, ADD_EVENT_EMAIL, ADD_EVENT_PHONE, ADD_EVENT_WEBSITE, ADD_EVENT_IMAGE} from '../../redux/types';
import {getDefaultEvent, COMMON_ICON_STYLE,ROUTE_SIMPLE_INPUT_VIEW,ROUTE_EVENT_CALENDAR,ROUTE_MAPVIEW} from '../../constants.js';
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
 
             <Icon ios='ios-add-circle' android="md-add-circle" style={COMMON_ICON_STYLE}/>

               <Text>Save</Text>
            </Button>

            </Right>
        </Header>
        <Content>
          <ListItem icon>
            
            <Body>
              <Text>Visible</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button transparent>
               <Icon ios='ios-person' android="md-person" style={COMMON_ICON_STYLE}/>
              </Button>
              <Text>Name : {this.displayName()}</Text>
            </Left>
            <Body>
             </Body>
            <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('SimpleEventInput', { inputType:(this.state.dataIndex?UPDATE_EVENT_NAME_BY_KEY: ADD_EVENT_NAME), eventIndex: this.state.dataIndex, inputInitialValue:this.displayName()})} >
              <Icon  style={COMMON_ICON_STYLE} name="arrow-forward" />
            </Button>
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button transparent>
               <Icon ios='ios-mail' android="md-mail" style={COMMON_ICON_STYLE}/>
              </Button>
              <Text>Email</Text>
            </Left>
            <Body>
              <Text>{this.displayEmail()}</Text>
            </Body>
             
            <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('SimpleEventInput', { inputType: (this.state.dataIndex?UPDATE_EVENT_EMAIL_BY_KEY: ADD_EVENT_EMAIL), eventIndex: this.state.dataIndex, inputInitialValue:this.displayEmail() })} >
              <Icon style={COMMON_ICON_STYLE} name="arrow-forward" />
            </Button>
            </Right>
             
          </ListItem>
          <ListItem icon>
            <Left>
              <Button transparent >
               <Icon ios='ios-phone-portrait' android="md-phone-portrait" style={COMMON_ICON_STYLE}/>
              </Button>
              <Text>Phone</Text>
            </Left>
            <Body>
              <Text>{this.displayPhone()}</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate('SimpleEventInput', { inputType: (this.state.dataIndex?UPDATE_EVENT_PHONE_BY_KEY: ADD_EVENT_PHONE), eventIndex: this.state.dataIndex, inputInitialValue:this.displayPhone()  })} >
              <Icon style={COMMON_ICON_STYLE}  name="arrow-forward"  />
              </Button>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button transparent style={{ backgroundColor: "transparent" }}>
             <Icon ios='ios-globe' android="md-phone-portrait" style={COMMON_ICON_STYLE}/>
              </Button>
               <Text>Website</Text>
            </Left>
            <Body>
             
              <Text>{this.displayWebsite()}</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate('SimpleEventInput', { inputType:  (this.state.dataIndex?UPDATE_EVENT_WEBSITE_BY_KEY: ADD_EVENT_WEBSITE), eventIndex: this.state.dataIndex, inputInitialValue:this.displayWebsite() })} >

              <Icon style={COMMON_ICON_STYLE} name="arrow-forward" />
             </Button>

            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button transparent>
                <Icon ios='ios-list-box' android="md-list-box" style={COMMON_ICON_STYLE}/>
              </Button>
              <Text>Description</Text>
            </Left>
            <Body>
              <Text>{this.displayDescription()}</Text>
            </Body>
            <Right>   
                 <Icon onPress={() => this.props.navigation.navigate("EditDescription")}
                  name="arrow-forward" />
          
            </Right>
          </ListItem>
          <Separator bordered>
            <Text>MIDFIELD</Text>
          </Separator>
  <ListItem icon>
            <Left>
                <Icon ios='ios-list-box' android="md-list-box" style={COMMON_ICON_STYLE}/>
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
                <Icon ios='ios-list-box' android="md-list-box" style={COMMON_ICON_STYLE}/>
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

