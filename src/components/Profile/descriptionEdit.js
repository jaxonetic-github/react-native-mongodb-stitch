import React, { Component } from "react";
import { Container, Header, Content, Item, Label, Textarea, Form } from "native-base";
import { connect } from 'react-redux';
import { addProfileName } from './Redux/Actions/profile.js';

 class DescriptionTextArea extends Component {
  render() {
    return (
      <Container>

        <Content padder>
          <Form>
              <Label>Description</Label>
            <Textarea rowSpan={5} bordered placeholder="Textarea" value={this.props.userprofile.description} />
              </Form>

        </Content>
      </Container>
    );
  }
}



const mapStateToProps = state => {
  return {
    userprofile: state.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (name) => {
      dispatch(addProfileName(name))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DescriptionTextArea)

