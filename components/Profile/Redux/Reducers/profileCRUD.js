import { FETCH_PROFILE_REQUEST, FETCH_PROFILE_FAILURE, FETCH_PROFILE_SUCCESS,
ADD_PROFILE_REQUEST, ADD_PROFILE_SUCCESS, ADD_PROFILE_FAILURE,
DELETE_PROFILE_FAILURE, DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS } from '../../../../redux/types';


const dbProfileReducer = (state={}, action) => {

  switch(action.type) {
    case FETCH_PROFILE_REQUEST:
    return Object.assign({}, state, {
         isFetching: true, error: false, errorMsg:null
      });
    case FETCH_PROFILE_FAILURE:
      return {
       isFetching: false, error: true, errorMsg:action.error
      };

      case ADD_PROFILE_REQUEST:
       return { isAddingProfile: true, error: false};
     case ADD_PROFILE_SUCCESS:

      return {
          isAddingProfile: false, error: false
//         profiles:{...state.profiles, [action.payload.id]:action.payload}
      };
  case DELETE_PROFILE_FAILURE:
     return { isDeletingProfile: false, error: true, errorMsg:action.error};
  case DELETE_PROFILE_REQUEST:
       return { isDeletingProfile: true, error: false};
     case DELETE_PROFILE_SUCCESS:

      return {
          isDeletingProfile: false, error: false
//         profiles:{...state.profiles, [action.payload.id]:action.payload}
      };
  case ADD_PROFILE_FAILURE:
     return { isAddingProfile: false, error: true, errorMsg:action.error};

   
    default:
      return state;
  }
}


export default dbProfileReducer;