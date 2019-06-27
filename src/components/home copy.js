import React, { Component } from "react";
import { TouchableHighlight, StyleSheet,Error, View ,Image, TouchableOpacity,TouchableIcon, FlatList,
Picker, Modal} from 'react-native';
import axios from "axios";
import SimpleWebView from './WebResources/simpleWebView.js';

import {resourceData, COMMON_DARK_BACKGROUND,TEXT_EVERYWHERE,TEXT_All, LOCATION_LIST,CATEGORY_LIST,
      TEXT_CHOOSE_VIBE, TEXT_WHATS_GOING_ON,COMMON_ICON_STYLE } from '../constants.js';
import WebResourcesList from './WebResources/webResourcesList.js';
//import FitImage from 'react-native-fit-image';
import { Container, Header, Content, Card, CardItem,ListItem, Thumbnail,Button, Text, Icon,Right, Title, Left, Body,Form, Picker as AltPicker } from 'native-base';
//import { Provider } from 'react-redux'
//import rootReducer from './reducers'
//import { createStore } from 'redux'

//const store = createStore(rootReducer)
import MapView from 'react-native-maps';
import MapScreen from './mapview.js';

export default class QuickSearch extends React.Component {

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
         renderPicker = (list, placeholder) => {
    const widget =   <Form>
            <AltPicker
              mode="dropdown"
              placeholder={placeholder}
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: 200 }}
              selectedValue={this.state.selectedCategory}
              onValueChange={this.onCategoryValueChange.bind(this)}
            >
 {list.map((value, index) => {
        return <Picker.Item label={value.label} value={value.value} key={value.value} />
      })}  
            </AltPicker>
          </Form>

        return widget;
    };

  onValueChange(value: string) {
    this.setState({
      locations        : LOCATION_LIST,
      categories       :CATEGORY_LIST,
      selectedCategory : this.state.selectedCategory,
      selectedState   : value
    });
  }

  onCategoryValueChange(value: string) {
    this.setState({
locations : LOCATION_LIST,categories:CATEGORY_LIST,
      selectedCategory: value,
      selectedState: this.state.selectedState,
    });
  }
  async onSeeVideo() {
   this.setState({modalVisible:true});
  }

   renderHeader = () => {
        return(
          <Text style={{position:"absolute"}}>Featured Lectures and Debates</Text>
        );
    };
 /** Exract a key from an object for the List */
    _keyExtractor = (item, index) =>{  return item.url};

   _renderContent = () => {
        return(
          <Text style={{position:"absolute"}}>Featured Lectures and Debates</Text>
        );
    };

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
<Image style={{width:220 , height:220, borderRadius:15}} 
source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Dr_Ben.jpg/220px-Dr_Ben.jpg'}}/>
<Title>Dr Ben</Title>
              </TouchableOpacity>

          </CardItem>
    </Card>

          <Card>
            <CardItem>
              <Body>
              <Text>{TEXT_WHATS_GOING_ON}</Text>

              {this.renderPicker(this.state.locations, TEXT_EVERYWHERE)}
              <Text>With a ...?</Text>
              {this.renderPicker(this.state.categories,TEXT_CHOOSE_VIBE)}
             
              </Body>
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
 <Picker
  selectedValue={this.state.century}
  style={{height: 200, width: 100,  backgroundColor:COMMON_DARK_BACKGROUND}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({century: itemValue})
  }>
  <Picker.Item label="<3200 BCE" value="java" />
  <Picker.Item label="12000 BCE" value="The Last Ice Age" />
  <Picker.Item label="10000 BCE" value="Mongaloids migrate to America" />
  <Picker.Item label="1200 BCE" value="Africans  build Greece" />

  <Picker.Item label="800 BCE" value="Africans (Etruscans) build Rome" />
  <Picker.Item label="320 BCE" value="Greece invade Kemet(Egypt)" />
  <Picker.Item label="32"  value="End of Punic Wars" />
  <Picker.Item label="400" value="Fall of Western Roman Empire" />

  <Picker.Item label="600" value="Muhammedism" />
  <Picker.Item label="711" value="Moors invade Europe" />
  <Picker.Item label="1000" value="Crusades" />
  <Picker.Item label="1450" value="Papal Bulls" />
  <Picker.Item label="1492" value="The Fall of Al Andalusia" />
  <Picker.Item label="1500" value="Muhammedism" />
  <Picker.Item label="1520" value="Cortez" />
  <Picker.Item label="1622" value="Queen Nginga" />
  <Picker.Item label="1788" value="British Fleet invade Australia" />
  <Picker.Item label="1788" value="Barbery Wars" />
  <Picker.Item label="1788" value="Treaty of Peace & Friendship" />

  <Picker.Item label="1804" value="Haitian Revolution" />
  <Picker.Item label="1881" value="Berlin Conference" />
  <Picker.Item label="1900" value="Hawaii" />
  <Picker.Item label="1913" value="Fed" />
  <Picker.Item label="1928" value="Gold Clause" />
  <Picker.Item label="1967" value="El Malik El Shabazz" />
</Picker>
</Content>
</CardItem>
</Card>*/
