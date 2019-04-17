
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

export const initialStoreState = {
  profiles: profileState,
  events: eventState,
  auth: authUsersState,
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
