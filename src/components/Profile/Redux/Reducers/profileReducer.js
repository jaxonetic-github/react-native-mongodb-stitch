import { UPDATE_PROFILE_DESC_BY_KEY, FETCH_PROFILE_SUCCESS, UPDATE_PROFILE_NAME_BY_KEY, UPDATE_PROFILE_WEBSITE_BY_KEY, UPDATE_PROFILE_PHONE_BY_KEY, UPDATE_PROFILE_EMAIL_BY_KEY, UPDATE_PROFILE_IMAGE_BY_KEY, REMOVE_LOCAL_PROFILE, ADD_PROFILE_TO_USERPROFILES, ADD_NAME, ADD_DESC, ADD_EMAIL, ADD_PHONE, ADD_WEBSITE, ADD_IMAGE} from '../../../../redux/types';

/**
 * 
 */
const profileReducer = (state={}, action) => {

  switch(action.type) {
        case FETCH_PROFILE_SUCCESS:
        let backEndProfiles={} ;/*= action.payload.map(item=>({[item.id]:item}))*/
       for (var i = 0; i < action.payload.length; i++) {
          backEndProfiles[action.payload[i].id]=action.payload[i]
        }   
        return {  tmpProfile:{...state.tmpProfile },
                  profiles:backEndProfiles
              };
      
    case ADD_PROFILE_TO_USERPROFILES:

 let newProfiles = {...state.profiles};
    let profiles = action.payload.filter(filt=>{
   if(!state.profiles[filt.id]);
         newProfiles = {...newProfiles, [filt.id]:filt}
        return !state.profiles[filt.id];
      })

    //newEvents = {...newEvents, ...profiles}
    return {
        tmpProfile:{...state.tmpProfile}, 
        profiles:newProfiles
      };
  case REMOVE_LOCAL_PROFILE:
      let tmp = {...state.profiles};

      delete tmp[action.payload.id];
      return {
       tmpProfile:{...state.tmpProfile },
         profiles:{...tmp}
      };    
   case UPDATE_PROFILE_NAME_BY_KEY:
      if(action.key)
      {
        //get a copy of all of the profiles in state
        let _tmpProfiles = {...state.profiles};
        //update the name field of the event specified by key
        _tmpProfiles[action.key].name = action.payload;
        _tmpProfiles[action.key].hasBeenModifiedLocally = true;

        return {
       tmpProfile:{...state.tmpProfile},
         profiles:{..._tmpProfiles}
      };
      }else
      {

        return {
         tmpProfile:{...state.tmpProfile, email:action.payload },
         profiles:{...state.profiles},
         error :"No key specified"
       }
      }
     case UPDATE_PROFILE_WEBSITE_BY_KEY:
      if(action.key)
      {
        //get a copy of all of the profiles in state
        let _tmpProfiles = {...state.profiles};
        //update the name field of the event specified by key
        _tmpProfiles[action.key].website = action.payload;
        _tmpProfiles[action.key].hasBeenModifiedLocally = true;
        
        return {
       tmpProfile:{...state.tmpProfile},
         profiles:{..._tmpProfiles}
      };
      }else
      {

        return {
         tmpProfile:{...state.tmpProfile, website:action.payload },
         profiles:{...state.profiles},
         error :"No key specified"
       }
      }
      case UPDATE_PROFILE_PHONE_BY_KEY:
      if(action.key)
      {
        //get a copy of all of the profiles in state
        let _tmpProfiles = {...state.profiles};
        //update the name field of the event specified by key
        _tmpProfiles[action.key].phone = action.payload;
        _tmpProfiles[action.key].hasBeenModifiedLocally = true;
        
        return {
       tmpProfile:{...state.tmpProfile},
         profiles:{..._tmpProfiles}
      };
      }else
      {

        return {
         tmpProfile:{...state.tmpProfile, phone:action.payload },
         profiles:{...state.profiles},
         error :"No key specified"
       }
      } 
       case UPDATE_PROFILE_DESC_BY_KEY:
       
      if(action.key)
      {
        //get a copy of all of the profiles in state
        let _tmpProfiles = {...state.profiles};
        //update the name field of the event specified by key
        _tmpProfiles[action.key].description = action.payload;
        _tmpProfiles[action.key].hasBeenModifiedLocally = true;
        
        return {
       tmpProfile:{...state.tmpProfile},
         profiles:{..._tmpProfiles}
      };
      }else
      {

        return {
         tmpProfile:{...state.tmpProfile, phone:action.payload },
         profiles:{...state.profiles},
         error :"No key specified"
       }
      }
      case UPDATE_PROFILE_EMAIL_BY_KEY:
      if(action.key)
      {
        //get a copy of all of the profiles in state
        let _tmpProfiles = {...state.profiles};
        //update the name field of the event specified by key
        _tmpProfiles[action.key].email = action.payload;
        _tmpProfiles[action.key].hasBeenModifiedLocally = true;
        
        return {
       tmpProfile:{...state.tmpProfile},
         profiles:{..._tmpProfiles}
      };
      }else
      {

        return {
         tmpProfile:{...state.tmpProfile, email:action.payload },
         profiles:{...state.profiles},
         error :"No key specified"
       }
      } 
        
      case ADD_NAME:
      return {
       tmpProfile:{...state.tmpProfile, name:action.payload },
         profiles:{...state.profiles}
      };
     case ADD_EMAIL:
      return {
       tmpProfile:{...state.tmpProfile, email:action.payload },
         profiles:{...state.profiles}
      };
  case ADD_PHONE:
      return {
       tmpProfile:{...state.tmpProfile, phone:action.payload },
         profiles:{...state.profiles}
      };   
    case ADD_WEBSITE:
      return {
       tmpProfile:{...state.tmpProfile, website:action.payload },
         profiles:{...state.profiles}
      };
      case ADD_DESC:
      return {
       tmpProfile:{...state.tmpProfile, description:action.payload },
         profiles:{...state.profiles}
      };
    case ADD_IMAGE:
      return {
       tmpProfile:{...state.tmpProfile, imageURI:action.payload },
         profiles:{...state.profiles}
      };

    default:
      return state;
  }
}

export default profileReducer;