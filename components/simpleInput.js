import React, { Component } from "react";
import Input from './textinput.js';
import { Container, Header, Content, Item, Label, Textarea, Form } from "native-base";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router";

import { updateProfileDescByKey,updateProfileImageByKey, updateProfileEmailByKey, updateProfilePhoneByKey, updateProfileWebsiteByKey, updateProfileNameByKey, addProfileName, addProfileEmail, addProfilePhone, addProfileDescription, addProfileWebsite, addProfileImage } from './Profile/Redux/Actions/profile.js';
import { UPDATE_PROFILE_DESC_BY_KEY, UPDATE_PROFILE_IMAGE_BY_KEY, UPDATE_PROFILE_EMAIL_BY_KEY, UPDATE_PROFILE_PHONE_BY_KEY, UPDATE_PROFILE_WEBSITE_BY_KEY, UPDATE_PROFILE_NAME_BY_KEY, ADD_NAME, ADD_DESC, ADD_EMAIL, ADD_PHONE, ADD_WEBSITE, ADD_IMAGE,
//event types
        UPDATE_EVENT_DESC_BY_KEY,UPDATE_EVENT_IMAGE_BY_KEY, UPDATE_EVENT_EMAIL_BY_KEY, UPDATE_EVENT_PHONE_BY_KEY, UPDATE_EVENT_WEBSITE_BY_KEY, UPDATE_EVENT_NAME_BY_KEY, ADD_EVENT, ADD_EVENT_NAME, ADD_EVENT_DESC, ADD_EVENT_EMAIL, ADD_EVENT_PHONE, ADD_EVENT_WEBSITE, ADD_EVENT_IMAGE} from '../redux/types';
import { updateEventDescByKey, updateEventImageByKey, updateEventEmailByKey, updateEventPhoneByKey, updateEventWebsiteByKey, updateEventNameByKey,addEventName, addEventEmail, addEventPhone, addEventDescription, addEventWebsite, addEventImage } from './Event/Redux/Actions/eventActions.js';



/**
 *A custom html input textfield
 */
class SimpleInputEdit extends Component {

   constructor(props) {
    super(props);
    console.log(this.props);
    const inputType = this.props.inputType;
    const inputInitialValue = this.props.inputInitialValue||'default';
    const key = this.props.profileIndex|| null;


    this.state = {
  inputType: inputType,
    inputInitialValue: inputInitialValue, 
     key : key,
    names: []
  }
   }      

  updateChange = (text) => {
        console.log(this.state.inputType,'updateChange', text);
        switch(this.state.inputType){
          case UPDATE_PROFILE_NAME_BY_KEY:
               this.props.updateProfileNameByKey(text, this.state.key);
               break;
          case UPDATE_PROFILE_EMAIL_BY_KEY:
               this.props.updateProfileEmailByKey(text, this.state.key);
               break;
          case UPDATE_PROFILE_PHONE_BY_KEY:
               this.props.updateProfilePhoneByKey(text, this.state.key);
               break;
          case UPDATE_PROFILE_WEBSITE_BY_KEY:
               this.props.updateProfileWebsiteByKey(text, this.state.key);
               break;
          case UPDATE_PROFILE_IMAGE_BY_KEY:
               this.props.updateProfileImageByKey(text, this.state.key);
               break;
          case UPDATE_PROFILE_DESC_BY_KEY:
             this.props.updateProfileDescByKey(text, this.state.key);
            break;
          case ADD_NAME:
               this.props.profileName(text)
               break;
          case ADD_EMAIL:
               this.props.profileEmail(text)
               break;
          case ADD_WEBSITE:
               this.props.profileWebsite(text)
               break;       
          case ADD_PHONE:
               this.props.profilePhone(text)
               break;
          case ADD_DESC:
               this.props.profileDescription(text)
               break;
          case UPDATE_EVENT_NAME_BY_KEY:
               this.props.updateEventNameByKey(text, this.state.key);
               break;
          case UPDATE_EVENT_EMAIL_BY_KEY:
               this.props.updateEventEmailByKey(text, this.state.key);
               break;
          case UPDATE_EVENT_PHONE_BY_KEY:
               this.props.updateEventPhoneByKey(text, this.state.key);
               break;
          case UPDATE_EVENT_WEBSITE_BY_KEY:
               this.props.updateEventWebsiteByKey(text, this.state.key);
               break;
          case UPDATE_EVENT_IMAGE_BY_KEY:
               this.props.updateEventImageByKey(text, this.state.key);
               break;
          case UPDATE_EVENT_DESC_BY_KEY:
             this.props.updateProfileDescByKey(text, this.state.key);
          case ADD_EVENT_NAME:
               this.props.eventName(text)
               break;
          case ADD_EVENT_EMAIL:
               this.props.eventEmail(text)
               break;
          case ADD_EVENT_WEBSITE:
               this.props.eventWebsite(text)
               break;       
          case ADD_EVENT_PHONE:
               this.props.eventPhone(text)
               break;
          case ADD_EVENT_DESC:
               this.props.eventDescription(text)
               break;
        default:
          return null;
  }
        }
    
     

  render() {
    return (<Input  inputInitialValue={this.state.inputInitialValue} inputType={this.state.inputType} updateChange={this.updateChange} />);
  }
}


const mapStateToProps = state => {
  return {
  }
}




function matchDispatchToProps(dispatch){
  return bindActionCreators({updateProfileDescByKey:updateProfileDescByKey, updateProfileImageByKey:updateProfileImageByKey,updateProfileEmailByKey:updateProfileEmailByKey,updateProfilePhoneByKey:updateProfilePhoneByKey, updateProfileWebsiteByKey:updateProfileWebsiteByKey, updateProfileNameByKey:updateProfileNameByKey,
   profileName: addProfileName, profileEmail: addProfileEmail,  profileWebsite: addProfileWebsite, profilePhone:addProfilePhone, profileDescription:addProfilePhone,
 updateEventDescByKey:updateEventDescByKey,updateEventImageByKey:updateEventImageByKey,updateEventEmailByKey:updateEventEmailByKey,updateEventPhoneByKey:updateEventPhoneByKey, updateEventWebsiteByKey:updateEventWebsiteByKey, updateEventNameByKey:updateEventNameByKey, eventName: addEventName, eventEmail: addEventEmail,  eventWebsite: addEventWebsite,
   eventPhone:addEventPhone, eventDescription:addEventPhone}, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(SimpleInputEdit))

