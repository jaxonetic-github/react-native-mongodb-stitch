import SERTIMA_YOUTUBE_PAYLOAD_MOCK from '../__mocks__/YoutubeResponses/ivansertima.js';
import DR_BEN_YOUTUBE_PAYLOAD_MOCK from '../__mocks__/YoutubeResponses/drben.js';

import AMOS_YOUTUBE_PAYLOAD_MOCK from '../__mocks__/YoutubeResponses/amoswilson.js';
import DR_CLARKE_YOUTUBE_PAYLOAD_MOCK from '../__mocks__/YoutubeResponses/johnhenrikclarke.js';
//* ******       Initial Store State ***********/

const profileState = {
  tmpProfile: {
    name: 'Default Name',
    website: 'http://www.default.com',
    email: 'default@email.com',
    phone: '000-000-0000',
    lastLocation:{longitude:0, latitude:0},
    description: 'Default Description',
    imageURI: '',
  },

  profiles: {
    1: {
      id: '1',
      name: 'Maat eL',
      website: 'http://peace.unity.earth',
      email: 'abc@email.com',
      phone: '5551234567',
      location:{longitude:-122, latitude:33},
      description: 'Many positive moves for the Collectives',
      imageURI: 'file:///var/mobile/Containers/Data/Application/96EAD515-4EBC-4788-A22C-AAF4C83B5AE6/Library/Caches/ExponentExperienceData/%2540anonymous%252FGathering-43db4615-f691-4f2d-908f-daa4fcf37f38/ImagePicker/3CF05F8C-A9E1-44B0-B482-6C3DF285F45A.jpg',
    },

    2: {
      id: '2',
      name: 'Nami',
      website: 'www.website.com',
      email: 'nami@bar.com',
      phone: '5559876543',
      location:{longitude:-122, latitude:33},
      description: 'Faery dust science',
      imageURI: 'file:///var/mobile/Containers/Data/Application/96EAD515-4EBC-4788-A22C-AAF4C83B5AE6/Library/Caches/ExponentExperienceData/%2540anonymous%252FGathering-43db4615-f691-4f2d-908f-daa4fcf37f38/ImagePicker/3CF05F8C-A9E1-44B0-B482-6C3DF285F45A.jpg',
    },
  },
};

const eventState = {
  tmpEvent: {
    name: 'event A',
    website: 'www.event.com',
    email: 'abc@eventemail.com',
    phone: '5551234567',
    calendar: '2018-03-22',
    location: '1600 Pennsylvania Ave, Washington DC',
    description: 'Interesting Event Info',
    imageURI: 'file:///var/mobile/Containers/Data/Application/96EAD515-4EBC-4788-A22C-AAF4C83B5AE6/Library/Caches/ExponentExperienceData/%2540anonymous%252FGathering-43db4615-f691-4f2d-908f-daa4fcf37f38/ImagePicker/3CF05F8C-A9E1-44B0-B482-6C3DF285F45A.jpg',
  },
  events: {
    1: {
      id: '1',
      name: 'Jax Event',
      website: 'http://peace.unity.earth',
      email: 'abc@email.com',
      phone: '5551234567',
      calendar: '2018-03-22',
      location: '1600 Pennsylvania Ave, Washington DC',
      description: 'Many positive moves for the Collectives',
      imageURI: 'file:///var/mobile/Containers/Data/Application/96EAD515-4EBC-4788-A22C-AAF4C83B5AE6/Library/Caches/ExponentExperienceData/%2540anonymous%252FGathering-43db4615-f691-4f2d-908f-daa4fcf37f38/ImagePicker/3CF05F8C-A9E1-44B0-B482-6C3DF285F45A.jpg',
    },

    2: {
      id: '2',
      name: 'Nami Production',
      website: 'www.website.com',
      email: 'nami@bar.com',
      calendar: '2018-03-25',
      location: '1600 Pennsylvania Ave, Washington DC',
      phone: '5559876543',
      description: 'Faery dust science',
      imageURI: 'file:///var/mobile/Containers/Data/Application/96EAD515-4EBC-4788-A22C-AAF4C83B5AE6/Library/Caches/ExponentExperienceData/%2540anonymous%252FGathering-43db4615-f691-4f2d-908f-daa4fcf37f38/ImagePicker/3CF05F8C-A9E1-44B0-B482-6C3DF285F45A.jpg',
    },
  },
};

const authUsersState = {
  app:{isConnectedToInternet:false},
  auth: 1, // constants-> NEED_AT_LEAST_ANONYMOUS_LOGIN,
  users: {
    1: { username: 'mattiamanzati', token: 'resthttprequestsaccesstoken' },
    2: { username: 'another user' },
  },
};
const dbState = {
  profilesCRUD: {
    isFetching: false,
    didInvalidate: false,
    dbProfiles: [],
  },
  eventsCRUD: {
    isFetching: false,
    didInvalidate: false,
    dbEvents: [],
  },
};
const onlineMediaContent = [
{title:"Innerversity", imageURI:"https://yt3.ggpht.com/a-/AAuE7mAaea03f9JDjz9WBM6hx1QSPomQj9EXdgVcwA=s176-mo-c-c0xffffffff-rj-k-no", url:"https://www.secretenergy.com/about-us"},
{title:"Kemetic Legacy Today", url:"https://www.mnn.org/news/what-watch-weekend-kemetic-legacy-today", description:'Kemetic Legacy Today airs every Saturday at 12:00 PM EST on Manhattan Neighborhood Network channel 34 (Time Warner), 82 (RCN), and 33 (FIOS).  MNN is accessible to cable television subscribers in the borough of reach of up to 3 million viewers.  Additionally, MNN is streamed live to anyone with Internet access on its website. Kemetic Legacy Today\'s target audience is primarily composed of people of African descent and other People of Color aged 16 to 65.  Other people interested in programming on alternate spiritual practices are also attracted to the series.'},
{title:"Saaneter TV", url:"https://www.youtube.com/channel/UCyYZ6-LdEXaZzxA0RsJ93GQ/videos", description:"Saneter Studios has brought our younger and elder scholars together for debates on the issues that affect our consciousness" },
{title:"Phillip Shock Matthews", description:"Phillip Matthews has been spreading the message and doing the work for over 20 years. He brings together and interviews giants like Brothers Haiwatha Kamene, Oba T Shaka, Dr Nichols with topics ranging from epigentics to history...to solutions.", url:"https://www.youtube.com/user/philippematthews/playlists"},
 ];

const amos_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNprjQ-mnD5816kx6SEfgfg&key=AIzaSyCSXLM0pMb0GCPvNtVdd1GeSa0UCl6zAEM';
const drClarke_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=john+henrik+clarke&key=AIzaSyCSXLM0pMb0GCPvNtVdd1GeSa0UCl6zAEM';
const drBen_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=dr+ben+jochannan&key=AIzaSyCSXLM0pMb0GCPvNtVdd1GeSa0UCl6zAEM';
const drsertima_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=dr+ivan+sertima&key=AIzaSyCSXLM0pMb0GCPvNtVdd1GeSa0UCl6zAEM';

const youTubeResources = [{title:"Dr Ivan Sertima", url:drsertima_url, generalCategory:["History"], payload:SERTIMA_YOUTUBE_PAYLOAD_MOCK},
                          {title:"Dr Ben Jochannan", url:drBen_url, generalCategory:["History"], payload:DR_BEN_YOUTUBE_PAYLOAD_MOCK},
                          {title:"Dr John Henrik Clarke", url:drClarke_url, generalCategory:["History"], payload:DR_CLARKE_YOUTUBE_PAYLOAD_MOCK},
                          {title:"Dr James Smalls", url:'', payload:'', generalCategory:["History"]},
                         {title:"Dr Wade Nobles", url:'', payload:'', generalCategory:["History"]},                       
                         {title:"Dr Leonard Jeffries", url:'', payload:'', generalCategory:["History"]},
                          {title:"Dr Amos Wilson", url:amos_url, generalCategory:["Psychology"], payload:AMOS_YOUTUBE_PAYLOAD_MOCK},
                          {title:"Dr Claud Anderson", url:amos_url,generalCategory:["Economics"], payload:AMOS_YOUTUBE_PAYLOAD_MOCK},
                          {title:"Dr Llaila Afrika", url:amos_url,generalCategory:["Economics"], payload:AMOS_YOUTUBE_PAYLOAD_MOCK},
                         {title:"Dr Edwin Nichols", url:'', payload:'', generalCategory:["Philosophy"]},
                         {title:"Dr Degruy", url:'', payload:'', generalCategory:["Psychology"]},
                         {title:"Sevan Bomar", url:'', payload:'',generalCategory:["Mover"]},
                         {title:"Santos Bonacci", url:'', payload:'',generalCategory:["Occult"]},
                         {title:"Phil Valentine", url:'', payload:'',generalCategory:["Occult"]},
                         {title:"Bobby Hemmit", url:'', payload:'',generalCategory:["Occult"]},
                         {title:"Krs One", url:'', payload:'',generalCategory:["Mover"]},
                         {title:"Kwame Toure", url:'', payload:'',generalCategory:["Mover"]},
                         {title:"Dr El Malik El Shabaz", url:'',generalCategory:["Warrior"], payload:''}
                          ]

const subjects=[{etymology:"", description:"language has been weaponized"}];

const digitalResources = [{key:"1", title:"Hidden Colors", description:"Comprehensive outline of our struggle"},{key:"2", title:"1804", description:"The Haitian Revolution"}, {key:"3", title:"Out of Darkness",description:""}];
const misConceptions =["India didn't exist before 1940's Hindustan, so why did he label the Africans that he found as Indians", ""];
const faqs=[{question:'Where did "white" people come from?',
                answers:[{url:"https://www.youtube.com/watch?v=YLgK0xzK_2U", desc:""},{url:"https://www.youtube.com/watch?v=I_v77StW7tM", desc:"Drs Imhotep and Hiawatha", title:"Ancient African History and the Six Physical Transmutations of the Human Family"}]},
            {question:'Why do we call some people white and others black?',
               answers:
               [
                {url:"https://www.youtube.com/watch?v=HhAjycvAN8k", desc:"Dr Jaqueline Battalora and Jane Elliot", title:"Dr. Jacqueline Battalora and Jane Elliott Debate White Privilege"},
                {url:"https://www.youtube.com/watch?v=rPhlteY1knA", desc:"Dr Jaqueline Battalora", title:"1681 - The Invention of Race: The Laws that Changed the World!"}
               ]
             }
            ];

const webResources = [
  { title: "Africa_Town", url:"https://africatownseattle.com",  imageURI:"https://blackmonk-saas.s3.amazonaws.com/media/schema_africatownseattlecom/sitelogo/3442af33-4c17-4f37-be96-07088fc18182.png" },
  { title: "Black Wall Street", url:"https://officialblackwallstreet.com/directory/",  imageURI:"https://officialblackwallstreet.com/wp-content/uploads/2017/10/Updated-Black-Site-Logo.png" },
  { title: "Black Owned Business", url:"http://www.blackownedbiz.com/directory/",  imageURI:"https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/431063_298181383579588_1616290251_n.jpg?_nc_cat=101&_nc_ht=scontent-lax3-2.xx&oh=991895ef8bfcf3b5ca98a52b03abcb40&oe=5D34B066" },
  { title: "Harvest Institute", url:"http://www.harvestinstitute.org/",  imageURI:"" },
  { title: "National Black Guide", url:"http://www.nationalblackguide.com/black-directory/", imageURI:"http://www.nationalblackguide.com/wp-content/uploads/2015/10/NationalBlackGuide_invert_logo-300x93.png"},
  { title: "Support Black Owned", featureDescription:"The name pretty much speaks for itself.", url:"https://www.supportblackowned.com/", imageURI:"https://www.supportblackowned.com/images/sitelogo2.png"}];

const resourcesData ={youTubeResources: youTubeResources, webResources:webResources,
                             onlineMediaContent:onlineMediaContent, digitalResources:digitalResources};

const sideBarData = [{routeName:"Home", label:"Home", requiresVerification:false, icon:"home"}, {routeName:"ProfileView", label:"Profile", requiresVerification:true, icon:"person"}, 
                      {routeName:"SearchLayout", label:"Events & Creators", requiresVerification:false, icon:"search"},{routeName:"VideoSearch", label:"Library", requiresVerification:false, icon:"business",videoData:null,onlineMediaContent:null,webResources:null},
                      {routeName:"TimelineView", label:"Timeline", requiresVerification:false, icon:'hourglass'}
                      ];

export const initialStoreState = {
  profiles: profileState,
  events: eventState,
  auth: authUsersState,
  sideBar:sideBarData,
  resourcesData:resourcesData

};
