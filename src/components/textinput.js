import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';

/**
 * A general customizable input element
 *
 */
export default class Input extends Component {
/**
     * Create an input field.
     * @param {string} inputInitialValue - the inital value for the input.
     */
 constructor(props) {
    super(props);
    this.state = { text: props.inputInitialValue, inputType:props.inputType }
  }    

  /** Updates the input field as the user types
   * @param {string} text - the user input
   */
  onChangeText = (text) => { console.log(text);
    this.setState({text:text})}

onBlur = ()=>{
 const {onInputBlur} = this.props
   console.log(this.props,'new blurring-->',this.state.text)
   this.props.updateChange(this.state.text)
if(onInputBlur){
  onInputBlur(this.state.text)
  console.log('new address to lookup-->',this.state.text)
}
}
  /** Method to handle the case when the user has finished editing field*/
  onSubmitEditing = () => {
    const {updateChange} = this.props
    if(updateChange){
    const {text} = this.state

    if (!text) return // Don't submit if empty

    updateChange(text)
}
    //this.setState({text: ''})
  }

  render() { 
    const {text} = this.state

    return (
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
        placeHolder={this.state.inputType}
        onBlur={() => this.onBlur() }
      />
    )
  }
}


const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

