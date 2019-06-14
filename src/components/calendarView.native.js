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
import moment from 'moment';

/**
 * If no initial date is given, the current month and group view is assumed
 */
class CalendarView extends Component {
  constructor(props) {
    super(props);

    if (this.props.history)
    {
      this.state = {key:this.props.history.location.state.key, markedDates:[], selected:this.props.history.location.state.initialDate};
    }
    else 
      if (props && props.generalView)
      {
        //find the dates for this month
        const thisMonth = moment().format('YYYY-MM-DD');
        const filteredDates = this.calendarFilteredData(thisMonth);
        this.state = {markedDates:filteredDates, selected:thisMonth}
      }

  }


  createMarkedDate = (calendar) => {
    const stringFormat =  calendar.year+"-"+calendar.month+"-"+calendar.day
    const entry = {formattedDate:stringFormat , dateStyle:{marked: true, selected:true, selectedColor: 'red', dotColor: 'red', activeOpacity: 4}};
    return entry;
  }


componentDidMount =()=>{

}

  calendarFilteredData = (selectedDate)=>{
    console.log(this.state);
 const filteredDates = this.props.events.map((event)=>{
        const month = moment( selectedDate, 'YYYY-MM-DD').format("MM");
       return (event.calendar.month && (event.calendar.month===month)) ?
        this.createMarkedDate(event.calendar) : null;
      } );
 return filteredDates;
  }


  render() {
 let test ;
        if(!this.props.generalView){
           let selectedEvent = this.props.events.filter((evt)=>evt.id==this.state.key);
     test = selectedEvent[0].calendar.year+"-"+selectedEvent[0].calendar.month+"-"+selectedEvent[0].calendar.day;
  }
let filteredMarkedDates =this.calendarFilteredData(this.state.selected);

    const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};
let markedDates_ex = {};//{'2019-06-25': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'}};
console.log(filteredMarkedDates);
for(let i=0; filteredMarkedDates[i] && i<filteredMarkedDates.length;i++){
  console.log(filteredMarkedDates[i]);
  if(filteredMarkedDates[i].formattedDate==test)
 markedDates_ex[filteredMarkedDates[i].formattedDate]= {... filteredMarkedDates[i].dateStyle,selectedColor: 'maroon' };
else
   markedDates_ex[filteredMarkedDates[i].formattedDate]= {... filteredMarkedDates[i].dateStyle,selectedColor: COMMON_DARK_BACKGROUND };

}

  const markingType='multi-dot'

    console.log(this.props,"render:=>", this.state.markedDates);
    const dates = {dates};
    return (
      <View style={{backgroundColor:"red"}}>
       
        <Text style={styles.text}>{this.state.selected}</Text>
        <Calendar
          style={styles.calendar}
           onDayPress={this.onDayPress}
           current={this.state.selected}
          onDayLongPress={this.onDayLongPress}
          markingType={markingType}
          markedDates={markedDates_ex}
          hideArrows={false}
        />
      </View>
    );
  }

  onDayPress=(day) =>{
    if(!this.props.generalView)
       this.props.updateEventCalendarByKey({payload:{year:moment(day.dateString).format('YYYY'), month:moment(day.dateString).format('MM'), day:moment(day.dateString).format('DD')}, key:this.props.location.state.key});
    else
      {console.log(day,"---", tst);
  }
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



const mapStateToProps = state => {
   const eventKeys = Object.keys(state.events.events);
   const evts = eventKeys.map(pkey => state.events.events[pkey]);
   console.log(evts);
  return {       events: evts }

}

function matchDispatchToProps(dispatch){
  return bindActionCreators({updateEventCalendarByKey: updateEventCalendarByKey}, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps )(CalendarView)

