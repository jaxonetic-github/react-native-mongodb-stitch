import { UPDATE_EVENT_CALENDAR_BY_KEY, UPDATE_EVENT_LOCATION_BY_KEY, UPDATE_EVENT_PHONE_BY_KEY, UPDATE_EVENT_WEBSITE_BY_KEY, UPDATE_EVENT_EMAIL_BY_KEY, UPDATE_EVENT_NAME_BY_KEY, REMOVE_LOCAL_EVENT, ADD_EVENTS_TO_USEREVENTS, ADD_EVENT_NAME, ADD_EVENT_DESC, ADD_EVENT_EMAIL, ADD_EVENT_PHONE, ADD_EVENT_WEBSITE, ADD_EVENT_IMAGE} from '../../../../redux/types';
import moment from 'moment';

/**
 *  Redux Reducer for Event actions
 */
const eventReducer = (state={}, action) => {

  switch(action.type) {
/*    case ADD_EVENT:
    console.log('addnew event',action.payload);
    return {
        tmpEvent:{...state}, 
        events:{...state.events,
          [action.payload.id]:action.payload
        }
      };*/
    case ADD_EVENTS_TO_USEREVENTS:
    let newEvents = {...state.events};
    let events = action.payload.filter(filt=>{
   if(!state.events[filt.id]);
         newEvents = {...newEvents, [filt.id]:filt}
        return !state.events[filt.id];
      })
    //newEvents = {...newEvents, ...events}
    return {
        tmpEvent:{...state.tmpEvent}, 
        events:newEvents
      };
    case REMOVE_LOCAL_EVENT:
   let tmp = {...state.events};
      delete tmp[action.payload.id];
      return {
       tmpEvent:{...state.tmpEvent },
         events:{...tmp}
      };      
    case ADD_EVENT_NAME:
      return {
       tmpEvent:{...state.tmpEvent, name:action.payload },
         events:{...state.events}
      };
    case UPDATE_EVENT_CALENDAR_BY_KEY:
      if(action.key)
      {
        //get a copy of all of the events in state
        let _tmpEvents = {...state.events};
        //update the name field of the event specified by key
        _tmpEvents[action.key].calendar = action.payload;
        _tmpEvents[action.key].hasBeenModifiedLocally = true;

        return {
       tmpEvent:{...state.tmpEvent},
         events:{..._tmpEvents}
      };
      }else
      {

        return {
         tmpEvent:{...state.tmpEvent, email:action.payload },
         events:{...state.events},
         error :"No key specified"
       }
      }
    case UPDATE_EVENT_LOCATION_BY_KEY:
      if(action.key)
      {
        //get a copy of all of the events in state
        let _tmpEvents = {...state.events};
        //update the name field of the event specified by key
        _tmpEvents[action.key].location = action.payload;
        _tmpEvents[action.key].hasBeenModifiedLocally = true;

        return {
       tmpEvent:{...state.tmpEvent},
         events:{..._tmpEvents}
      };
      }else
      {

        return {
         tmpEvent:{...state.tmpEvent, email:action.payload },
         events:{...state.events},
         error :"No key specified"
       }
      }
    case UPDATE_EVENT_NAME_BY_KEY:
      if(action.key)
      {
        //get a copy of all of the events in state
        let _tmpEvents = {...state.events};
        //update the name field of the event specified by key
        _tmpEvents[action.key].name = action.payload;
        _tmpEvents[action.key].hasBeenModifiedLocally = true;

        return {
       tmpEvent:{...state.tmpEvent},
         events:{..._tmpEvents}
      };
      }else
      {

        return {
         tmpEvent:{...state.tmpEvent, email:action.payload },
         events:{...state.events},
         error :"No key specified"
       }
      }
     case UPDATE_EVENT_WEBSITE_BY_KEY:
      if(action.key)
      {
        //get a copy of all of the events in state
        let _tmpEvents = {...state.events};
        //update the name field of the event specified by key
        _tmpEvents[action.key].website = action.payload;
        _tmpEvents[action.key].hasBeenModifiedLocally = true;
        
        return {
       tmpEvent:{...state.tmpEvent},
         events:{..._tmpEvents}
      };
      }else
      {

        return {
         tmpEvent:{...state.tmpEvent, website:action.payload },
         events:{...state.events},
         error :"No key specified"
       }
      }
      case UPDATE_EVENT_PHONE_BY_KEY:
      if(action.key)
      {
        //get a copy of all of the events in state
        let _tmpEvents = {...state.events};
        //update the name field of the event specified by key
        _tmpEvents[action.key].phone = action.payload;
        _tmpEvents[action.key].hasBeenModifiedLocally = true;
        
        return {
       tmpEvent:{...state.tmpEvent},
         events:{..._tmpEvents}
      };
      }else
      {

        return {
         tmpEvent:{...state.tmpEvent, phone:action.payload },
         events:{...state.events},
         error :"No key specified"
       }
      } 
      case UPDATE_EVENT_EMAIL_BY_KEY:
      if(action.key)
      {
        //get a copy of all of the events in state
        let _tmpEvents = {...state.events};
        //update the name field of the event specified by key
        _tmpEvents[action.key].email = action.payload;
        _tmpEvents[action.key].hasBeenModifiedLocally = true;
        
        return {
       tmpEvent:{...state.tmpEvent},
         events:{..._tmpEvents}
      };
      }else
      {

        return {
         tmpEvent:{...state.tmpEvent, email:action.payload },
         events:{...state.events},
         error :"No key specified"
       }
      }        

     case ADD_EVENT_EMAIL:
      return {
       tmpEvent:{...state.tmpEvent, email:action.payload },
         events:{...state.events}
      };
  case ADD_EVENT_PHONE:
      return {
       tmpEvent:{...state.tmpEvent, phone:action.payload },
         events:{...state.events}
      };  
    case ADD_EVENT_WEBSITE:
      return {
       tmpEvent:{...state.tmpEvent, website:action.payload },
         events:{...state.events}
      };
    case ADD_EVENT_DESC:
      return {
       tmpEvent:{...state.tmpEvent, description:action.payload },
         events:{...state.events}
      };
    case ADD_EVENT_IMAGE:
      return {
       tmpEvent:{...state.tmpEvent, imageURI:action.payload },
         events:{...state.events}
      };
    default:
      return state;
  }
}

export default eventReducer;
