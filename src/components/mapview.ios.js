import React from 'react'
import { ActivityIndicator, StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native'
import Input from './textinput'
import MapView from 'react-native-maps';
import { Picker,Container, Header, Content, Item, Label,Icon, Textarea, Form, Button, Left } from "native-base";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {updateEventLocationByKey} from './Event/Redux/Actions/eventActions.js';
import {COMMON_ACTIVITY_INDICATOR, COMMON_DARK_BACKGROUND, LOCATION_LIST, STATES} from '../constants.js'

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
  constructor(props) {
    super(props);
    console.log(this.props.location.state.initialLocation);
    this.state = {inputType:'Address', key:this.props.location.state.key, location:this.props.location.state.initialLocation}
    console.log(this.props.location.state.key);

  }

  /** Loads profiles into the component */
  async componentDidMount() {

     const tmp = await  navigator.geolocation.getCurrentPosition(
  position => {//{"coords":{"speed":-1,"longitude":-122.406417,"latitude":37.785834,"accuracy":5,"heading":-1,"altitude":0,"altitudeAccuracy":-1},"timestamp":1551589085878.46}
    const location = position.coords;
console.log(position,'the location==>', location);
    console.log(this.state);
    this.setState({inputType:'Address', position:{"longitude":location.longitude, "latitude":location.latitude} });
  },
  error => Alert.alert(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
);

  }


/*  
  position= (arg) => {//{"coords":{"speed":-1,"longitude":-122.406417,"latitude":37.785834,"accuracy":5,"heading":-1,"altitude":0,"altitudeAccuracy":-1},"timestamp":1551589085878.46}
    const location = JSON.stringify(position.coords);
    this.setState({inputType:'Address', position:{longitude:location.longitude, latitude:location.latitude} });
  }*/


onAddressChange = async (region) =>{
  try{
console.log(region,"----", this.state);
this.props.updateEventLocationByKey({key:this.state.key, location:region});
this.setState({location:region})
    /*const geo = await Geocoder.from(region);
   
    // res is an Array of geocoding object (see below)
    console.log(region,'>>>>>>>>>>>>>>>>>>>>>.',geo);
    this.setState({position:{"longitude":geo.results[0].geometry.location.lng, "latitude":geo.results[0].geometry.location.lat, "formattedAddress":geo.results[0].formattedAddress} })
    this.props.updateEventLocationByKey(geo.results[0].formattedAddress, this.props.navigation.state.params.id);
*/}catch(error){
  console.log(error)
}
}

render() {
console.log(this.state);
  const locations = LOCATION_LIST.map((event)=>(<Picker.Item key={event.label} label={event.label} value={event.value} />));
  const states = STATES.states.map((event)=>(<Picker.Item key={event} label={event} value={event} />));
if(!this.state)  return (COMMON_ACTIVITY_INDICATOR)
const longitude = this.state.position?this.state.position.longitude:null;
const latitude  = this.state.position?this.state.position.latitude:null;
const formattedAddress = this.state.position?this.state.position.formattedAddress:null;
console.log(this.state);
  return (
     <Container>
      <Header  style={{backgroundColor: COMMON_DARK_BACKGROUND, height:55, color:"white"}}>
<Left><Button transparent onPress={()=>{this.props.history.push("/Activities/EventView/"+this.state.key )}}>
<Text>Back></Text></Button></Left>
</Header>
        <Content padder>
        <MapView
        style={styles.map}
        showsUserLocation={true}>

   
         </MapView>
          <Item stackedLabel>
            <Label>Address</Label>
<Text>{longitude}</Text>
<Text>{latitude}</Text>
<Text>{formattedAddress}</Text>
<Text>{this.state.location}</Text>
            <Input  inputInitialValue={this.state.location} inputType={this.state.inputType} updateChange={this.onAddressChange} />
          </Item>
            <Picker
              mode="dropdown"
              iosHeader="Locations"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
              style={{ width: undefined }}
              selectedValue={this.state.location}
              //onValueChange={this.onLocationChange.bind(this)}
            >
            <Picker.Item key={"All"} label={"All Locations"} value={"All"} />
             {locations}
            </Picker>
            <Picker
              mode="dropdown"
              iosHeader="Locations"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
              style={{ width: undefined }}
              selectedValue={this.state.location}
              //onValueChange={this.onLocationChange.bind(this)}
            >
            <Picker.Item key={"All-States"} label={"All States"} value={"All"} />
             {states}
            </Picker>
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

