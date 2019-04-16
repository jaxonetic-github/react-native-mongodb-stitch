import React from 'react'
import { ActivityIndicator, StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native'
import Input from './textinput'
import InputForm from './inputform'
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { Container, Header, Content, Item, Label, Textarea, Form } from "native-base";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {updateEventLocationByKey} from './Event/Redux/Actions/eventActions.js';
import {COMMON_ACTIVITY_INDICATOR} from '../constants.js'
import {googlekey as GOOGLE_KEY} from '../app.json';

 const STORAGE_KEY = 'ASYNC_STORAGE_NAME_EXAMPLE'

class MapScreen extends React.Component {
 /*
let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;

let clientBuilder = new SmartyStreetsCore.ClientBuilder(new SmartyStreetsCore.StaticCredentials(authId, authToken));
let client = clientBuilder.buildUsStreetApiClient();

// Documentation for input fields can be found at:
// https://smartystreets.com/docs/us-street-api#input-fields



let lookup3 = new Lookup();
lookup3.inputId = "8675309";
lookup3.street = "1600 Amphitheatre Parkway Mountain View, CA 94043";
lookup3.maxCandidates = 1;

client.send(lookup1)
  .then(displayResult)
  .catch(handleError);


function displayResult(result) {
  console.log(result.result[0].components);
}

function handleError(error) {
  console.log("ERROR:", error);
}
*/
  /** Loads profiles into the component */
  async componentDidMount() {

     const tmp = await  navigator.geolocation.getCurrentPosition(
  position => {//{"coords":{"speed":-1,"longitude":-122.406417,"latitude":37.785834,"accuracy":5,"heading":-1,"altitude":0,"altitudeAccuracy":-1},"timestamp":1551589085878.46}
    const location = position.coords;
console.log(position,'the location==>', location)
    this.setState({inputType:'Address', position:{"longitude":location.longitude, "latitude":location.latitude} });
  },
  error => Alert.alert(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
);

console.log(tmp);
  }

  constructor(props) {
    super(props);
  }
  
  position= (arg) => {//{"coords":{"speed":-1,"longitude":-122.406417,"latitude":37.785834,"accuracy":5,"heading":-1,"altitude":0,"altitudeAccuracy":-1},"timestamp":1551589085878.46}
    const location = JSON.stringify(position.coords);
    this.setState({inputType:'Address', position:{longitude:location.longitude, latitude:location.latitude} });
  }
/*
  load = async () => {
    try {
      const name = await AsyncStorage.getItem(STORAGE_KEY)

      if (name !== null) {
        this.setState({name})
      }
    } catch (e) {
      console.error('Failed to load name.')
    }
  }

  save = async (name) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, name)

      this.setState({name})
    } catch (e) {
      console.error('Failed to save name.')
    }
  }
*/



onAddressChange = async (region) =>{
  try{
console.log(region);
    const geo = await Geocoder.from(region);
   
    // res is an Array of geocoding object (see below)
    console.log(region,'>>>>>>>>>>>>>>>>>>>>>.',geo);
    this.setState({position:{"longitude":geo[0].geometry.location.lng, "latitude":geo[0].geometry.location.lat, "formattedAddress":geo[0].formattedAddress} })
    this.props.updateEventLocationByKey(geo[0].formattedAddress, this.props.navigation.state.params.id);
}catch(error){
  console.log(error)
}
}

render() {
console.log(this.state);

if(!this.state)  return (COMMON_ACTIVITY_INDICATOR)


  return (
     <Container>
        <Content padder>
        <MapView
        style={styles.map}
        showsUserLocation={true}>

   
         </MapView>
          <Item stackedLabel>
            <Label>Address</Label>
<Text>{this.state.position.formattedAddress}</Text>
            <Input  inputInitialValue='' inputType={this.state.inputType} onInputBlur={this.onAddressChange} />
          </Item>
        </Content>
      </Container>

  );

}

}



const styles = StyleSheet.create({
 
  //mapstyle: { flex: .3 },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  map: {
    width: 300,
    height: 350,
    borderWidth: 1,
    borderColor: '#000000',
   // ...StyleSheet.absoluteFillObject,
  },
  
});





function matchDispatchToProps(dispatch){
  return bindActionCreators({updateEventLocationByKey: updateEventLocationByKey}, dispatch)
}

export default connect(null,matchDispatchToProps )(MapScreen)

