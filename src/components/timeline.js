import React, { Component } from "react";
import {Picker} from 'react-native'
import { Container,View,Text, Header, Content, Item, Label, Textarea, Form,Tab, Tabs } from "native-base";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {COMMON_DARK_BACKGROUND} from '../constants.js';

class TimelineView extends Component {

   constructor(props) {
    super(props);
    this.state = {century:323};
   }      

  
/** The Search field */
renderTimeline = () =>(
  <View styles={{ flex:1, justifyContent:"right",backgroundColor:"green" }}>
  <Picker 
  selectedValue={this.state.century}
  style={{height: 220, width: 100, backgroundColor:"pink" }}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({century: itemValue})
  }>
  <Picker.Item label="<12 Billion Years" value="java" />
    <Picker.Item label="<12 Billion Years" value="java" />
  <Picker.Item label="12000 BCE" value="The Last Ice Age" />
  <Picker.Item label="10000 BCE" value="Mongaloids migrate to America" />
  <Picker.Item label="1200 BCE" value="Africans  build Greece" />

  <Picker.Item label="800 BCE" value="Africans (Etruscans) build Rome" />
  <Picker.Item label="320 BCE" value="Greece invade Kemet(Egypt)" />
    <Picker.Item label="0"  value="Age of Pisces" />

  <Picker.Item label="32"  value="End of Punic Wars" />
  <Picker.Item label="400" value="Fall of Western Roman Empire" />

  <Picker.Item label="600" value="Muhammedism" />
  <Picker.Item label="711" value="Moors invade Europe" />
  <Picker.Item label="1000" value="Crusades" />
  <Picker.Item label="1302" value="Pope"/>
  <Picker.Item label="1307" value="Destoyed the original Knights Templars"/>
  <Picker.Item label="1450" value="Papal Bulls" />
    <Picker.Item label="1455" value="Conveyed World into Trust" />
    <Picker.Item label="1455" value="Romanus Pontifex" />

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
  <Picker.Item label="2012" value="Age of Aquarius" />

</Picker>

  <Text style={{ flex: 1}}>{this.state.century}</Text>
  </View>)



/** The Bios view */
renderBios = () =>(
  <View>
  <Text>Coming Soon</Text>
  <Text>Bass Reeves</Text>
  <Text>Njinga Mbande</Text>
 <Text>Queen Kalifa</Text>
  </View>)

  render() {
   
   // console.log('rebder.nameedit---',test);
   // console.log(this.props.profileName('vhjvkhjkvhjkvhj'));

    return (
      <Container>
        <Content padder>
           <Tabs>
              <Tab heading="Biographies">{this.renderBios()}</Tab>
          <Tab heading="Timeline">{this.renderTimeline()}</Tab>

  </Tabs>
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    userprofile: state.profiles
  }
}





export default connect(mapStateToProps, null)(TimelineView)

