
  import React from 'react'
  import { View ,ActivityIndicator } from 'react-native';


import SERTIMA_YOUTUBE_PAYLOAD_MOCK from './YoutubeResponses/ivansertima.js';
import DR_BEN_YOUTUBE_PAYLOAD_MOCK from './YoutubeResponses/drben.js';

import AMOS_YOUTUBE_PAYLOAD_MOCK from './YoutubeResponses/amoswilson.js';
import DR_CLARKE_YOUTUBE_PAYLOAD_MOCK from './YoutubeResponses/johnhenrikclarke.js';

export const NO_PHOTO_AVAILABLE_URI =  "https://static.wixstatic.com/media/84428b_aec5877604ff494295b3af5af0b27a67~mv2.png";

/*************  Stitch **************/

export const FUNCTION_INSERTPROFILE = "insertProfile";
export const FUNCTION_INSERTEVENT   = "insertEvent";
export const FUNCTION_QUERYPROFILE = "queryProfiles";
export const FUNCTION_QUERYEVENTS = "queryEvents";
export const FUNCTION_UPDATEPROFILE = "updateProfile";
export const FUNCTION_UPDATEEVENT = "updateEvent";
export const FUNCTION_RETRIEVE_GOOGLE_WEBCLIENTID = "retrieveGoogleWebClientID";
export const FUNCTION_RETRIEVE_GOOGLE_IOSCLIENTID = "retrieveGoogleIosClientID";
export const FUNCTION_RETRIEVE_GOOGLE_APIKEY = "retrieveGoogleApiKey";

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



// Importing redux state and corresponding redux constants
export const STATE = require('./redux/state.js');
export const TYPES = require('./redux/types.js');

export const ROUTE_EVENTVIEW = '';
export const ROUTE_MAPVIEW = 'MapView';
export const ROUTE_EVENT_CALENDAR = 'EventCalendar';
export const ROUTE_SIMPLE_INPUT_VIEW = 'SimpleEventInput';
export const ROUTE_SIMPLE_WEB_VIEW = 'SimpleWebView';
export const ROUTE_PROFILE_VIEW = 'ProfileView';

// Label Text
export const TEXT_SAVE = 'Save';
export const TEXT_UPDATE = 'Update';
export const WEBVIEW_CONNECTION_ERROR = "Unable to display WebView, please check your internet connection";

export const TEXT_EVERYWHERE = 'Everywhere';
export const TEXT_ALL = 'All';
export const PROFILE = 'profile';
export const EVENT = 'event';

export const TEXT_WHATS_GOING_ON = "What's going on in ...?";

export const TEXT_CHOOSE_VIBE = '"choose a vibe"';
  

// CSS Constants
export const COMMON_DARK_BACKGROUND = '#243244';
export const INACTIVE_TINT_COLOR = '#9ab';
export const ACTIVE_TINT_COLOR = '#b8bb49';

//************ Common Components
const listItemSeparatorStyle = { height: 2, backgroundColor:COMMON_DARK_BACKGROUND  };
export const COMMON_ACTIVITY_INDICATOR = <View style={{ flex: 1, paddingTop: 20 ,justifyContent: 'space-around'}}><ActivityIndicator /></View>;
export const COMMON_LISTVIEW_ITEM_SEPARATOR = ()=> <View style={listItemSeparatorStyle} />;
export const ALT_LISTVIEW_ITEM_SEPARATOR = ()=> <View style={{flex:1,paddingTop:10, height: 20, backgroundColor:COMMON_DARK_BACKGROUND  }} />;
export const COMMON_ICON_STYLE = {fontSize: 20, color: 'black'};

/*
 * If the user has logged out "too much", meaning out of Stitch,
 *  the redux state.auth.auth value will be set to this constant
 */
export const NEED_AT_LEAST_ANONYMOUS_LOGIN = '1';


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
export const LOCATION_LIST = [{label:"Washington", value:"WA"}, {label:"Tucson", value:"AZ"}, {label:"District of Columbia", value:"DC"}];
export const CATEGORY_LIST = [{label:"Educational", value:"Educational"}, {label:"Economics", value:"Economics"}, {label:"Commerce", value:"Commerce"}, {label:"Healing", value:"Healing"}, {label:"Capoeira", value:"Capoeira"}];
export const SUBCATEGORY_LIST = [{label:"Mental Slavery", value:"Mental Slavery", }, {label:"War", value:"War"}, {label:"Solutions", value:"Solutions"},
 {label:"Information", value:"Information"}];
   
const books=[{author:"G M James",  title:"Stolen Legacy"},{author:"Carter G Woodson", title:"The MisEducation of the Negro"}];
const onlineMediaContent = [
{title:"Kemetic Legacy Today", url:"https://www.mnn.org/news/what-watch-weekend-kemetic-legacy-today", description:'Kemetic Legacy Today airs every Saturday at 12:00 PM EST on Manhattan Neighborhood Network channel 34 (Time Warner), 82 (RCN), and 33 (FIOS).  MNN is accessible to cable television subscribers in the borough of reach of up to 3 million viewers.  Additionally, MNN is streamed live to anyone with Internet access on its website. Kemetic Legacy Today\'s target audience is primarily composed of people of African descent and other People of Color aged 16 to 65.  Other people interested in programming on alternate spiritual practices are also attracted to the series.'},
{title:"Saaneter TV", url:"https://www.youtube.com/channel/UCyYZ6-LdEXaZzxA0RsJ93GQ/videos", description:"Saneter Studios has brought our younger and elder scholars together for debates on the issues that affect our consciousness" },
{title:"Phillip Shock Matthews", description:"Phillip Matthews has been spreading the message and doing the work for over 20 years. He brings together and interviews giants like Brothers Haiwatha Kamene, Oba T Shaka, Dr Nichols with topics ranging from epigentics to history...to solutions.", url:"https://www.youtube.com/user/philippematthews/playlists"},
 ];

const amos_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNprjQ-mnD5816kx6SEfgfg&key=AIzaSyCSXLM0pMb0GCPvNtVdd1GeSa0UCl6zAEM';
const drClarke_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=john+henrik+clarke&key=AIzaSyCSXLM0pMb0GCPvNtVdd1GeSa0UCl6zAEM';
const drBen_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=dr+ben+jochannan&key=AIzaSyCSXLM0pMb0GCPvNtVdd1GeSa0UCl6zAEM';
const drsertima_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=dr+ivan+sertima&key=AIzaSyCSXLM0pMb0GCPvNtVdd1GeSa0UCl6zAEM';

const youTubeResources = [{title:"Dr Ivan Sertima", url:drsertima_url, generalCategory:"History", payload:SERTIMA_YOUTUBE_PAYLOAD_MOCK},
                          {title:"Dr Ben Jochannan", url:drBen_url, generalCategory:"History", payload:DR_BEN_YOUTUBE_PAYLOAD_MOCK},
                          {title:"Dr Amos Wilson", url:amos_url, generalCategory:"Psychology", payload:AMOS_YOUTUBE_PAYLOAD_MOCK},
                          {title:"Dr Claud Anderson", url:amos_url,generalCategory:"Economics", payload:AMOS_YOUTUBE_PAYLOAD_MOCK},
                          {title:"Dr John Henrik Clarke", url:drClarke_url, generalCategory:"History", payload:DR_CLARKE_YOUTUBE_PAYLOAD_MOCK},
                          {title:"Dr James Smalls", url:'', payload:'', generalCategory:"History"},
                         {title:"Dr Wade Nobles", url:'', payload:'', generalCategory:"History"},                       
                         {title:"Dr Leonard Jeffries", url:'', payload:'', generalCategory:"History"},
                         {title:"Dr Edwin Nichols", url:'', payload:'', generalCategory:"Philosophy"},
                         {title:"Dr Degruy", url:'', payload:'', generalCategory:"Psychology"},
                         {title:"Sevan Bomar", url:'', payload:'',generalCategory:"Mover"},
                         {title:"Krs One", url:'', payload:'',generalCategory:"Mover"},
                         {title:"Kwame Toure", url:'', payload:'',generalCategory:"Mover"},
                         {title:"Dr El Malik El Shabaz", url:'',generalCategory:"Warrior", payload:''}
                          ]


const digitalResources = [{key:"1", title:"Hidden Colors"}, {key:"2", title:"Out of Darkness"}];

const faqs=[{question:'Where did "white" people come from?',
               answers:[{url:"https://www.youtube.com/watch?v=YLgK0xzK_2U", desc:""},{url:"https://www.youtube.com/watch?v=I_v77StW7tM", desc:"Drs Imhotep and Hiawatha", title:"Ancient African History and the Six Physical Transmutations of the Human Family"}]},
            {question:'Why do we call some people white and others black?',
               answers:[
                {url:"https://www.youtube.com/watch?v=HhAjycvAN8k", desc:"Dr Jaqueline Battalora and Jane Elliot", title:"Dr. Jacqueline Battalora and Jane Elliott Debate White Privilege"},
               ,{url:"https://www.youtube.com/watch?v=rPhlteY1knA", desc:"Dr Jaqueline Battalora", title:"1681 - The Invention of Race: The Laws that Changed the World!"}]}
            ];

const webResources = [
  { title: "Africa_Town", url:"https://africatownseattle.com",  imageURI:"https://blackmonk-saas.s3.amazonaws.com/media/schema_africatownseattlecom/sitelogo/3442af33-4c17-4f37-be96-07088fc18182.png" },
  { title: "Black Wall Street", url:"https://officialblackwallstreet.com/directory/",  imageURI:"https://officialblackwallstreet.com/wp-content/uploads/2017/10/Updated-Black-Site-Logo.png" },
  { title: "Black Owned Business", url:"http://www.blackownedbiz.com/directory/",  imageURI:"https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/431063_298181383579588_1616290251_n.jpg?_nc_cat=101&_nc_ht=scontent-lax3-2.xx&oh=991895ef8bfcf3b5ca98a52b03abcb40&oe=5D34B066" },
  { title: "Harvest Institute", url:"http://www.harvestinstitute.org/",  imageURI:"" },
  { title: "National Black Guide", url:"http://www.nationalblackguide.com/black-directory/", imageURI:"http://www.nationalblackguide.com/wp-content/uploads/2015/10/NationalBlackGuide_invert_logo-300x93.png"},
  { title: "Support Black Owned", featureDescription:"The name pretty much speaks for itself.", url:"https://www.supportblackowned.com/", imageURI:"https://www.supportblackowned.com/images/sitelogo2.png"}];

export const resourceData ={youTubeResources: youTubeResources, webResources:webResources,
                             onlineMediaContent:onlineMediaContent, digitalResources:digitalResources};

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





