import React, { Component } from "react";
import Input from '../textinput.js';
import { Container, Header, Content, Item, Label, Textarea, Form } from "native-base";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateProfileImageByKey, updateProfileEmailByKey, updateProfilePhoneByKey, updateProfileWebsiteByKey, updateProfileNameByKey, addProfileName, addProfileEmail, addProfilePhone, addProfileDescription, addProfileWebsite, addProfileImage } from './Redux/Actions/profile.js';
import { UPDATE_PROFILE_IMAGE_BY_KEY, UPDATE_PROFILE_EMAIL_BY_KEY, UPDATE_PROFILE_PHONE_BY_KEY, UPDATE_PROFILE_WEBSITE_BY_KEY, UPDATE_PROFILE_NAME_BY_KEY, ADD_NAME, ADD_DESC, ADD_EMAIL, ADD_PHONE, ADD_WEBSITE, ADD_IMAGE} from '../../redux/types';


/**
 *A custom html input textfield
 */
class SimpleInputEdit extends Component {

   constructor(props) {
    super(props);
    const inputType = this.props.navigation.getParam('inputType', 'NO_INPUTTYPE_ERR');
    const inputInitialValue = this.props.navigation.getParam('inputInitialValue', 'default');
    const key = this.props.navigation.getParam('profileIndex', null);


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
        default:
          return state;
  }
        }
    
     

  render() {
   
   // console.log('rebder.nameedit---',test);
   // console.log(this.props.profileName('vhjvkhjkvhjkvhj'));

    return (
      <Container>
        <Content padder>
          <Item stackedLabel>
            <Label>Username</Label>
            <Input  inputInitialValue={this.state.inputInitialValue} inputType={this.state.inputType} updateChange={this.updateChange} />
          </Item>
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    userprofile: state.profiles
  }
}




function matchDispatchToProps(dispatch){
  return bindActionCreators({updateProfileImageByKey:updateProfileImageByKey,updateProfileEmailByKey:updateProfileEmailByKey,updateProfilePhoneByKey:updateProfilePhoneByKey, updateProfileWebsiteByKey:updateProfileWebsiteByKey, updateProfileNameByKey:updateProfileNameByKey, profileName: addProfileName, profileEmail: addProfileEmail,  profileWebsite: addProfileWebsite,
   profilePhone:addProfilePhone, profileDescription:addProfilePhone}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SimpleInputEdit)

