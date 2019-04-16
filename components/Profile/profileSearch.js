//This is an example code to Add Search Bar Filter on Listview// 
import React, { Component } from 'react';
//import react in our code. 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, RefreshControl, StyleSheet, View, TextInput, ActivityIndicator, FlatList, Alert} from 'react-native';
import { SwipeRow, Container, Subtitle, Header, Content, List, ListItem,Title, Thumbnail,Icon, Text, Left, Body, Right, Button } from 'native-base';
import { NavigationEvents } from 'react-navigation';
 import {deleteProfileRequest,fetchProfileRequest} from './Redux/Actions/profile.js'
import {COMMON_DARK_BACKGROUND,ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR} from '../../constants.js'

/**
 * A List component with search abilities
 */ 
 class SearchAndResultsScreen extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: '',   refreshing: false};
     }

 _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.fetchProfileRequest();
   // fetchData().then(() => {this.setState({refreshing: false});});
  }

  /** Loads profiles into the component */
  componentDidMount() {
          this.setState({ isLoading: false,  text: ''})
  }

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
    const newData = this.props.profiles.filter(function(item) {
console.log("------------", item);
     if (!item) 
      { 
        console.log('Todo: Log this (Undefined Profiles from DB)');
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

    return newData;
  }


  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View style={styles.listItemSeparatorStyle} />
    );
  };

 /** Exract a key from an object for the List */
    _keyExtractor = (item, index) =>(item.id ? item.id.toString() : Math.floor(Math.random() * Math.floor(999999)));


/** Navigate to artist-creation screen on [add] buttonpress  */
  _onPress = (itemId) => (this.props.navigation.push('ProfileView',{id:itemId}))

/** Navigate to artist-creation screen on [add] buttonpress  */
  _onPressNew = () => (this.props.navigation.push('ProfileView' ))


/** Navigate to event-creation screen  */
   _onPressDelete = (itemId) => {
  this.props.deleteProfileRequest({id:itemId})
  };

/** The Search field */
renderSearchField = () =>(
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterAndUpdateStateFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />)


/**
  * A component to display a summary of an individual event from the list of events
  * available to the component
  * @param {object} item - event Data item
  */
  _renderItem = (profile) => (

     <SwipeRow
            leftOpenValue={100}
            rightOpenValue={-75}
            left={
              <Button iconLeft danger transparent onPress={()=>this._onPressDelete(profile.item.id)}>
                 <Icon name='trash' />
                  <Text>Delete</Text>
                </Button>
            }
            body={
              <View style={styles.bodyViewStyle}>
                <Text style={styles.textStyle}>{profile.item.name}</Text>
                <Text note numberOfLines={2}>{profile.item.description}</Text>
              </View>
            }
            right={
                <Button transparent onPress={() => this._onPress(profile.item.id)}>
                  <Text>View</Text>
                </Button>

            }
          />
  );


/*
* duplicate code also found in eventsearch
*/
  addButton = ()=>{
   console.log("this.props.canAddProfile ", this.props.canAddProfile );
    const _addButton = this.props.canAddProfile 
      ?  (<Button transparent  onPress={()=>this._onPressNew()} >
             <Icon ios='ios-add-circle' android="md-add-circle" style={{fontSize: 20, color: INACTIVE_TINT_COLOR}}/>
               <Text style={styles.textStyle}>Add Artist</Text>
            </Button>)
      : null;
      return _addButton; }

  render() {
    console.log("canaddprofile::",this.props.canAddProfile);
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Container style={styles.viewStyle}>
        <Header  style={styles.innerHeaderStyle}>
            <Body>
              <Title style={styles.textStyle}>{this.props.profileCount} Artists</Title>
<Subtitle>Subtitle</Subtitle>
            </Body>
            <Right>  
                   
{this.addButton()}
            </Right>

        </Header>
<Content>

        <FlatList
         refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
          data={this.SearchFilterFunction(this.state.text)}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this.renderSearchField}

           ItemSeparatorComponent = {this.ListViewItemSeparator}
        />
              </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
  },
innerHeaderStyle:{backgroundColor: COMMON_DARK_BACKGROUND},
listItemSeparatorStyle:{
          height: 1,
          backgroundColor: '#080808',
        },
  textStyle: {
    padding: 10, color:ACTIVE_TINT_COLOR
  },
bodyViewStyle:{flex:1},
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});



const mapStateToProps = state => {
  const profileKeys = Object.keys(state.profiles.profiles);

  return {
    canAddProfile : (state.auth!=1) && (state.auth.auth.loggedInProviderName=="oauth2-google"),
    profileIndex : (state.auth!=1) && (state.auth.auth.loggedInProviderName=="oauth2-google") ? state.auth.auth.userProfile.identities[0].id: null,
    profileCount: profileKeys.length, 
    profiles: profileKeys.map(pkey => state.profiles.profiles[pkey])
  }

}


function matchDispatchToProps(dispatch){
  return bindActionCreators({fetchProfileRequest:fetchProfileRequest, deleteProfileRequest: deleteProfileRequest}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchAndResultsScreen)


