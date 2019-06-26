import React, {Component} from 'react';
import Calendar from 'react-calendar';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Container, Header, Button, Left } from "native-base";
import {COMMON_DARK_BACKGROUND} from '../constants.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {updateEventCalendarByKey} from './Event/Redux/Actions/eventActions.js'
import moment from 'moment';


class CalendarView extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    if (this.props.history)
    {
      this.state = {key:this.props.history.location.state.key, markedDates:[], selected:this.props.history.location.state.initialDate};
    }
    else 
      if (props && props.generalView)
      {
        //find the dates for this month
        const thisMonth = moment().format('YYYY-MM-DD');
        const filteredDates =[thisMonth];// this.calendarFilteredData(thisMonth);
        this.state = {date:new Date(), markedDates:filteredDates, selected:thisMonth}
      }
  }

  render() {
   // const markedDates = {[this.state.selected]: {selected: true, marked: true, selectedColor: 'blue'}}
   const header =<Header  style={{backgroundColor: COMMON_DARK_BACKGROUND, height:55}}>
<Left><Button transparent onPress={()=>{this.props.history.goBack()}}>
<Text>Back</Text></Button></Left>
</Header>

    return (
      <Container>
       {this.props.generalView ?null: header}
      <ScrollView style={styles.container}>        
        <Text style={styles.text}>{this.state.selected}</Text>
              <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
  
      </ScrollView>
      </Container>
    );
  }

onChange = (date) => {
  this.setState({ date, selected:moment(date).format('YYYY-MM-DD') });
this.props.updateEventCalendarByKey({payload:moment(date).format('YYYY-MM-DD'), key:this.props.location.state.key});
}

}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
   
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

