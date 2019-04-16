import { UPDATE_EVENT_SUCCESS, UPDATE_EVENT_REQUEST,UPDATE_EVENT_FAILURE, FETCH_EVENT_REQUEST, FETCH_EVENT_FAILURE, FETCH_EVENT_SUCCESS,DELETE_EVENT_REQUEST,DELETE_EVENT_SUCCESS,DELETE_EVENT_FAILURE,
ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE} from '../../../../redux/types';



const dbEventsReducer = (state={}, action) => {

  switch(action.type) {
    case DELETE_EVENT_REQUEST:
    return {
           isDeleting: true, error: false, errorMsg:null
    };
    case DELETE_EVENT_SUCCESS:
    return {
           isDeleting: false, error: false, errorMsg:null
    };
       case DELETE_EVENT_FAILURE:
    return {
           isDeleting: false, error: false, errorMsg:null
    };
    case UPDATE_EVENT_REQUEST:
        return { isUpdating: true, key:action.payload};
    case UPDATE_EVENT_FAILURE:
        return { isUpdating: false, error:action.payload};
    case UPDATE_EVENT_SUCCESS:
        return { isUpdating: false};
    case FETCH_EVENT_REQUEST:
    return {
           isFetching: true, error: false, errorMsg:null,
      };
    case FETCH_EVENT_FAILURE:
      return {
        isFetching: false, error: true, errorMsg:action.errorMsg
      };
    case FETCH_EVENT_SUCCESS:
     
      return {
        isFetching: false, error:false
      };

      case ADD_EVENT_REQUEST:
        return Object.assign({}, state,  {eventsCRUD:{ isFetching: true, newEvent:action.payload}});
     case ADD_EVENT_SUCCESS://event has been added to backend
           return {
          eventsCRUD:{ isFetching: false, error: false},
      };
  case ADD_EVENT_FAILURE:
 return Object.assign({}, state, {
        eventsCRUD:{ isFetching: false, error: true, errorMsg:action.errorMsg}
      });
   
    default:
      return state;
  }
}


export default dbEventsReducer;