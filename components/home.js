import React, { Component } from "react";
import { TouchableHighlight, StyleSheet,Error, View ,Image, TouchableOpacity,TouchableIcon, FlatList,
Picker, Modal} from 'react-native';
import axios from "axios";
import SimpleWebView from './WebResources/simpleWebView.js';

import {resourceData, COMMON_DARK_BACKGROUND,TEXT_EVERYWHERE,TEXT_All, LOCATION_LIST,CATEGORY_LIST,
      TEXT_CHOOSE_VIBE, TEXT_WHATS_GOING_ON,COMMON_ICON_STYLE, COMMON_LISTVIEW_ITEM_SEPARATOR } from '../constants.js';
import WebResourcesList from './WebResources/webResourcesList.js';
//import FitImage from 'react-native-fit-image';
import { Container, Header, Content, Card, CardItem,ListItem, Thumbnail,Button, Text, Icon,Right, Title, Left, Body,Form, Picker as AltPicker } from 'native-base';
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

    return (
         <Container>
    
        <Content padder>
                 <Text>
       <Icon name="arrow-forward" style={COMMON_ICON_STYLE}/>
       <Icon name="arrow-forward" style={COMMON_ICON_STYLE}/>
          </Text>
    <Card><CardItem>
<Text>“When I read history, I cannot read it as the conquerer, I must read it as the conquered; therefore, I have to read history as it affects me.  I have to put myself as the centroid figure, and how does that history affect me.Therefore the solution must come up in my perspective not in the conquerers perspective.” </Text>
          </CardItem>
          <CardItem>
<TouchableOpacity  style={styles.touchable} onPress= {async ()=>{this.onSeeVideo()}} >
<Thumbnail style={{width:220 , height:220, borderRadius:15}} 
source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Dr_Ben.jpg/220px-Dr_Ben.jpg'}}/>
<Title>Dr Ben</Title>
              </TouchableOpacity>

          </CardItem>
    </Card>
        <Card><CardItem>
<Text>Why are "white" people, white?</Text>
          </CardItem>
          <CardItem>
                  <FlatList horizontal

          data={resourceData.digitalResources}
          renderItem={(item)=>{

            return(<View style={{padding:5, marginLeft:5, marginRight:5, borderWidth:1, borderRadius:10}}><Text>{item.item.title}</Text></View>)
          }}
           ItemSeparatorComponent = {COMMON_LISTVIEW_ITEM_SEPARATOR}
        />

          </CardItem>
    </Card>
        <Card><CardItem>
<Thumbnail style={{borderRadius:15}} 
source={{uri:'https://s3.amazonaws.com/classconnection/480/flashcards/2867480/png/screen_shot_2015-10-25_at_82913_pm-150A232408E23829107-thumb400.png'}}/>
<Title>Pschent</Title>
 </CardItem>
    </Card>
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
