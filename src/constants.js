import React from 'react'
import { Platform, View ,ActivityIndicator,FlatList, Text, TouchableOpacity,Tab,Tabs } from 'react-native';
import {ListItem, Thumbnail, Title, Button, Header,Left,Icon,Body,Right} from 'native-base';
import {FaBars, FaArrowCircleRight,FaArrowLeft,FaPlusCircle,FaMinusCircle,FaCalendar,FaMapMarker,FaPhoneSquare, FaSearch,FaGlobe,FaExternalLink,FaHourglass2,FaHome,  FaSearchengin, FaUser,FaRegBuilding,FaEdit,FaThList } from "react-icons/fa";
import { GiHamburgerMenu } from 'react-icons/gi';

import {MdSend} from 'react-icons/md'

import {IoMdMenu} from 'react-icons/io';


export const NO_PHOTO_AVAILABLE_URI =  "https://static.wixstatic.com/media/84428b_aec5877604ff494295b3af5af0b27a67~mv2.png";

/*************  Stitch **************/

export const FUNCTION_INSERTPROFILE = "insertProfile";
export const FUNCTION_INSERTEVENT   = "insertEvent";
export const FUNCTION_QUERYPROFILE = "queryProfiles";
export const FUNCTION_QUERYEVENTS = "queryEvents";
export const FUNCTION_UPDATEPROFILE = "updateUser";
export const FUNCTION_UPDATEEVENT = "updateEvents";
export const FUNCTION_RETRIEVE_GOOGLE_WEBCLIENTID = "retrieveGoogleWebClientID";
export const FUNCTION_RETRIEVE_GOOGLE_IOSCLIENTID = "retrieveGoogleIosClientID";
export const FUNCTION_RETRIEVE_GOOGLE_APIKEY = "retrieveGoogleApiKey";
export const FUNCTION_DELETE_PROFILE = "retrieveGoogleApiKey";



//Needed for react-native-google-signin
export const GOOGLESIGNIN_OPTION_SCOPE = "openid email profile";
export const GOOGLESIGNIN_OPTION_RESPONSE_TYPE = "code";

export const REMOTE_RESOURCE_STRING ='maatel_artistrenaissance-dilzf';
export const DBNAME = 'maat_el_renaissance';
export const ATLAS_FACTORY = 'mongodb-atlas'; 

// Mongo Collection Names 
export const PROFILES_COLLECTION = 'Profiles';
export const EVENT_COLLECTION = 'events';
export const MAATUSER_COLLECTION = 'MaatUsers';

export const COMMON_EMPTY = (unknownVariable)=>((unknownVariable == '')||(unknownVariable == []) || (unknownVariable == {}) || (unknownVariable == undefined) )
export const EMPTY_STRING = '';

// Importing redux state and corresponding redux constants
export const STATE = require('./redux/state.js');
export const TYPES = require('./redux/types.js');

export const ROUTE_ROOT = '/';
export const ROUTE_REMOTE_ROOT = '/';
export const ROUTE_HOME = '/Home';
export const ROUTE_TRUBRARY = '/Trubrary';
export const ROUTE_MAPVIEW = '/MapView';
export const ROUTE_EVENT_CALENDAR = '/EventCalendar';
export const ROUTE_SIMPLE_INPUT_VIEW = '/SimpleEventInput';
export const ROUTE_SIMPLE_WEB_VIEW = '/SimpleWebView';
export const ROUTE_PROFILE_VIEW = '/Activities/ProfileView';
export const ROUTE_ACTIVITIES = '/Activities';
export const ROUTE_EVENT_VIEW = "/Activities/EventView";
export const ROUTE_SIMPLE_PROFILE_INPUT = '/SimpleInput';

export const ROUTE_YOUTUBELIST_VIEW = '/YoutubeListView';

//*********************  HTML  *********************/
// Icons
export const ICON_ADD_CIRCLE = "add-circle";
export const ICON_REMOVE_CIRCLE = "remove-circle";
export const ICON_IOS_CIRCLE = "ios-add-circle";
export const ICON_ANDROID_CIRCLE = "md-add-circle";
export const ICON_IOS_LOGOUT = "ios-log-out";
export const ICON_ANDROID_LOGOUT = "md-log-out";
export const ICON_IOS_PERSON = "ios-person";
export const ICON_ANDROID_PERSON = "md-person";
export const ICON_IOS_PORTRAIT = "ios-phone-portrait";
export const ICON_ANDROID_PORTRAIT = "md-phone-portrait";
export const ICON_IOS_GLOBE = "ios-globe";
export const ICON_ANDROID_GLOBE = "md-globe";
export const ICON_IOS_MAIL = "ios-mail";
export const ICON_ANDROID_MAIL = "md-mail";
export const ICON_IOS_DESCRIPTION = "ios-list-box";
export const ICON_ANDROID_DESCRIPTION = "md-list-box";
export const ICON_IOS_LOCATION = "ios-pin";
export const ICON_ANDROID_LOCATION = "md-pin";
export const ICON_IOS_CALENDAR = "ios-calendar";
export const ICON_ANDROID_CALENDAR = "md-calendar";
export const ICON_ALL_TRASH = 'trash';
export const ICON_ALL_ARROWFORWARD = 'arrow-forward';
export const ICON_IOS_INFORMATION = 'ios-information-circle';
export const ICON_ANDROID_INFORMATION = 'md-information-circle';

export const ICON_TAG_CALENDAR = "calendar";

export const ICON_TAG_HOME = "home";
export const ICON_TAG_BACK = "back-arrow";
export const ICON_TAG_EDIT = "save"
export const ICON_TAG_PHONE = "call";
export const ICON_TAG_MAIL = "mail";
export const ICON_TAG_GLOBE = "globe";
export const ICON_TAG_LOCATION = "pin";
export const ICON_TAG_DESCRIPTION = "globe";
export const ICON_TAG_EXTERNAL_LINK = "external-link";
export const ICON_TAG_MENU = "menu";
export const ICON_TAG_PERSON = "person";
export const ICON_TAG_SEARCH = "search";
export const ICON_TAG_BUSINESS = "business";
export const ICON_TAG_CREATE = "create";
export const ICON_TAG_REMOVE_CIRCLE = "minus-circle";
export const ICON_TAG_ADD_CIRCLE = "plus-circle";
export const ICON_TAG_ARROW_RIGHT ="arrow-forward";
//
//hourglass2
/**
* @param iconTag : an identifing tag for the icon [home, menu,...]
* @param style   : a style object for the icon
*/
export const iconManager =(iconTag, style)=>{
  let icon = null;
  const webPlatform = (Platform.OS === 'web') ;

  switch(iconTag)
  {
    case ICON_TAG_HOME: icon = webPlatform? <FaHome style={style}/> : <Icon name={iconTag} style={style} />; break;
    case ICON_TAG_BACK: icon = webPlatform? <FaArrowLeft style={style}/> : <Icon name={iconTag} style={style} />; break;
    case ICON_TAG_LOCATION: icon = webPlatform? <FaMapMarker style={style}/> : <Icon name={iconTag} style={style} />; break;
    case ICON_TAG_GLOBE: icon = webPlatform? <FaGlobe style={style}/> : <Icon name={iconTag} style={style} />; break;
    case ICON_TAG_CALENDAR: icon = webPlatform? <FaCalendar style={style}/> : <Icon name={iconTag} style={style} />; break;
    case ICON_TAG_DESCRIPTION: icon = webPlatform? <MdSend style={style}/> : <Icon name={iconTag} style={style} />; break;
    case ICON_TAG_EDIT: icon = webPlatform ? <MdSend style={style} /> : <Icon name={iconTag} style={style}/>; break;
    case ICON_TAG_MENU: icon = webPlatform ? <FaBars style={style} /> : <Icon name={iconTag} style={style}/>; break;
    case ICON_TAG_PERSON: icon = webPlatform? <FaUser style={style} /> : <Icon name={iconTag} style={style} />; break;
    case ICON_TAG_PHONE: icon = webPlatform ? <FaPhoneSquare style={style} /> : <Icon name={iconTag} style={style}/>; break;
    case ICON_TAG_MAIL: icon = webPlatform ? <MdSend style={style} /> : <Icon name={iconTag} style={style} />; break;
    case ICON_TAG_SEARCH: icon = webPlatform ? <FaSearchengin style={style} /> : <Icon name={iconTag} style={style}/>; break;
    case ICON_TAG_BUSINESS: icon = webPlatform ? <FaRegBuilding style={style} /> : <Icon name={iconTag} style={style} />; break;
    case ICON_TAG_CREATE: icon = webPlatform ? <FaPlusCircle style={style} /> : <Icon name={iconTag} style={style} />; break;
    case ICON_TAG_REMOVE_CIRCLE: icon = webPlatform ? <FaMinusCircle style={style} /> : <Icon name={iconTag} style={style} />; break;
    case ICON_TAG_ARROW_RIGHT: icon = webPlatform ? <FaArrowCircleRight style={style} /> : <Icon name={iconTag} style={style} />; break;
  default ://no default
   break;
  }
  return icon;
}

// Label Text
export const PLACEHOLDER_SEARCH_TEXT = "Search Here";
export const TEXT_WEBSITE = "Website";
export const TEXT_NAME = "Name";
export const TEXT_MAIL = "Email";
export const TEXT_PHONE = "Phone";
export const TEXT_DESCRIPTION = "Description";
export const TEXT_EVENT_CALENDAR = "Event Calendar";


export const TEXT_ADD_ARTIST = "Add Divine";
export const TEXT_NEW_EVENT = 'New Event';
export const TEXT_DELETE = 'Delete';
export const TEXT_VIEW = 'View';
export const TEXT_EDIT = 'Edit';
export const TEXT_SAVE = 'Save';
export const TEXT_UPDATE = 'Update';

export const WEBVIEW_CONNECTION_ERROR = "Unable to display WebView, please check your internet connection";

export const TEXT_EVERYWHERE = 'Everywhere';
export const TEXT_ALL = 'All';
export const PROFILE = 'profile';
export const EVENT = 'event';
export const EVENTS = 'Events';

export const TEXT_WHATS_GOING_ON = "What's going on in ...?";
export const TEXT_CHOOSE_VIBE = '"choose a vibe"';
export const TEXT_CURRENT_IMAGE ="Select an Image?";
// CSS Constants
export const COMMON_DARK_BACKGROUND = '#243244';
export const INACTIVE_TINT_COLOR = '#9ab';
export const ACTIVE_TINT_COLOR = '#b8bb49';
export const TRANSPARENT_COLOR = 'transparent';

//************ Common Components //
const listItemSeparatorStyle = { height: 2, backgroundColor:COMMON_DARK_BACKGROUND  };
export const COMMON_TEXT_STYLE = {padding:15, color:"white"};
export const COMMON_ACTIVITY_INDICATOR = <View style={{ flex: 1, paddingTop: 20 ,justifyContent: 'space-around'}}><ActivityIndicator /></View>;
export const COMMON_LISTVIEW_ITEM_SEPARATOR = ()=> <View style={listItemSeparatorStyle} />;
export const ALT_LISTVIEW_ITEM_SEPARATOR = ()=> <View style={{flex:1,paddingTop:10, height: 20, backgroundColor:COMMON_DARK_BACKGROUND  }} />;
export const COMMON_ICON_STYLE = {fontSize: 20, color: COMMON_DARK_BACKGROUND};
export const COMMON_ICON_STYLE_MAROON = {fontSize: 20, color: 'maroon'};
export const COMMON_ICON_STYLE_SILVER = {fontSize: 20, color: 'silver'};
/**
 * Displays a list, where each element of the list must have a title,url, and imageURI variable
 * @param keyExtractor: records of the form {title:, imageURI:...,}
 * @param headerComponent : a component for the list header
 * @param listData: records of the form {title:, imageURI:...,}
 * @param navigation: a react navigation for the passed in route
 * @param outerViewStyle : responsive styles  for outer View object
 * @param titleStyle :     responsive styles for title element
 * @param route : the routing navigation constant 
 * @param buttonText : the text for the view Button
 * @param altPhotoURI : a URI for an image in case none is specified by the data
 * @param separator : a component/View for separator
 */
export const renderListView = (keyExtractor,headerComponent,renderItemComponent,listData,separator,outerViewStyle, titleStyle, route, buttonText ) =>(
<FlatList      
          data={listData}
          renderItem={renderItemComponent}
          keyExtractor={keyExtractor}
          ListHeaderComponent={headerComponent}
           ItemSeparatorComponent={separator}
        />)

 const COMMON_VIEWBUTTON_STYLES ={
 customOuterStyle:{position:"absolute", bottom:0, right:-5},
  buttonText:{color:"gold", paddingLeft:10, paddingRight:10, paddingTop:5, paddingBottom:5},
  buttonOuterShell:{flex:1, borderWidth:2, borderRadius:15, backgroundColor:COMMON_DARK_BACKGROUND},
  buttonTextShell:{ borderWidth:1, borderRadius:10, backgroundColor:"maroon"}
}

/**
 *   Show a common button
 *  @param buttonText: text displayed by the button
 *  @param buttonPressAction: callback to handle the button-press event
 */
export const commonViewButton = (buttonText,buttonPressAction) =>(
 <View  style={COMMON_VIEWBUTTON_STYLES.customOuterStyle}  >
               <View style={COMMON_VIEWBUTTON_STYLES.buttonOuterShell}>
                <TouchableOpacity onPress={buttonPressAction||null} style={COMMON_VIEWBUTTON_STYLES.buttonTextShell} >
                 <Text style={COMMON_VIEWBUTTON_STYLES.buttonText}>{buttonText}</Text>
                </TouchableOpacity></View></View>)



/*
 * If the user has logged out "too much", meaning out of Stitch,
 *  the redux state.auth.auth value will be set to this constant
 */
export const NEED_AT_LEAST_ANONYMOUS_LOGIN = '1';

export const LIST_SWIPELEFT_OPENVALUE = 100;
export const LIST_SWIPERIGHT_OPENVALUE=-75;

//**********************  Test ***************************/
export const TIME_OUT = 122999;
export const JEST_TIME_OUT = 125999;

//random generator
export const RANDOM_NUMBER_SEED = 999999;
export const random = seed => (Math.floor(Math.random() * Math.floor(seed ? seed: RANDOM_NUMBER_SEED)));

// Stitch Auth Constants
export const GOOGLE_PROVIDER_NAME = 'oauth2-google';
export const STITCH_ANONYMOUS_PROVIDER = 'anon-user';

/*  
 *  UnComment "export const getRunn..." to be able to 
 *             read the name of a function at runtime
 *
 * getFuncName : a helper function to dynamically determine the running function name
 *                
 * post# 24
 * https://stackoverflow.com/questions/1013239/can-i-get-the-name-of-the-currently-running-function-in-javascript
 */
//export const getRunningFunctionName = () => getRunningFunctionName.caller.name;

/** ************ TEST MOCKS   ************** */
export const STATES =
{
      "key": "United States",
      "states": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
    }
export const LOCATION_LIST = [{label:"Washington", value:"WA"}, {label:"Tucson", value:"AZ"}, {label:"District of Columbia", value:"DC"}];
export const CATEGORY_LIST = [{label:"Educational", value:"Educational"}, {label:"Economics", value:"Economics"}, {label:"Commerce", value:"Commerce"}, {label:"Healing", value:"Healing"}, {label:"Capoeira", value:"Capoeira"}];
export const SUBCATEGORY_LIST = [{label:"Mental Slavery", value:"Mental Slavery", }, {label:"War", value:"War"}, {label:"Solutions", value:"Solutions"},
 {label:"Information", value:"Information"}];
   
 const books=[{author:"Druscilla Houson",  title:"Wonderful Ethiopians of the Ancient Cushite Empire"},
              {author:"G M James",  title:"Stolen Legacy"},
              {author:"John G Jackson",  title:"Man, God, and Civilization"},
              {author:"Carter G Woodson", title:"The MisEducation of the Negro"}];

 const DEFAULT_EVENT = STATE.initialStoreState.events.tmpEvent;
 const DEFAULT_PROFILE = STATE.initialStoreState.profiles.tmpProfile;

/**
  * 
  * {type: 'TEST_Event', payload: {an event object}}
  *  type: only used to continue the redux "{type,payload}" paradigm
  *. payload: a mock/default event taken from the initial redux store state
  */
export const TEST_EVENT_ACTION = {
  type: TYPES.ADD_EVENT_SUCCESS,
  payload: DEFAULT_EVENT,
};

/**
  * {type: 'TEST_Event', payload: {an event object}}
  *  type: only used to continue the redux "{type,payload}" paradigm
  * payload: a mock/default event taken from the initial redux store state
  */
export const TEST_PROFILE_ACTION = {
  type: TYPES.ADD_PROFILE_SUCCESS,
  payload: DEFAULT_PROFILE,
};

/**
 *  Returns an event object like {id, name} to a default Event object.
 */
export const getDefaultEvent = (eventObject) => {
  const event = eventObject ? eventObject: { ...DEFAULT_EVENT };
  event.id = random(RANDOM_NUMBER_SEED);
  event.name = eventObject ? event.name : `Default Name_${event.id}`;
  return event;
};

/**
 *  Returns a profile object like {id, name} to a default Profile object.
 */
export const getDefaultProfile = (eventProfile) => {
  const profile = eventProfile ? eventProfile : { ...DEFAULT_PROFILE };
  profile.id = random(RANDOM_NUMBER_SEED);
  profile.name = eventProfile ? eventProfile.name : `Default Name_${profile.id}`;
  return profile;
};





