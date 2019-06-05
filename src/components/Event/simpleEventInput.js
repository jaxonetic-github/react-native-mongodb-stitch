import React, { Component } from "react";
import Input from '../textinput.js';
import { Container, Header, Content, Item, Label, Textarea, Form } from "native-base";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateEventDescByKey, updateEventImageByKey, updateEventEmailByKey, updateEventPhoneByKey, updateEventWebsiteByKey, updateEventNameByKey,addEventName, addEventEmail, addEventPhone, addEventDescription, addEventWebsite, addEventImage } from './Redux/Actions/eventActions.js';
import { UPDATE_EVENT_DESC_BY_KEY,UPDATE_EVENT_IMAGE_BY_KEY, UPDATE_EVENT_EMAIL_BY_KEY, UPDATE_EVENT_PHONE_BY_KEY, UPDATE_EVENT_WEBSITE_BY_KEY, UPDATE_EVENT_NAME_BY_KEY, ADD_EVENT, ADD_EVENT_NAME, ADD_EVENT_DESC, ADD_EVENT_EMAIL, ADD_EVENT_PHONE, ADD_EVENT_WEBSITE, ADD_EVENT_IMAGE} from '../../redux/types';



class SimpleEventInputEdit extends Component {

   constructor(props) {
    super(props);
    const inputType = this.props.navigation.getParam('inputType', 'NO_INPUTTYPE_ERR');
    const inputInitialValue = this.props.navigation.getParam('inputInitialValue', 'UNEXPECTED DEFAULT VALUE');
    const key = this.props.navigation.getParam('eventIndex', null);


    this.state = {
    inputType: inputType,
    inputInitialValue: inputInitialValue,
    key : key,
    names: []
  }
  
   }      

  updateChange = (text) => {
        console.log('updateChange', text);
        switch(this.state.inputType){
            
        default:
          return state;
  }
        }
    
     

  render() {
   
   // console.log('rebder.nameedit---',test);
   // console.log(this.props.eventName('vhjvkhjkvhjkvhj'));

    return (
      <Container>
        <Content padder>
          <Item stackedLabel>
            <Label>Username</Label>
            <Input inputInitialValue={this.state.inputInitialValue} inputType={this.state.inputType} updateChange={this.updateChange} />
          </Item>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
  
  }
}



function matchDispatchToProps(dispatch){
  return bindActionCreators({updateEventDescByKey:updateEventDescByKey,updateEventImageByKey:updateEventImageByKey,updateEventEmailByKey:updateEventEmailByKey,updateEventPhoneByKey:updateEventPhoneByKey, updateEventWebsiteByKey:updateEventWebsiteByKey, updateEventNameByKey:updateEventNameByKey, eventName: addEventName, eventEmail: addEventEmail,  eventWebsite: addEventWebsite,
   eventPhone:addEventPhone, eventDescription:addEventPhone}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SimpleEventInputEdit)

