import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet,Image,   ImagePickerIOS, View} from 'react-native';
import { Container,Button,Separator,Thumbnail, Header, Content, List, ListItem,Title,Item,
                                    Accordion,   Text,Textarea, Icon, Left, Body, Right, Switch, Toast,H1 } from 'native-base';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateProfileRequest, addProfileRequest } from './Redux/Actions/profile.js';
import { getDefaultProfile,iconManager,ICON_REMOVE_CIRCLE,ICON_ADD_CIRCLE,COMMON_ICON_STYLE, NEED_AT_LEAST_ANONYMOUS_LOGIN, TEXT_SAVE,
 TEXT_UPDATE, NO_PHOTO_AVAILABLE_URI,ICON_ALL_ARROWFORWARD,ICON_IOS_MAIL, ICON_ANDROID_MAIL,
TEXT_WEBSITE, TEXT_MAIL,TEXT_PHONE,TEXT_DESCRIPTION, ICON_IOS_PORTRAIT,ICON_ANDROID_PORTRAIT,
ICON_IOS_GLOBE, ICON_ANDROID_GLOBE, ICON_IOS_DESCRIPTION,ICON_ANDROID_DESCRIPTION, TEXT_NAME,
ICON_IOS_CIRCLE, ICON_ANDROID_CIRCLE,ICON_IOS_PERSON, ICON_ANDROID_PERSON, COMMON_DARK_BACKGROUND,
 TEXT_CURRENT_IMAGE,ROUTE_SIMPLE_PROFILE_INPUT,PROFILE, header} from '../../constants.js';
import SimpleInputEdit from "../simpleInput.js";
import { UPDATE_PROFILE_DESC_BY_KEY, UPDATE_PROFILE_NAME_BY_KEY, UPDATE_PROFILE_WEBSITE_BY_KEY, UPDATE_PROFILE_PHONE_BY_KEY,UPDATE_PROFILE_EMAIL_BY_KEY, UPDATE_PROFILE_IMAGE_BY_KEY,
        ADD_NAME, ADD_PROFILE, ADD_DESC,  ADD_EMAIL, ADD_PHONE, ADD_WEBSITE, ADD_IMAGE} from '../../redux/types';



/**
*   ProfileView - The Screen to view and potentially edit a profile.
*/
class ProfileView extends Component {

  constructor(props) {
   super(props);
    
    const update = this.props.match.params.id ;
    if(!update) 
    {
      const newProfile = getDefaultProfile();
      this.props.addProfileRequest(newProfile);
      this.state = {dataIndex:newProfile.id, isNewProfile:true}
    }else{
      this.state = {dataIndex:this.props.match.params.id, isNewProfile:false}
    }
   console.log("ProfileView",this.props);
  }

componentDidMount=()=>{
  console.log(this.state,"---ProfileView didmount----",this.props)
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

    const request = this.state.isNewProfile ? this.props.addProfileRequest(tmpProfile) : this.props.updateProfileRequest(this.props.profiles[this.state.dataIndex]) ;
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
   //determine whether to add or update when user clicks button
   const onPressAction = ()=>( isPersonalProfile ? this.updateProfile() :this._onPress()) ;
   //determine whether to show "Save" or "Update" depending on ownership
   const buttonText = isPersonalProfile ?   TEXT_UPDATE :TEXT_SAVE;
   const _saveButton = isPersonalProfile || this.state.isNewProfile ? 
   (<Button style={{backgroundColor:"maroon", padding:0, margin:0}} iconLeft small  onPress={onPressAction } >
             <Icon ios={ICON_IOS_CIRCLE} android={ICON_ANDROID_CIRCLE} style={COMMON_ICON_STYLE}/>
               <Text style={{color:"gold"}}>{buttonText}</Text>
            </Button>):null;

    return _saveButton; };


/**
 * A header view to display the profile data when not in "Edit" mode
 */
    _renderHeader=(expanded,icon_ios, icon_droid, iconsStyle,titleText,bodyText,rightComponent)=>{ 
      const iconDisplay = expanded
          ? <Icon style={{fontSize: 20, color: 'silver', flex:1, alignSelf:"flex-end"}} name={ICON_REMOVE_CIRCLE} />
          : <Icon style={{fontSize: 20, color: 'silver', position:"absolute", right:5, top:20}} name="create"></Icon>

      return (<View key={titleText}  style={{flex:1,backgroundColor:"white"}}>
              <Item>
               <Icon ios={icon_ios} android={icon_droid} style={{fontSize: 20, color: 'silver'}}/>
               <Text style={{color:"silver"}}>{titleText}</Text>
              </Item>
            <Text style={{flex:1,alignSelf:"center",justifyContent:"center",backgroundColor:"white"}}>{bodyText}</Text>
            {this.state.dataIndex==this.props.profileIndex ? iconDisplay:null }
          </View>);
          }
           
  

  _renderContent = (item) =>
  {
    const view = (<View style={{flex:1, alignItems:"center",backgroundColor:"silver", borderRadius:10}}>
                      <SimpleInputEdit inputType={ (this.state.dataIndex?item.updateAction: item.addAction)}
                        profileIndex={ this.state.dataIndex} inputInitialValue={item.displayText }/>
              </View>);
    return (this.state.dataIndex==this.props.profileIndex )? view : null;

}

/**
*
*/
  render(){

    const isPersonalProfile = (typeof this.state.dataIndex !== 'undefined')&& (this.state.dataIndex == this.props.profileIndex);
    const headerTitle =  PROFILE  ;
   

  const profileData= [
    {key:TEXT_NAME,titleText:TEXT_NAME, icon_ios:ICON_IOS_PERSON,icon_droid:ICON_ANDROID_PERSON,
     updateAction:UPDATE_PROFILE_NAME_BY_KEY, addAction:ADD_NAME,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.displayName(), actionIcon:this.arrowIcon() },
    {key:TEXT_MAIL,titleText:TEXT_MAIL, icon_ios:ICON_IOS_MAIL,icon_droid:ICON_ANDROID_MAIL,
      updateAction:UPDATE_PROFILE_EMAIL_BY_KEY, addAction:ADD_EMAIL,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.displayEmail(), actionIcon:this.arrowIcon() },
    {key:TEXT_PHONE,titleText:TEXT_PHONE, icon_ios:ICON_IOS_PORTRAIT,icon_droid:ICON_ANDROID_PORTRAIT,
      updateAction:UPDATE_PROFILE_PHONE_BY_KEY, addAction:ADD_PHONE,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.displayPhone(), actionIcon:this.arrowIcon() },
    {key:TEXT_WEBSITE,titleText:TEXT_WEBSITE, icon_ios:ICON_IOS_GLOBE,icon_droid:ICON_ANDROID_GLOBE,
           updateAction:UPDATE_PROFILE_WEBSITE_BY_KEY, addAction:ADD_WEBSITE,
      iconStyle:COMMON_DARK_BACKGROUND,displayText:this.displayWebsite(), actionIcon:this.arrowIcon() },
    {key:TEXT_DESCRIPTION,titleText:TEXT_DESCRIPTION, icon_ios:ICON_IOS_DESCRIPTION,icon_droid:ICON_ANDROID_DESCRIPTION,
      updateAction:UPDATE_PROFILE_DESC_BY_KEY, addAction:ADD_DESC,
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
      <Container  style={{backgroundColor: COMMON_DARK_BACKGROUND}}>
         <Header style={{backgroundColor: COMMON_DARK_BACKGROUND, height:55, color:"white"}}>
            <Body>
              <H1 style={{color:"silver", textTransform:"capitalize", fontSize:35}}>{headerTitle}</H1>
            </Body>
            <Right>{this.addButton(isPersonalProfile)}</Right>
        </Header>
   <Content padder>
           {items}
          <View style={{borderWidth:2, borderColor:"silver"}}>
              <Left>
              <Button transparent disabled onPress={() => this.onPressImagePicker()}>
                 <Text>{TEXT_CURRENT_IMAGE}</Text>
                 {this.arrowIcon()}
              </Button>
              </Left>
              <Body>
                <Image style={styles.profileImage} source={{uri:this.displayImageURI()}} />              
              </Body>  
            </View>
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
   profileImage:{width:195, height:240},
   profileSeparatorStyle:{backgroundColor:"silver"}
});



export default connect(mapStateToProps, matchDispatchToProps)(ProfileView)

