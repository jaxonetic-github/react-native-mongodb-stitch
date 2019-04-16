import { ADD_NAME, ADD_DESC, ADD_EMAIL, ADD_PHONE, ADD_WEBSITE, ADD_IMAGE, ADD_PROFILE} from '../../../../redux/types';
/*
const initialState = {
  name: 'Alonzo',
  website: 'abc@email.com',
  email: 'abc@email.com',
  phone: '5551234567',
  description:'Many positive moves for the Collectives',
  imageURI:'file:///var/mobile/Containers/Data/Application/96EAD515-4EBC-4788-A22C-AAF4C83B5AE6/Library/Caches/ExponentExperienceData/%2540anonymous%252FGathering-43db4615-f691-4f2d-908f-daa4fcf37f38/ImagePicker/3CF05F8C-A9E1-44B0-B482-6C3DF285F45A.jpg',
  profiles: [{key:'1',
  name: 'Maat eL',
  website: 'abc@email.com',
  email: 'abc@email.com',
  phone: '5551234567',
  description:'Many positive moves for the Collectives',
  imageURI:'file:///var/mobile/Containers/Data/Application/96EAD515-4EBC-4788-A22C-AAF4C83B5AE6/Library/Caches/ExponentExperienceData/%2540anonymous%252FGathering-43db4615-f691-4f2d-908f-daa4fcf37f38/ImagePicker/3CF05F8C-A9E1-44B0-B482-6C3DF285F45A.jpg'
},{key:'2',
  name: 'Nami',
  website: 'www.website.com',
  email: 'nami@bar.com',
  phone: '5559876543',
  description:'Faery dust science',
  imageURI:'file:///var/mobile/Containers/Data/Application/96EAD515-4EBC-4788-A22C-AAF4C83B5AE6/Library/Caches/ExponentExperienceData/%2540anonymous%252FGathering-43db4615-f691-4f2d-908f-daa4fcf37f38/ImagePicker/3CF05F8C-A9E1-44B0-B482-6C3DF285F45A.jpg'
}]
};
*/
const initialState = {
  //tmp Profile
  name: 'Alonzo',
  website: 'abc@email.com',
  email: 'abc@email.com',
  phone: '5551234567',
  description:'Many positive moves for the Collectives',
  imageURI:'file:///var/mobile/Containers/Data/Application/96EAD515-4EBC-4788-A22C-AAF4C83B5AE6/Library/Caches/ExponentExperienceData/%2540anonymous%252FGathering-43db4615-f691-4f2d-908f-daa4fcf37f38/ImagePicker/3CF05F8C-A9E1-44B0-B482-6C3DF285F45A.jpg',

  profiles: {
    '1': {id:'1',
          name: 'Maat eL',
          website: 'abc@email.com',
          email: 'abc@email.com',
          phone: '5551234567',
          description:'Many positive moves for the Collectives',
          imageURI:'file:///var/mobile/Containers/Data/Application/96EAD515-4EBC-4788-A22C-AAF4C83B5AE6/Library/Caches/ExponentExperienceData/%2540anonymous%252FGathering-43db4615-f691-4f2d-908f-daa4fcf37f38/ImagePicker/3CF05F8C-A9E1-44B0-B482-6C3DF285F45A.jpg'}

    '2': {id:'2',
          name: 'Nami',
          website: 'www.website.com',
          email: 'nami@bar.com',
          phone: '5559876543',
          description:'Faery dust science',
          imageURI:'file:///var/mobile/Containers/Data/Application/96EAD515-4EBC-4788-A22C-AAF4C83B5AE6/Library/Caches/ExponentExperienceData/%2540anonymous%252FGathering-43db4615-f691-4f2d-908f-daa4fcf37f38/ImagePicker/3CF05F8C-A9E1-44B0-B482-6C3DF285F45A.jpg'
    }
  }
}

const profileReducer = (state = initialState, action) => {
    console.log('profile reducer', action.payload);

  switch(action.type) {
    case ADD_PROFILE:
        return {...state,
         profiles: {
          ...state.profiles,
          [action.id]: action.payload
        }};

      case ADD_NAME:
          console.log( "new name",action.payload);

          state.name = action.payload;

      return {
        ...state,
        profiles :state.profiles
      };
     case ADD_EMAIL:
    state.email = action.payload;
      return {
        ...state,
        profiles : state.profiles.concat({
          key: Math.random(),
          value: action.payload
        })
      };
  case ADD_PHONE:
    state.phone = action.payload;
      return {
        ...state,
        profiles : state.profiles.concat({
          key: Math.random(),
          value: action.payload
        })
      };   
    case ADD_WEBSITE:
    state.website = action.payload;
      return {
        ...state,
        profiles : state.profiles.concat({
          key: Math.random(),
          value: action.payload
        })
      };
      case ADD_DESC:
    state.description = action.payload;
      return {
        ...state,
        profiles : state.profiles.concat({
          key: Math.random(),
          value: action.payload
        })
      };
    case ADD_IMAGE:
    state.imageURI = action.payload;
      return {
        ...state,
        profiles : state.profiles.concat({
          key: Math.random(),
          value: action.payload
        })
      };

    default:
      return state;
  }
}

export default profileReducer;

