import React, { Component } from "react";
import { Container, Header, Content, Item, Label, Textarea, Form } from "native-base";
import ImagePicker from '../imagepicker.js';

export default class DescriptionTextArea extends Component {
  render() {
    return (
      <Container>

        <Content padder>
                          <ImagePicker />


        </Content>
      </Container>
    );
  }
}