//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
//import react in our code. 
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import { Container, Header, Content, ListItem, Thumbnail,Card, CardItem } from 'native-base';
import {commonViewButton, COMMON_DARK_BACKGROUND, NO_PHOTO_AVAILABLE_URI, COMMON_LISTVIEW_ITEM_SEPARATOR,
        ROUTE_SIMPLE_WEB_VIEW} from '../../constants.js'

/**
 * A list of imaged links .
 *  <WebResourcesList/>
 */
 class WebResourcesList extends Component {

/**
 * Filter events based on what the user types in the search field
 * and updates the local state text
 * @Rreturn events with the text parameter in part of it's data fields
 */ 
  SearchFilterAndUpdateStateFunction(text) {
    //passing the inserted text from textinput to filter user's viewable events
    const newData = this.SearchFilterFunction(text)

    //update state and re-render the list accordingly
    this.setState({ text: text });
  }

/**
 * Filter events based on what the user types in the search field
 *
 * @Rreturn events with the text parameter in part of it's data fields
 */
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.props.events.filter(function(item) {
      // ignore undefined rows brought from DB
      if (!item) 
      { 
        return false;
      }
      //applying filter for the inserted text in search bar
      const name = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const description = item.description ? item.description.toUpperCase() : ''.toUpperCase();
      const phone = item.phone ? item.phone.toUpperCase() : ''.toUpperCase();
      const website = item.website ? item.website.toUpperCase() : ''.toUpperCase();
      const email = item.email ? item.email.toUpperCase() : ''.toUpperCase();

      const textData = text.toUpperCase();

      return ((name.indexOf(textData) > -1)||(description.indexOf(textData) > -1) ||
        (phone.indexOf(textData) > -1)||(website.indexOf(textData) > -1)||(email.indexOf(textData) > -1));
    });
//console.log('eventsfilterfunct', newData);
    return newData;
  }

 /** Exract a key from an object for the List */
    _keyExtractor = (item, index) =>{console.log(item); 
      return (item.url ? item.url.toString() : Math.floor(Math.random() * Math.floor(999999)))};

/**
  * A component to display a summary of an individual event from the list of events
  * available to the component
  * @param {object} item - event Data item
  
  */
_renderItem = (item) => 
 {
  const buttonPressAction = () => this.props.history.push(ROUTE_SIMPLE_WEB_VIEW, {record:{url:item.item.url , title:item.item.title}});
 return (<ListItem style={{ flex:1 }}>
          <Card style={{ flex:1 }}>
           <CardItem style={{ flex:1}}> 
            <TouchableOpacity  style={styles.outerOpacity}
                        onPress={buttonPressAction} > 
              
              <Thumbnail square large source={{uri:(item.item.imageURI||NO_PHOTO_AVAILABLE_URI)}} style={styles.thumbnail}/>

{commonViewButton(item.item.title, buttonPressAction)}

            </TouchableOpacity></CardItem></Card>
        </ListItem>
    );
}



  render() {
console.log(this.state,":TRUBRARY:", this.props);
  const buttonPressAction = () => this.props.history.push(ROUTE_SIMPLE_WEB_VIEW, {record:{url:'https://tawy-online.myshopify.com' , title:"Tawy - Shop"}});

    return (
      //ListView to show with textinput used as search bar 
      <Container style={styles.viewStyle}>
      <Header>{commonViewButton("Discounted Products", buttonPressAction)}</Header>
      <Content >
     

        <FlatList style={{backgroundColor:COMMON_DARK_BACKGROUND, margin:0, padding:0}}
                data={this.props.webResources}
                renderItem={this._renderItem}
                
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent = {COMMON_LISTVIEW_ITEM_SEPARATOR}
        />
      </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  outerOpacity:{flex:1, borderRadius:15,  justifyContent:"flex-start", height:120, width:350,backgroundColor:COMMON_DARK_BACKGROUND},
  thumbnail:{height:90, width:"100%"},

  customOuterStyle:{position:"absolute", bottom:0, right:-5},
  buttonText:{color:"gold", paddingLeft:10, paddingRight:10, paddingTop:5, paddingBottom:5},
  buttonOuterShell:{flex:1, borderWidth:2, borderRadius:15, backgroundColor:COMMON_DARK_BACKGROUND},
  buttonTextShell:{ borderWidth:1, borderRadius:10, backgroundColor:"maroon"}
});

const mapStateToProps = state => ({webResources: state.resourcesData.webResources})
export default connect(mapStateToProps,null )(WebResourcesList)





