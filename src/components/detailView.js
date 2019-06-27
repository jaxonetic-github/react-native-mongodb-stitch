import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Title,Right, Text, Button, Icon, Left, Body } from 'native-base';
//import  ImagePicker  from './imagepicker.js';
import { connect } from 'react-redux';

 class DetailView extends Component {
  
  constructor(props) {
    super(props);

    console.log('+++++++++++++++++++++++++++++++',this.props.navigation.state.params.id);
    //setting default state
    this.state = { profileIndex: this.props.navigation.state.params.id, text: ''};
     }

  render() {
        let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
  <Container>
      <Header style={{backgroundColor: '#a9c3d2'}}>
          <Left>
            </Left>

            <Body>
              <Title> Makes Sense! </Title>
            </Body>

            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
    <Icon ios='ios-add-circle' android="md-add-circle" style={{fontSize: 20, color: 'blue'}}/>
    <Text>edit</Text>
</Button>
            </Right>
        </Header>
    
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={this.props.profiles[this.state.profileIndex].imageURI}  />
                <Body>
                  <Text>{this.props.profiles[this.state.profileIndex].name}</Text>
                  <Text>{this.props.profiles[this.state.profileIndex].phone}</Text>
                  <Text>{this.props.profiles[this.state.profileIndex].email}</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={this.props.profiles[this.state.profileIndex].imageURI}  style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  {this.props.profiles[this.state.profileIndex].description}
                </Text>
                
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}




const mapStateToProps = state => {
  
  console.log(state)
  return {
    profiles: state.profiles.profiles,
    email: state.profiles.tmpProfile.email,
    name: state.profiles.tmpProfile.name,
    phone: state.profiles.tmpProfile.phone,
    website: state.profiles.tmpProfile.website,
    description: state.profiles.tmpProfile.description,
    imageURI: state.profiles.tmpProfile.imageURI
  }
}


export default connect(mapStateToProps)(DetailView)






