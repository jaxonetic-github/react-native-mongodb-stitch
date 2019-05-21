import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet,Image,   ImagePickerIOS} from 'react-native';
import { Container,Button,Separator,Thumbnail, Header, Content, List, ListItem,Title,
                                       Text,Textarea, Icon, Left, Body, Right, Switch, Toast } from 'native-base';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateProfileRequest, addProfileRequest } from './Redux/Actions/profile.js';
import { getDefaultProfile,COMMON_ICON_STYLE, NEED_AT_LEAST_ANONYMOUS_LOGIN, TEXT_SAVE,
 TEXT_UPDATE, NO_PHOTO_AVAILABLE_URI,ICON_ALL_ARROWFORWARD,ICON_IOS_MAIL, ICON_ANDROID_MAIL,
TEXT_WEBSITE, TEXT_MAIL,TEXT_PHONE,TEXT_DESCRIPTION, ICON_IOS_PORTRAIT,ICON_ANDROID_PORTRAIT,
ICON_IOS_GLOBE, ICON_ANDROID_GLOBE, ICON_IOS_DESCRIPTION,ICON_ANDROID_DESCRIPTION,
ICON_IOS_CIRCLE, ICON_ANDROID_CIRCLE,ICON_IOS_PERSON, ICON_ANDROID_PERSON, COMMON_DARK_BACKGROUND,
 TEXT_CURRENT_IMAGE,ROUTE_SIMPLE_PROFILE_INPUT, header} from '../../constants.js';

import { UPDATE_PROFILE_NAME_BY_KEY, UPDATE_PROFILE_WEBSITE_BY_KEY, UPDATE_PROFILE_PHONE_BY_KEY,UPDATE_PROFILE_EMAIL_BY_KEY, UPDATE_PROFILE_IMAGE_BY_KEY,
 ADD_NAME, ADD_PROFILE, ADD_DESC, ADD_EMAIL, ADD_PHONE, ADD_WEBSITE, ADD_IMAGE} from '../../redux/types';

/**
*   ProfileView - The Screen to view and potentially edit a profile.
*/
class ProfileView extends Component {

  constructor(props) {
super(props);
    //setting default state
    if(props.navigation.state.params && props.navigation.state.params.id)
    //setting default state
    this.state = { dataIndex: props.navigation.state.params.id, text: ''};
   
    else
      this.state = {}
  }

 /**
 *   update  profile 
 */
  updateProfile = () => {
    const request = this.props.updateProfileRequest(this.props.profiles[this.state.dataIndex]);
  };

   arrowIcon = ()=>this.props.isGoogleUser ? <Icon style={COMMON_ICON_STYLE}  name={ICON_ALL_ARROWFORWARD} /> : null;

/**
 *  When the User presses save/update button, this method fires the corresponding redux actions
 */
    _onPress = () => {

    const tmpProfile = getDefaultProfile({ website:this.props.website, name:this.props.name, phone:this.props.phone, email:this.props.email,
               description:this.props.description, imageURI:(this.state.avatarSource||this.props.imageURI)});

    const request = this.state.dataIndex?this.props.updateProfileRequest(this.props.profiles[this.state.dataIndex]) : this.props.addProfileRequest(tmpProfile);

  };

/**  User selects image */
onPressImagePicker = () =>{

  const options = {
  /*title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },*/
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    this.setState({
      avatarSource: source,
    });
  }
});

}


displayName = () => ( this.state.dataIndex && this.props.profiles[this.state.dataIndex] ? this.props.profiles[this.state.dataIndex].name: '');
displayEmail = () => (this.state.dataIndex && this.props.profiles[this.state.dataIndex] ? this.props.profiles[this.state.dataIndex].email: '');
displayPhone = () => (this.state.dataIndex && this.props.profiles[this.state.dataIndex] ? this.props.profiles[this.state.dataIndex].phone: '');
displayWebsite = () => (this.state.dataIndex && this.props.profiles[this.state.dataIndex] ? this.props.profiles[this.state.dataIndex].website: '');
displayDescription = () => (this.state.dataIndex  && this.props.profiles[this.state.dataIndex] ? this.props.profiles[this.state.dataIndex].description: '');
displayImageURI = () => (this.state.dataIndex && this.props.profiles[this.state.dataIndex] && (this.props.profiles[this.state.dataIndex].imageURI!=='' )? this.props.profiles[this.state.dataIndex].imageURI: NO_PHOTO_AVAILABLE_URI);

/*
 * 
 */
  addButton = (isPersonalProfile)=>{
   const isNewProfile = !this.state.dataIndex;
   //determine whether to add or update when user clicks button
   const onPressAction =()=>( isPersonalProfile ? this.updateProfile() :this._onPress()) ;
   //determine whether to show "Save" or "Update" depending on ownership
   const buttonText    = isPersonalProfile ?   TEXT_UPDATE :TEXT_SAVE;
   const _saveButton = isPersonalProfile || isNewProfile ? ( <Button transparent  onPress={onPressAction } >
             <Icon ios={ICON_IOS_CIRCLE} android={ICON_ANDROID_CIRCLE} style={COMMON_ICON_STYLE}/>
               <Text>{buttonText}</Text>
            </Button>):null;

    return _saveButton; };



  render(){
    const isPersonalProfile = (typeof this.state.dataIndex !== 'undefined')&& (this.state.dataIndex == this.props.profileIndex);
    const headerTitle = isPersonalProfile ? "Personal Profile" : "New Divine Profile" ;
    const imageURI = this.displayImageURI();
    return (
      <Container>
         <Header style={{backgroundColor: "silver", height:80}}>

            <Body>
              <Title><Icon ios={ICON_IOS_PERSON} android={ICON_ANDROID_PERSON} style={COMMON_ICON_STYLE}/>{headerTitle}</Title>
            </Body>
            <Right>       
           
{this.addButton(isPersonalProfile)}

            </Right>
        </Header>
        <Content>
          <ListItem icon>
            <Left>
              <Button transparent>
               <Icon ios={ICON_IOS_PERSON} android={ICON_ANDROID_PERSON} style={COMMON_ICON_STYLE}/>
              </Button>
              <Text>Name :</Text>
            </Left>
            <Body>
              <Text>{this.displayName()}</Text>
            </Body>
            <Right>
            {!isPersonalProfile ?
            <Button transparent onPress={() => this.props.navigation.navigate(ROUTE_SIMPLE_PROFILE_INPUT, { inputType:(this.state.dataIndex?UPDATE_PROFILE_NAME_BY_KEY: ADD_NAME), profileIndex: this.state.dataIndex, inputInitialValue:this.displayName()})} >
             {this.arrowIcon()}
            </Button>
            :null}
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
             {!isPersonalProfile?
            <Button transparent onPress={() => this.props.navigation.navigate(ROUTE_SIMPLE_PROFILE_INPUT, { inputType: (this.state.dataIndex?UPDATE_PROFILE_EMAIL_BY_KEY: ADD_EMAIL), profileIndex: this.state.dataIndex, inputInitialValue:this.displayEmail() })} >
               {this.arrowIcon()}
            </Button>
             :null}
            </Right>
             
          </ListItem>
          <ListItem icon>
            <Left>
              <Button transparent>
               <Icon ios={ICON_IOS_PORTRAIT} android={ICON_ANDROID_PORTRAIT} style={COMMON_ICON_STYLE}/>
              </Button>
              <Text>{TEXT_PHONE}</Text>
            </Left>
            <Body>
              <Text>{this.displayPhone()}</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate(ROUTE_SIMPLE_PROFILE_INPUT, { inputType: (this.state.dataIndex?UPDATE_PROFILE_PHONE_BY_KEY: ADD_PHONE), profileIndex: this.state.dataIndex, inputInitialValue:this.displayPhone()  })} >
              {this.arrowIcon()}
              </Button>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button transparent>
             <Icon ios={ICON_IOS_GLOBE} android={ICON_ANDROID_PORTRAIT} style={COMMON_ICON_STYLE}/>
              </Button>
               <Text>{TEXT_WEBSITE}</Text>
            </Left>
            <Body>
              <Text>{this.displayWebsite()}</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate(ROUTE_SIMPLE_PROFILE_INPUT,  { inputType: (this.state.dataIndex?UPDATE_PROFILE_WEBSITE_BY_KEY: ADD_WEBSITE), profileIndex: this.state.dataIndex, inputInitialValue:this.displayWebsite()  })} >
                    {this.arrowIcon()}
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
            <Button transparent onPress={() => this.props.navigation.navigate("EditDescription")}>   
                 
                  {this.arrowIcon()}
          </Button>
            </Right>
          </ListItem>
          <Separator style={styles.profileSeparatorStyle} bordered/>
      
          <ListItem >
              <Left >
            
              <Button transparent disabled onPress={() => this.onPressImagePicker()}>
                 <Text>{TEXT_CURRENT_IMAGE}</Text>
                 {this.arrowIcon()}
              </Button>
              </Left>
              <Body>
                <Image style={styles.profileImage} source={{uri:this.displayImageURI()}} />              
              </Body>  
            </ListItem>

        </Content>
      </Container>
    );
  }
}



const mapStateToProps = state => {
   const isConnected =  ((state.auth!= NEED_AT_LEAST_ANONYMOUS_LOGIN) && state.auth.auth &&  (state.auth.auth.loggedInProviderName=="oauth2-google"));
   const profileIndex =  isConnected? state.auth.auth.userProfile.identities[0].id :null;
   const profiles = state.profiles.profiles;

  return {
    profileIndex: profileIndex,
    isConnected : isConnected,
    isGoogleUser: (isConnected && state.auth.auth.userProfile.identities[0].id),
    profiles: profiles,
    email: profileIndex && profiles[profileIndex] ? profiles[profileIndex].email : state.profiles.tmpProfile.email,
    name: profileIndex && profiles[profileIndex]  ? profiles[profileIndex].name : state.profiles.tmpProfile.name,
    phone: profileIndex && profiles[profileIndex] ? profiles[profileIndex].phone : state.profiles.tmpProfile.phone,
    website: profileIndex && profiles[profileIndex] ? profiles[profileIndex].website : state.profiles.tmpProfile.website,
    description: profileIndex && profiles[profileIndex] ? profiles[profileIndex].description : state.profiles.tmpProfile.description,
    imageURI: profileIndex && profiles[profileIndex] && profiles[profileIndex].imageURI !='' ? profiles[profileIndex].imageURI : NO_PHOTO_AVAILABLE_URI
  }
}

/**
 * Potential properties to override state
 */
ProfileView.propTypes = {
  id: PropTypes.string
};

function matchDispatchToProps(dispatch){
  return bindActionCreators({updateProfileRequest:updateProfileRequest, addProfileRequest:addProfileRequest}, dispatch)
}

const styles = StyleSheet.create({
   profileImage:{width:205, height:250},
   profileSeparatorStyle:{backgroundColor:"silver"}
});



export default connect(mapStateToProps, matchDispatchToProps)(ProfileView)

