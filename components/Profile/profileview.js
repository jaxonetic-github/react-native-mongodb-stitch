import React, { Component } from 'react';
import { StyleSheet,Image,   ImagePickerIOS} from 'react-native';
import { Container,Button,Separator,Thumbnail, Header, Content, List, ListItem,Title,
                                       Text,Textarea, Icon, Left, Body, Right, Switch, Toast } from 'native-base';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateProfileRequest, addProfileRequest } from './Redux/Actions/profile.js';
import { getDefaultProfile,COMMON_ICON_STYLE, NEED_AT_LEAST_ANONYMOUS_LOGIN, TEXT_SAVE, TEXT_UPDATE, NO_PHOTO_AVAILABLE_URI} from '../../constants.js';

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
      this.state = {}
           }

           componentWillMount =()=>{console.log("ProfileView Component Will Mount")}
           componentDidMount =()=>{console.log("ProfileView Component Did Mount")}


    updateProfile = () => {
    // updater functions are preferred for transactional updates
    console.log("Attempting to update personal profile");

    //const tmp = this.props.addProfile(tmpProfile);
    const request = this.props.updateProfileRequest(this.props.profiles[this.state.dataIndex]);

    Toast.show({
              text: 'Attempting to update personal profile',
              buttonText: 'ok'
            });
  };

    _onPress = () => {
    // updater functions are preferred for transactional updates
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


displayName = () => ( this.state.dataIndex && this.props.profiles[this.state.dataIndex] ? this.props.profiles[this.state.dataIndex].name: '');
displayEmail = () => (this.state.dataIndex && this.props.profiles[this.state.dataIndex] ? this.props.profiles[this.state.dataIndex].email: '');
displayPhone = () => (this.state.dataIndex && this.props.profiles[this.state.dataIndex] ? this.props.profiles[this.state.dataIndex].phone: '');
displayWebsite = () => (this.state.dataIndex && this.props.profiles[this.state.dataIndex] ? this.props.profiles[this.state.dataIndex].website: '');
displayDescription = () => (this.state.dataIndex  && this.props.profiles[this.state.dataIndex] ? this.props.profiles[this.state.dataIndex].description: '');
displayImageURI = () => (this.state.dataIndex && this.props.profiles[this.state.dataIndex] ? this.props.profiles[this.state.dataIndex].imageURI: '');
//displayEmail = () => (this.state.dataIndex? this.props.profiles[this.state.dataIndex].email: '');

/** helper function to get the name of the profile at a specific index, if ani index  was provided as a property.
*.  If there is no data index then it checks if this has a parameter indicating a user profile, and returns the logged in user info
*/


  addButton = (isPersonalProfile)=>{
   const isNewProfile = !this.state.dataIndex;
   //determine whether to add or update when user clicks button
   const onPressAction =()=>( isPersonalProfile ? this.updateProfile() :this._onPress()) ;
   //determine whether to show "Save" or "Update" depending on ownership
   const buttonText    = isPersonalProfile ?   TEXT_UPDATE :TEXT_SAVE;
    const _saveButton = isPersonalProfile || isNewProfile ? ( <Button transparent  onPress={onPressAction } >
             <Icon ios='ios-add-circle' android="md-add-circle" style={COMMON_ICON_STYLE}/>
               <Text>{buttonText}</Text>
            </Button>):null;

      return _saveButton; };



  render(){
    const isPersonalProfile = (typeof this.state.dataIndex !== 'undefined')&& (this.state.dataIndex == this.props.profileIndex);
    const headerTitle = isPersonalProfile ? "Personal Profile" : "New Divine Profile" ;
    const imageURI = this.state.dataIndex && this.props.profiles[this.state.dataIndex]? this.props.profiles[this.state.dataIndex].imageURI: this.props.imageURI;
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
              <Button transparent>
               <Icon ios='ios-person' android="md-person" style={COMMON_ICON_STYLE}/>
              </Button>
              <Text>Name :</Text>
            </Left>
            <Body>
              
              <Text>{this.displayName()}</Text>
            </Body>
            <Right>
            {!isPersonalProfile ?
            <Button trasnparent onPress={() => this.props.navigation.navigate('SimpleInput', { inputType:(this.state.dataIndex?UPDATE_PROFILE_NAME_BY_KEY: ADD_NAME), profileIndex: this.state.dataIndex, inputInitialValue:this.displayName()})} >
              <Icon  name="arrow-forward" />
            </Button>
            :null}
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
             {!isPersonalProfile?
            <Button onPress={() => this.props.navigation.navigate('SimpleInput', { inputType: (this.state.dataIndex?UPDATE_PROFILE_EMAIL_BY_KEY: ADD_EMAIL), profileIndex: this.state.dataIndex, inputInitialValue:this.displayEmail() })} >
              <Icon style={COMMON_ICON_STYLE} name="arrow-forward" />
            </Button>
             :null}
            </Right>
             
          </ListItem>
          <ListItem icon>
            <Left>
              <Button transparent>
               <Icon ios='ios-phone-portrait' android="md-phone-portrait" style={COMMON_ICON_STYLE}/>
              </Button>
              <Text>Phone</Text>
            </Left>
            <Body>
              <Text>{this.displayPhone()}</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate('SimpleInput', { inputType: (this.state.dataIndex?UPDATE_PROFILE_PHONE_BY_KEY: ADD_PHONE), profileIndex: this.state.dataIndex, inputInitialValue:this.displayPhone()  })} >
              <Icon  name="arrow-forward" style={COMMON_ICON_STYLE}  />
              </Button>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button transparent>
             <Icon ios='ios-globe' android="md-phone-portrait" style={COMMON_ICON_STYLE}/>
              </Button>
               <Text>Website</Text>
            </Left>
            <Body>
             
              <Text>{this.displayWebsite()}</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate('SimpleInput',  { inputType: (this.state.dataIndex?UPDATE_PROFILE_WEBSITE_BY_KEY: ADD_WEBSITE), profileIndex: this.state.dataIndex, inputInitialValue:this.displayWebsite()  })} >

              <Icon  name="arrow-forward" />
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
                 active name="arrow-forward" />
          
            </Right>
          </ListItem>
          <Separator bordered>
            <Text></Text>
          </Separator>

          <ListItem >
              <Left>
              <Text>Current Image</Text>
              </Left>
              <Body style={{backgroundColor:"pink"}} >
                <Image style={{width:205, height:250}} source={{uri:( this.state.dataIndex && this.props.profiles[this.state.dataIndex]? this.props.profiles[this.state.dataIndex].imageURI:NO_PHOTO_AVAILABLE_URI)}} />              
              </Body>
            <Right>
              <Button transparent disabled onPress={() => this.onPressImagePicker()}>
                 <Text>Edit</Text>
                 <Icon  name="arrow-forward" />
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
   const profileIndex =  isConnected? state.auth.auth.userProfile.identities[0].id :null;
   const profiles = state.profiles.profiles;
   console.log(profileIndex, "----",profiles,"-------",profiles[profileIndex]);
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
    imageURI: profileIndex && profiles[profileIndex] ? profiles[profileIndex].imageURI : state.profiles.tmpProfile.imageURI
  }
}


function matchDispatchToProps(dispatch){
  return bindActionCreators({updateProfileRequest:updateProfileRequest, addProfileRequest:addProfileRequest}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(ProfileView)

