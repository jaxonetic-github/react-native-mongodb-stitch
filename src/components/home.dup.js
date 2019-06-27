import React, { Component } from "react";

import { TouchableHighlight, StyleSheet,Error, View ,Image, TouchableOpacity,TouchableIcon, FlatList,
Picker, Modal} from 'react-native';
import SimpleWebView from './WebResources/simpleWebView.js';
//import { WebGLView } from "react-native-webgl";
import { ROUTE_SIMPLE_WEB_VIEW, COMMON_DARK_BACKGROUND,TEXT_EVERYWHERE,TEXT_All, LOCATION_LIST,CATEGORY_LIST,
      TEXT_CHOOSE_VIBE, TEXT_WHATS_GOING_ON,COMMON_ICON_STYLE,COMMON_ICON_STYLE_MAROON,COMMON_ICON_STYLE_GOLD, COMMON_LISTVIEW_ITEM_SEPARATOR ,
       ICON_IOS_INFORMATION, ICON_ANDROID_INFORMATION ,
       iconManager, header,commonViewButton} from '../constants.js';
import WebResourcesList from './WebResources/webResourcesList.js';
//import FitImage from 'react-native-fit-image';
import { DeckSwiper,Container, Header, Content, Card, CardItem,ListItem,Item, Thumbnail,Button, Text, Icon,Right,Subtitle, Title, Toast,Left, Body,Form, Picker as AltPicker } from 'native-base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FaHome,  FaSearchengin, FaUser,FaRegBuilding,FaEdit,FaThList } from "react-icons/fa";
import { GiHamburgerMenu } from 'react-icons/gi';
import {PermissionsAndroid} from 'react-native';
import Client from 'shopify-buy';
import { Link } from 'react-router-dom';
/**
 * This is the home screen of the app. 
 * The content will be changing 
 //navigation.getParam('title', 'A Nested Details Screen')||"BAR",
 */
class Home extends React.Component {
/*static navigationOptions = ({ navigation, navigationOptions }) => {
  console.log(navigation,"_--------------HOME---------------------------*********************");
    return {
      headerRight:<Button  onPress={() => navigation.toggleDrawer()}><Icon ios='ios-menu' android="md-menu" style={{fontSize: 25, color: 'white'}}/></Button>,
      title: "jkhk",
            headerStyle: {backgroundColor:COMMON_DARK_BACKGROUND },
      headerTintColor: 'gold',
      headerTitleStyle: {fontWeight: 'bold'} 

    };
  };*/
  constructor(props) {
    super(props);
    this.state = {
      locations : LOCATION_LIST,categories:CATEGORY_LIST,
      selectedCategory:undefined,
      selectedState: undefined,
      menuVisible: false,
    };
   
  }

async componentDidMount() {
   const client = Client.buildClient({
  domain: 'tawy-online.myshopify.com',
  storefrontAccessToken: '4988830c31c5c9a2156e172b8e012d52'
});
  // Fetch all collections, including their products
client.collection.fetchAllWithProducts().then((collections) => {
  // Do something with the collections
  console.log(collections);
  console.log(collections[0].products);
});
 /*          
const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

if (granted) {
  console.log( "You can use the ACCESS_FINE_LOCATION" )
} 
else {
  console.log( "ACCESS_FINE_LOCATION permission denied" )
}


 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
        this.watchID = navigator.geolocation.watchPosition((position) => {
        console.log( position );
         const lastPosition = JSON.stringify(position);
         this.setState({ lastPosition });
      });
      
    } else {
      console.log('Location permission denied');
  }*/
  }
    
moundBuilders=()=>(<View><Card><CardItem>

    <View style={{alignItems:"center", margin:5}}>
    <Image style={{width:280 ,height:250}} source={{uri:"https://dasg7xwmldix6.cloudfront.net/episodes/521925_fDB81ij7.jpg"}} />
    <Thumbnail style={{borderRadius:15, width:200}}
    source={{uri:"http://www.harvestinstitute.org/publishImages/index~~element138.png"}}/>
    <Title>The Harvest Institute</Title>
    <Text>The  Thinktanks to looking out for us. Learn about Dr Claud Anderson and how to build and keep wealth in the community.</Text>
    </View>
       </CardItem>
    </Card>
       </View>)


showcaseView=()=>(<View><Card>
           <CardItem>
               <TouchableOpacity  style={{position:"absolute", top:5, right:0}}>
 <Icon ios={ICON_IOS_INFORMATION} android={ICON_ANDROID_INFORMATION} style={COMMON_ICON_STYLE}/>
   </TouchableOpacity>
    <View style={{alignItems:"center", margin:5}}>
    <Thumbnail style={{borderRadius:15, width:200}}
    source={{uri:"https://s3-us-west-1.amazonaws.com/secretenergy-2019/wp-content/uploads/2018/11/secret-energy-banner-8.jpg"}}/>
    <Text>Secret Energy</Text>

    <Text>The Innerstanding movement in Costa Rica</Text>
  <Thumbnail style={{borderRadius:15, width:200}}
    source={{uri:"https://astralquest.com/"}}/>
    </View>
      </CardItem></Card></View>)

 



quoteCard = ()=>(<Card>
<CardItem>
  <Text>“When I read history, I cannot read it as the conquerer, I must read it as the conquered; therefore, I have to read history as it affects me.  I have to put myself as the centroid figure, and how does that history affect me.Therefore the solution must come up in my perspective not in the conquerers perspective.” </Text>
</CardItem>
<CardItem>
  <TouchableOpacity style={{ top:5, right:0}}>
   </TouchableOpacity>
<TouchableOpacity  style={styles.touchable}  >
<Thumbnail style={{width:220 , height:220, borderRadius:15}} 
source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Dr_Ben.jpg/220px-Dr_Ben.jpg'}}/>
<Title>Dr Ben</Title>
              </TouchableOpacity>
          </CardItem>
    </Card>)


/**
 * Component to show list of videos users can buy
 * @param promotion:  
 */
videoReferences = (promotions)=>{
  const innerViews = promotions.map((promotion,i)=>(
          <View  key={i} style={styles.videoRefsInnerView}>
            <Text>{promotion.title}</Text>
            <TouchableOpacity>
              <Thumbnail style={styles.videoRefsThumbnail} source={{uri:promotion.imageURI}}/>
              {commonViewButton(promotion.title)}
           </TouchableOpacity><Text>{promotion.subTitle}</Text></View>));

          return (<Card style={{flex:1}}><CardItem><View style={styles.videoRefsOuterStyle} >{innerViews}</View></CardItem></Card>)
    }


/**
* @param : digitalResources ex. this.props.digitalResources
*/
pastPresentFutureComponent = (digitalResources)=>(<Card style={{flex:1}}>
  <CardItem>
  <Text>Our Story... Truth, These videos are priceless,  Buy them, watch them, gift them, watch them again!!!</Text>
  </CardItem>
  <CardItem>
   <View style={styles.pastPresFutureStyle}>

   <FlatList horizontal data={digitalResources} 
            renderItem={(item)=>{
              console.log(item.item.title);
              return(<ListItem style={{flex:1, borderRadius:15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                 <View style={{flex:1,padding:5, backgroundColor:COMMON_DARK_BACKGROUND, borderRadius:5}}>
                 <Thumbnail style={styles.videoRefsThumbnail} source={{uri:item.item.imageURI}}/>
               <Item>
               <Text>{item.item.title}</Text>
               {commonViewButton(item.item.title)}
               </Item>
                </View></ListItem>)
          }}
           ItemSeparatorComponent = {COMMON_LISTVIEW_ITEM_SEPARATOR}
        />
  </View>
  </CardItem>
</Card>)


        renderPicker = (list, placeholder) => {
    const widget =   <Form>
            <AltPicker
              mode="dropdown"
              placeholder={placeholder}

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


/**
 * Render the home view 
 */
  render() {
                  const { match, location, history } = this.props;

    console.log(this.props);
    return(
    <Container style={{backgroundColor:COMMON_DARK_BACKGROUND, flex:1, height:"100%"}}>
      <Content>
      <View style={{paddingBottom:55}}>
             
      </View>
      <View style={{flex:1}}>
<Card>
            <CardItem>
              <Body>

              </Body>
            </CardItem>
          </Card>
      </View>

      </Content>
     </Container>)};

  
}

const styles = StyleSheet.create({
  videoRefsOuterStyle:{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'},
  videoRefsInnerView:{alignItems:"center", margin:5},
  videoRefsThumbnail:{borderRadius:15}, 
  pastPresFutureStyle:{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'},
  touchable: {
    alignItems: 'center',
  },
   item: { padding: 10, fontSize: 18, height: 44},
});


const mapStateToProps = state => ({digitalResources: state.resourcesData.digitalResources,
                                  videoReferencePromotions: state.videoMediaPromotions})

export default connect(mapStateToProps, null)(Home)
