import React from "react";
import { FlatList, Image, StatusBar,StyleSheet } from "react-native";
import { Accordion, Text,View, Container, List, ListItem,  Header, Content, Card, CardItem, Icon,Left, Body, Right} from "native-base";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {COMMON_DARK_BACKGROUND,ACTIVE_TINT_COLOR, INACTIVE_TINT_COLOR} from '../../constants.js'

/** sideBar component manages the drawer sidebar */
class YouTubeList extends React.Component {
    constructor(props) {
    super(props);
    console.log(this.props.location.state.record);
    //setting default state
    //setting default state
    this.state = { dataArray: this.props.location.state.record.payload.items, text: '',name:this.props.location.state.record.title, baseURL:this.props.location.state.record.url};
   
  }

  componentDidMount(){
    console.log(this.props);
  }
/** The separator for the FlatList */
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={styles.listLineSeparator}
      />
    );
  };


/** Only show the rows that the user is entitled  to see.  This will be  moved into Stitch User roles later
*/
_listDataFilter= (data) =>{
  console.log("data in filter =",data);
  const tmpData = data && data.filter((item)=>{

  return true;// ((item.requiresVerification && this.props.isLoggedIn)|| !item.requiresVerification)?true:false;

  })

  return tmpData;
}


/** The Header  section
 *  the header only shows if there is at least one non null record in this.state.dataArray
 */
renderHeader = () =>{
  return this.state.dataArray[0] ?
  ( <Container style={styles.container}>     
    <Image
            style={styles.headerImageStyles}
            source={{
              uri:this.state.dataArray[0].snippet.thumbnails.medium.url
            }}
          />
          <Text>{this.state.dataArray[0].snippet.channelTitle}</Text>
          </Container>
        ) :null};

/** 
  * Render a listitem/row into the list
  */
      _renderRow=(data) => {
        console.log('-----------',data.item.snippet.description);
               return (
                <ListItem style={styles.listItemStyles}>
                 <Card>
                  <CardItem >
                   <Image
            style={styles.headerImageStyles}
            source={{
              uri:data.item.snippet.thumbnails.default.url
            }}/>
</CardItem>
<CardItem>
               <Text>{data.item.snippet.title}</Text>
               <Text style={{backgroundColor:"maroon"}} numberOfLines={2} >{data.item.snippet.description}</Text>
       </CardItem>                  
</Card>
                </ListItem>)
            
             }


 /** Exract a key from an object for the List */
    _keyExtractor = (item, index) =>{  return item.id.videoId};

  render() {
    console.log('dataarray inrender::',this.state.dataArray);
    if (!this.state.dataArray) {return null;}
    else
    return (
      <Container style={styles.container}>
<Content>
<Card>
<CardItem>
 <FlatList 
          //ListHeaderComponent={this.renderHeader}

          data={this._listDataFilter(this.state.dataArray)}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
           ItemSeparatorComponent = {this.ListViewItemSeparator}
        />
 </CardItem>  

</Card>
     </Content>
      </Container>
    );
  }
}



const styles = StyleSheet.create({
  headerImageStyles:{
              height: 120,
              width: 150,
              position: "relative",
              alignSelf: "stretch",
              top: 10
            },
  listItemStyles:{  padding: 0,borderRadius: 15, backgroundColor:COMMON_DARK_BACKGROUND },
 listLineSeparator:{  height: 1, marginTop:3,marginBottom:3,
          backgroundColor: COMMON_DARK_BACKGROUND},
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:COMMON_DARK_BACKGROUND,
        borderRadius: 3,
    padding:0,
    borderColor:'black',
    alignItems: 'center',
    //height:125
  }
})



const mapStateToProps = state => (
    {isLoggedIn: (state.auth!=1) && (state.auth.auth.loggedInProviderName=="oauth2-google")}
)


export default connect(mapStateToProps, null)(YouTubeList)





