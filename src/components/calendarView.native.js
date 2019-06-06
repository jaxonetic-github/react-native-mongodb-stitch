import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import { Container, Header, Content, Item, Label, Button, Left } from "native-base";
import {COMMON_DARK_BACKGROUND} from '../constants.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Calendar} from 'react-native-calendars';
import {updateEventCalendarByKey} from './Event/Redux/Actions/eventActions.js'


class CalendarView extends Component {
  constructor(props) {
    super(props);
    console.log(this.prop);
    this.state = {key:this.props.history.location.state.key, dates:[], selected:this.props.history.location.state.initialDate};
    this.onDayPress = this.onDayPress.bind(this);
  }

  render() {
    const markedDates = {[this.state.selected]: {selected: true, marked: true, selectedColor: 'blue'}}
    return (
      <Container>
       <Header  style={{backgroundColor: COMMON_DARK_BACKGROUND, height:55, color:"white"}}>
<Left><Button transparent onPress={()=>{this.props.history.push("/Activities/EventView/"+this.state.key )}}>
<Text>Back</Text></Button></Left>
</Header>
      <ScrollView style={styles.container}>        
        <Text style={styles.text}>{this.state.selected}</Text>
        <Calendar
          style={styles.calendar}
           onDayPress={this.onDayPress}
          onDayLongPress={this.onDayLongPress}
          markingType={'multi-period'}
          current={this.state.selected}
          markedDates={markedDates}
          hideArrows={false}
        />
      </ScrollView>
      </Container>
    );
  }

  onDayPress(day) {
    console.log(this.props.location,"----",day.dateString);
    this.setState({
      selected: day.dateString
    });
    
    this.props.updateEventCalendarByKey({payload:day.dateString, key:this.props.location.state.key});
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#666'
  },
  container: {
    flex: 1,
    backgroundColor: 'darkgray'
  }
});



function matchDispatchToProps(dispatch){
  return bindActionCreators({updateEventCalendarByKey: updateEventCalendarByKey}, dispatch)
}

export default connect(null,matchDispatchToProps )(CalendarView)

