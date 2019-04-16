import React, { Component } from 'react';
import { StyleSheet,Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Container, Button,Separator,Thumbnail, Header, Content, List, ListItem, Text,Textarea, Icon, Title, Left, Body, Right, Switch } from 'native-base';
import { connect } from 'react-redux';
import {  addEventRequest, updateEventRequest } from './Redux/Actions/eventActions.js';
import { bindActionCreators } from 'redux';
import {UPDATE_EVENT_NAME_BY_KEY, UPDATE_EVENT_EMAIL_BY_KEY,UPDATE_EVENT_PHONE_BY_KEY, UPDATE_EVENT_WEBSITE_BY_KEY,UPDATE_EVENT_IMAGE_BY_KEY,
       ADD_EVENT, ADD_EVENT_NAME, ADD_EVENT_DESC, ADD_EVENT_EMAIL, ADD_EVENT_PHONE, ADD_EVENT_WEBSITE, ADD_EVENT_IMAGE} from '../../redux/types';
import {getDefaultEvent} from '../../constants.js';
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
    // updater functions are preferred for transactional updates

    const tmpEvt = getDefaultEvent({ website:this.props.website, name:this.props.name, phone:this.props.phone, email:this.props.email,
               description:this.props.description, imageURI:this.props.imageURI, calendar: this.props.calendar, location:this.props.location});
    
console.log("----",tmpEvt);
    const request = this.state.dataIndex?this.props.updateEventRequest(this.props.events[this.state.dataIndex]) : this.props.addEventRequest(tmpEvt);
    //console.log('leaving save  event');

  };

displayName = () =>{
return   this.state.dataIndex?this.props.events[this.state.dataIndex].name:this.props.name;

}
displayPhone = () =>(this.state.dataIndex?this.props.events[this.state.dataIndex].phone:this.props.phone)
displayWebsite = () =>(this.state.dataIndex?this.props.events[this.state.dataIndex].website:this.props.website)
displayLocation= () =>(this.state.dataIndex?this.props.events[this.state.dataIndex].location:this.props.location)
displayCalendar= () =>(this.state.dataIndex?this.props.events[this.state.dataIndex].calendar:this.props.calendar)

displayEmail = () =>(this.state.dataIndex?this.props.events[this.state.dataIndex].email:this.props.email)
displayDescription = () =>(this.state.dataIndex?this.props.events[this.state.dataIndex].description:this.props.description)
displayImageURI = () =>(this.state.dataIndex?this.props.profiles[this.state.dataIndex].imageURI:this.props.imageURI)

  render() {
    return (
      <Container>
          <Header style={{backgroundColor: '#a9c3d2'}}>
            <Body>
              <Title>Event {this.state.dataIndex}</Title>
            </Body>

            <Right>             
            <Button transparent  onPress={() => this._saveEvent()} >
 
             <Icon ios='ios-add-circle' android="md-add-circle" style={{fontSize: 20, color: 'blue'}}/>

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
              <Button style={{ backgroundColor: "#007AFF" }}>
               <Icon ios='ios-person' android="md-person" style={{fontSize: 20, color: 'blue'}}/>
              </Button>
              <Text>Name : {this.displayName()}</Text>
            </Left>
            <Body>
             </Body>
            <Right>
            <Button onPress={() => this.props.navigation.navigate('SimpleEventInput', { inputType:(this.state.dataIndex?UPDATE_EVENT_NAME_BY_KEY: ADD_EVENT_NAME), eventIndex: this.state.dataIndex, inputInitialValue:this.displayName()})} >
              <Icon active name="arrow-forward" />
            </Button>
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
               <Icon ios='ios-mail' android="md-mail" style={{fontSize: 20, color: 'blue'}}/>
              </Button>
              <Text>Email</Text>
            </Left>
            <Body>
              <Text>{this.displayEmail()}</Text>
            </Body>
             
            <Right>
            <Button onPress={() => this.props.navigation.navigate('SimpleEventInput', { inputType: (this.state.dataIndex?UPDATE_EVENT_EMAIL_BY_KEY: ADD_EVENT_EMAIL), eventIndex: this.state.dataIndex, inputInitialValue:this.displayEmail() })} >
              <Icon active name="arrow-forward" />
            </Button>
            </Right>
             
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
               <Icon ios='ios-phone-portrait' android="md-phone-portrait" style={{fontSize: 20, color: 'blue'}}/>
              </Button>
              <Text>Phone</Text>
            </Left>
            <Body>
              <Text>{this.displayPhone()}</Text>
            </Body>
            <Right>
              <Button onPress={() => this.props.navigation.navigate('SimpleEventInput', { inputType: (this.state.dataIndex?UPDATE_EVENT_PHONE_BY_KEY: ADD_EVENT_PHONE), eventIndex: this.state.dataIndex, inputInitialValue:this.displayPhone()  })} >
              <Icon active name="arrow-forward"  />
              </Button>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
             <Icon ios='ios-globe' android="md-phone-portrait" style={{fontSize: 20, color: 'blue'}}/>
              </Button>
               <Text>Website</Text>
            </Left>
            <Body>
             
              <Text>{this.displayWebsite()}</Text>
            </Body>
            <Right>
              <Button onPress={() => this.props.navigation.navigate('SimpleEventInput', { inputType:  (this.state.dataIndex?UPDATE_EVENT_WEBSITE_BY_KEY: ADD_EVENT_WEBSITE), eventIndex: this.state.dataIndex, inputInitialValue:this.displayWebsite() })} >

              <Icon active name="arrow-forward" />
             </Button>

            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon ios='ios-list-box' android="md-list-box" style={{fontSize: 20, color: 'blue'}}/>
              </Button>
              <Text>Description</Text>
            </Left>
            <Body>
              <Text>{this.displayDescription()}</Text>
            </Body>
            <Right>   
                 <Icon onPress={() => this.props.navigation.navigate("EditDescription")}
                 active name="arrow-forward" />
          
            </Right>
          </ListItem>
          <Separator bordered>
            <Text>MIDFIELD</Text>
          </Separator>
  <ListItem icon>
            <Left>
                <Icon ios='ios-list-box' android="md-list-box" style={{fontSize: 20, color: 'blue'}}/>
              <Text>Location</Text>
            </Left>
            <Body>
              <Text>{this.displayLocation()}</Text>
            </Body>
            <Right>   
                 <Button title="Event Calendar" onPress={() => this.props.navigation.push('MapView',{id:this.state.dataIndex})} >

                 <Icon        active name="arrow-forward" />
</Button>
            </Right>
          </ListItem>
  <ListItem icon>
            <Left>
                <Icon ios='ios-list-box' android="md-list-box" style={{fontSize: 20, color: 'blue'}}/>
              <Text>Calendar</Text>
            </Left>
            <Body>
              <Text>{this.displayCalendar()}</Text>
            </Body>
            <Right>   
                 <Button title="Event Calendar" onPress={() => this.props.navigation.push('EventCalendar',{id:this.state.dataIndex})} >

                 <Icon        active name="arrow-forward" />
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

