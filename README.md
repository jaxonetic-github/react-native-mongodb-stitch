

### Architecture
Mongo Stitch Cloud for the backend.
React Native for the front end 
   --redux saga, Native Module, Google Signin, Apple Maps, MongdDB Stitch integration


### Project Structure

<img src="https://github.com/jaxonetic-github/react-native-mongodb-stitch/blob/master/images/profileDemoUpdate.gif" align="left" height="300" width="170" > 
* `services/dbServices.js` - essentially a dbo for the MongoStitchbackend
* `redux` - Redux specific files for state, and sagas
* `redux/saga` - Redux Sagas
* `ios` - IOS specific modifications
* `android` - Android specific modifications
* `components` - The applications react components
* `components/Authentication` - The applications react components and redux files that handle authentication and connectivity changes
* `docs` - Documentation coming ...
* `__tests__/DBServicesSpec.js` - Unit Tests for the dbServices.js file
* `__tests__/sagaSpec.js` - Integration Test for Redux Saga flows
* `build/` - build scripts
* `config/` - configurations
* `index.html` - Need to add google api key.  I may not always provide it.  That is why I made the screenshot.


** This app uses KEYS and ID's from Google and StreetySmarts.  They are stored securely (I hope) as Secrets and accessed via Stitch Functions which are similar to AWS Lambdas.  @See services/dbService.

## Screenshots

```
react-native run-ios   Or   react-native run-android
```

Produces

<img src="https://github.com/jaxonetic-github/react-native-mongodb-stitch/blob/master/images/profileDemoUpdate.gif" align="left" height="300" width="170" >


