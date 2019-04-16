import React, { Component } from 'react';
import { StyleSheet,Image,   ImagePickerIOS} from 'react-native';
import { Container,Button,Separator,Thumbnail, Header, Content, List, ListItem,Title,
                                       Text,Textarea, Icon, Left, Body, Right, Switch, Toast } from 'native-base';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateProfileRequest, addProfileRequest } from './Redux/Actions/profile.js';
import { getDefaultProfile, NEED_AT_LEAST_ANONYMOUS_LOGIN, TEXT_SAVE, TEXT_UPDATE} from '../../constants.js';

import { UPDATE_PROFILE_NAME_BY_KEY, UPDATE_PROFILE_WEBSITE_BY_KEY, UPDATE_PROFILE_PHONE_BY_KEY,UPDATE_PROFILE_EMAIL_BY_KEY, UPDATE_PROFILE_IMAGE_BY_KEY, ADD_NAME, ADD_PROFILE, ADD_DESC, ADD_EMAIL, ADD_PHONE, ADD_WEBSITE, ADD_IMAGE} from '../../redux/types';

/**
*   ProfileView - The Screen to view and potentially edit a profile.
*/
class ProfileView extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    //setting default state
    if(this.props.navigation.state.params && this.props.navigation.state.params.id)
    //setting default state
    this.state = { dataIndex: this.props.navigation.state.params.id, text: ''};
   
    else
      this.state = {newEntry:"PrepareToCreate"}
           }


    updateProfile = () => {
    // updater functions are preferred for transactional updates
    console.log("Attempting to update personal profile");
    Toast.show({
              text: 'Attempting to update personal profile',
              buttonText: 'ok'
            });
  };

    _onPress = () => {
    // updater functions are preferred for transactional updates
    let newProfileKey = Math.floor(Math.random() * Math.floor(999999));
    const tmpProfile = getDefaultProfile({ website:this.props.website, name:this.props.name, phone:this.props.phone, email:this.props.email,
               description:this.props.description, imageURI:(this.state.avatarSource||this.props.imageURI)});

    //const tmp = this.props.addProfile(tmpProfile);
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

/** helper function to get the name of the profile at a specific index, if ani index  was provided as a property.
*.  If there is no data index then it checks if this has a parameter indicating a user profile, and returns the logged in user info
*/
displayName = () =>{ 
 
let _name;
//if 
if(this.state.dataIndex)
{
_name = this.props.profiles[this.state.dataIndex].name

}
else
 _name = this.props.name;

return _name;

}


displayPhone = () =>(this.state.dataIndex?this.props.profiles[this.state.dataIndex].phone:this.props.phone)

displayWebsite = () =>(this.state.dataIndex?this.props.profiles[this.state.dataIndex].website:this.props.website)

displayEmail = () =>{
let _email;
//if 
if(this.state.dataIndex)
{
_email = this.props.profiles[this.state.dataIndex].email

}else
 _email = this.props.email;

return _email;

  }

displayDescription = () =>
{
  let _desc;
//if 
if(this.state.dataIndex)
{
_desc = this.props.profiles[this.state.dataIndex].desc;

}else 
 _desc = this.props.description;

return _desc;
}

displayImageURI = () =>
{
  let _photo;
//if 
if(this.state.dataIndex)
{
_photo = this.props.profiles[this.state.dataIndex]._photo

}
else
 _photo = this.props.imageURI;

return _photo;

}


  addButton = (isPersonalProfile)=>{
   console.log("this.props.isConnected ", this.props.isConnected );
   //determine whether to add or update when user clicks button
   const onPressAction =()=>( isPersonalProfile ? this.updateProfile() :this._onPress()) ;
   //determine whether to show "Save" or "Update" depending on ownership
   const buttonText    = isPersonalProfile ?   TEXT_UPDATE :TEXT_SAVE;
    const _saveButton = ( <Button transparent  onPress={onPressAction } >
             <Icon ios='ios-add-circle' android="md-add-circle" style={{fontSize: 20, color: 'blue'}}/>
               <Text>{buttonText}</Text>
            </Button>);

      return _saveButton; };



  render(){
    const isPersonalProfile = (typeof this.state.dataIndex !== 'undefined')&& (this.state.dataIndex == this.props.profileIndex);
    const headerTitle = isPersonalProfile ? "Personal Profile" : "Divine Profile" ;
    return (
      <Container>
         <Header style={{backgroundColor: '#a9c3d2'}}>
            <Body>
              <Title>{headerTitle}</Title>
            </Body>

            <Right>       
           
{this.addButton(isPersonalProfile)}

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
              <Text>Name :</Text>
            </Left>
            <Body>
              
              <Text>{this.displayName()}</Text>
            </Body>
            <Right>
            {!isPersonalProfile ?
            <Button onPress={() => this.props.navigation.navigate('SimpleInput', { inputType:(this.state.dataIndex?UPDATE_PROFILE_NAME_BY_KEY: ADD_NAME), profileIndex: this.state.dataIndex, inputInitialValue:this.displayName()})} >
              <Icon active name="arrow-forward" />
            </Button>
            :null}
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
             {!isPersonalProfile?
            <Button onPress={() => this.props.navigation.navigate('SimpleInput', { inputType: (this.state.dataIndex?UPDATE_PROFILE_EMAIL_BY_KEY: ADD_EMAIL), profileIndex: this.state.dataIndex, inputInitialValue:this.displayEmail() })} >
              <Icon active name="arrow-forward" />
            </Button>
             :null}
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
              <Button onPress={() => this.props.navigation.navigate('SimpleInput', { inputType: (this.state.dataIndex?UPDATE_PROFILE_PHONE_BY_KEY: ADD_PHONE), profileIndex: this.state.dataIndex, inputInitialValue:this.displayPhone()  })} >
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
              <Button onPress={() => this.props.navigation.navigate('SimpleInput',  { inputType: (this.state.dataIndex?UPDATE_PROFILE_WEBSITE_BY_KEY: ADD_WEBSITE), profileIndex: this.state.dataIndex, inputInitialValue:this.displayWebsite()  })} >

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
            <Text></Text>
          </Separator>

          <ListItem thumbnail>
              <Left>
              <Text>Current Image:::</Text>
              </Left>
              <Body>
                <Thumbnail large square source={{ uri: this.displayImageURI()}} />                
              </Body>
            <Right>
              <Button transparent onPress={() => this.onPressImagePicker()}>
                 <Text>Edit</Text>
                 <Icon active name="arrow-forward" />
              </Button>
            </Right>
            </ListItem>

        </Content>
      </Container>
    );
  }
}



const mapStateToProps = state => {
   const isConnected =  ((state.auth!= NEED_AT_LEAST_ANONYMOUS_LOGIN) && state.auth.auth &&  (state.auth.auth.loggedInProviderName=="oauth2-google"));

  return {
    profileIndex:  isConnected? state.auth.auth.userProfile.identities[0].id :null,
    isConnected : isConnected,
    isGoogleUser: (isConnected && state.auth.auth.userProfile.identities[0].id),
    profiles: state.profiles.profiles,
    email: state.profiles.tmpProfile.email,
    name: state.profiles.tmpProfile.name,
    phone: state.profiles.tmpProfile.phone,
    website: state.profiles.tmpProfile.website,
    description: state.profiles.tmpProfile.description,
    imageURI: state.profiles.tmpProfile.imageURI
  }
}


function matchDispatchToProps(dispatch){
  return bindActionCreators({updateProfileRequest:updateProfileRequest, addProfileRequest:addProfileRequest}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(ProfileView)

