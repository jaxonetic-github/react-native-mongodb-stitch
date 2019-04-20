import React, { Component } from "react";
import { TouchableHighlight, StyleSheet,Error, View ,Image, TouchableOpacity,TouchableIcon, FlatList,
Picker, Modal} from 'react-native';
import axios from "axios";
import SimpleWebView from './WebResources/simpleWebView.js';
//import { WebGLView } from "react-native-webgl";
import {resourceData, COMMON_DARK_BACKGROUND,TEXT_EVERYWHERE,TEXT_All, LOCATION_LIST,CATEGORY_LIST,
      TEXT_CHOOSE_VIBE, TEXT_WHATS_GOING_ON,COMMON_ICON_STYLE, COMMON_LISTVIEW_ITEM_SEPARATOR } from '../constants.js';
import WebResourcesList from './WebResources/webResourcesList.js';
//import FitImage from 'react-native-fit-image';
import { Container, Header, Content, Card, CardItem,ListItem, Thumbnail,Button, Text, Icon,Right,Subtitle, Title, Left, Body,Form, Picker as AltPicker } from 'native-base';
//import { Provider } from 'react-redux'
//import rootReducer from './reducers'
//import { createStore } from 'redux'

//const store = createStore(rootReducer)
import MapView from 'react-native-maps';
import MapScreen from './mapview.js';

export default class Home extends React.Component {
static navigationOptions = {
    headerTitle: <Button  onPress={()=>{console.log("buttonnnnnninnnnnn!", this); DrawerActions.toggleDrawer();}}><Icon ios='ios-menu' android="md-menu" style={{fontSize: 25, margin:10, color: 'white'}}/></Button>,
    headerRight: (
      <Button 
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#666"
      />
    ),
  };
/*
  onContextCreate = (gl: WebGLRenderingContext) => {
    const rngl = gl.getExtension("RN");
    gl.clearColor(1, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    rngl.endFrame();
  };
*/
  constructor(props) {
    super(props);
    this.state = {
      locations : LOCATION_LIST,categories:CATEGORY_LIST,
      selectedCategory:undefined,
      selectedState: undefined,
      modalVisible: false,
    };
    console.log("-----------------------------------",this.props.navigation);
    //this.props.navigation.navigationOptions();
  }
  async componentDidMount(){
    console.log("-----------------------------------",this.props.navigation);
  }


  showModal = ()=>(
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
          <SimpleWebView style={{width:300, height:300}} url="https://youtu.be/K_nOQ9y4eT8?t=4710" title="Dr Ben quote" />

            <View>

              <TouchableHighlight
                onPress={() => {
                  this.toggleModalVisibility()}
                }>
                <Text>Back</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>)
 
/** toggle the modal view */
 toggleModalVisibility = ()=>{this.setState({modalVisible:!this.state.modalVisible})}

    async componentWillMount() {
       
      this.watchID = navigator.geolocation.watchPosition((position) => {
        console.log( position );
         const lastPosition = JSON.stringify(position);
         this.setState({ lastPosition });
      });
    }
  

  render() {

    return (<Container>
    
        <Content padder>
  <Text>               
       <Icon name="arrow-forward" style={COMMON_ICON_STYLE}/>
       <Icon name="arrow-forward" style={COMMON_ICON_STYLE}/>
   </Text>       
    <Card><CardItem>
<Text>“When I read history, I cannot read it as the conquerer, I must read it as the conquered; therefore, I have to read history as it affects me.  I have to put myself as the centroid figure, and how does that history affect me.Therefore the solution must come up in my perspective not in the conquerers perspective.” </Text>
          </CardItem>
          <CardItem>
<TouchableOpacity style={{position:"absolute", top:5, right:0}}>
 <Icon ios='ios-information-circle' android="md-information-circle" style={COMMON_ICON_STYLE}/>
   </TouchableOpacity>
<TouchableOpacity  style={styles.touchable} onPress= {async ()=>{this.onSeeVideo()}} >
<Thumbnail style={{width:220 , height:220, borderRadius:15}} 
source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Dr_Ben.jpg/220px-Dr_Ben.jpg'}}/>
<Title>Dr Ben</Title>
              </TouchableOpacity>
          </CardItem>
    </Card>

        <Card><CardItem>

<Text>Our Story... Truth</Text>
<Subtitle>These videos are priceless.  Gift them</Subtitle>
          </CardItem>
          <CardItem>
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <FlatList horizontal data={resourceData.digitalResources}
          renderItem={(item)=>{
            return(<ListItem style={{flex:1, borderRadius:15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <View style={{flex:1,padding:5, backgroundColor:COMMON_DARK_BACKGROUND, borderRadius:5}}><TouchableOpacity style={{ borderWidth:1, borderRadius:10, backgroundColor:"maroon"}} >
            <Text style={{color:"gold", paddingLeft:10, paddingRight:10, paddingTop:5, paddingBottom:5}}>{item.item.title}</Text>
            </TouchableOpacity></View></ListItem>)
          }}
           ItemSeparatorComponent = {COMMON_LISTVIEW_ITEM_SEPARATOR}
        />
</View>
          </CardItem>
    </Card>
        <Card><CardItem>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
<View style={{alignItems:"center", margin:5}}>
<Title>Unity</Title>
<TouchableOpacity>
<Thumbnail style={{borderRadius:15}} 
source={{uri:'https://s3.amazonaws.com/classconnection/480/flashcards/2867480/png/screen_shot_2015-10-25_at_82913_pm-150A232408E23829107-thumb400.png'}}/>
</TouchableOpacity><Title>Pschent</Title></View>

<View style={{alignItems:"center", margin:5}}>
<Title>The Civilizers</Title>
<TouchableOpacity>
    <Thumbnail style={{borderRadius:15}}
    source={{uri:"http://msta1913.org/images/050168.png"}}/>
</TouchableOpacity>
    <Text>Moors</Text></View>
<View style={{alignItems:"center", margin:5}}>
<Title>The Cosmos</Title>
    <TouchableOpacity><Thumbnail style={{borderRadius:15}}
    source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbc9-O2_z-FLq7d81nDgX2ajeo5EN294EsaVBe0cW7wleDbgsRbg"}}/>
    </TouchableOpacity>
  <Text>Aquarius</Text></View>
  </View>
 </CardItem>
    </Card>

    <Card><CardItem>
    
    <TouchableOpacity style={{position:"absolute", top:5, right:0}}>
 <Icon ios='ios-information-circle' android="md-information-circle" style={COMMON_ICON_STYLE}/>
   </TouchableOpacity>
    <View style={{alignItems:"center", margin:5}}>
    <Image style={{width:280 ,height:250}} source={{uri:"https://dasg7xwmldix6.cloudfront.net/episodes/521925_fDB81ij7.jpg"}} />
    <Thumbnail style={{borderRadius:15, width:200}}
    source={{uri:"http://www.harvestinstitute.org/publishImages/index~~element138.png"}}/>
    <Title>The Harvest Institute</Title>
    <Text>The Tamhu have 100's of Thinktanks to continue their genocide.  We only have one looking out for us. Learn about Dr Claud Anderson and how to build and keep wealth in the community.</Text>
    </View>
       </CardItem>
    </Card>
        <Card>
           <CardItem>
               <TouchableOpacity style={{position:"absolute", top:5, right:0}}>
 <Icon ios='ios-information-circle' android="md-information-circle" style={COMMON_ICON_STYLE}/>
   </TouchableOpacity>
    <View style={{alignItems:"center", margin:5}}>
    <Thumbnail style={{borderRadius:15, width:200}}
    source={{uri:"https://s3-us-west-1.amazonaws.com/secretenergy-2019/wp-content/uploads/2018/11/secret-energy-banner-8.jpg"}}/>
    <Text>Secret Energy</Text>

    <Text>The Innerstanding movement in Costa Rica</Text>
  <Thumbnail style={{borderRadius:15, width:200}}
    source={{uri:"https://astralquest.com/"}}/>
    </View>
      </CardItem></Card>

{this.showModal()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 22
  },
  touchable: {
     
    alignItems: 'center',
   // justifyContent: 'center'
  },
   view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
    headerImageStyles:{
              height: 120,
              width: 100,
              position: "relative",
              alignSelf: "stretch",
              top: 10
            },
   cardItem:{backgroundColor:"silver"},
   item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

/*<Card>
<CardItem>
<Content>
<Text>{this.state.century}</Text>
 
</Content>
</CardItem>
</Card>*/
