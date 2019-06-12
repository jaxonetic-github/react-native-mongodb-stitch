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
    console.log(props);
    if (this.props.history)
    {
      this.state = {key:this.props.history.location.state.key, markedDates:[], selected:this.props.history.location.state.initialDate};
    }
    else if (props && props.groupView)
    {

      //find the dates for this month
      const thisMonth = moment().format('MM');
      const filteredEvents = this.props.events.filter((event)=>(event.calendar.month===thisMonth));
      console.log("THis Month", thisMonth,"\n",filteredEvents);
 const filteredDates = this.props.events.map((event)=>{
       return (event.calendar.month && (event.calendar.month===moment().format('MM'))) ?
        this.createMarkedDate(event.calendar) : null;
      } );

      this.state = {markedDates:filteredDates, selected:moment().format('YYYY-MM-DD')}
    }
    //this.onDayPress = this.onDayPress.bind(this);
  }


createMarkedDate = (calendar) => {
  const stringFormat =  calendar.year+"-"+calendar.month+"-"+calendar.day
  const entry = {formattedDate:stringFormat , dateStyle:{marked: true, selected:true, selectedColor: 'red', dotColor: 'red', activeOpacity: 4}};
  return entry;
}


componentDidMount =()=>{
  const thisMonth = moment().format('MM');
  
  console.log("mounting calendarview");
  console.log(this.props.events,"---",this.props.events.filter((evt)=>{
    console.log(evt);
    return (evt.calendar.month==="06");}));
  const filteredDates = this.props.events.map((event)=>{
       return (event.calendar.month && (event.calendar.month===thisMonth)) ?
        this.createMarkedDate(event.calendar) : null;
      } );
  console.log(filteredDates);
  this.setState({markedDates:filteredDates});
}

  calendarFilteredData = ()=>{
    
  }
  render() {
    console.log(this.props.events,"rernder",this.state.markedDates);

    const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};
let markedDates_ex = {};//{'2019-06-25': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'}};
for(let i=0; i<this.state.markedDates.length;i++){
console.log(this.state.markedDates.length,"----",this.state.markedDates[i]);
 markedDates_ex[this.state.markedDates[i].formattedDate]= this.state.markedDates[i].dateStyle;

}

  const markingType='multi-dot'

    console.log(markedDates_ex,"render:=>", this.state.markedDates);
    const dates = {dates};
    return (
      <View style={{backgroundColor:"red"}}>
       
        <Text style={styles.text}>{this.state.selected}</Text>
        <Calendar
          style={styles.calendar}
           onDayPress={this.onDayPress}
          onDayLongPress={this.onDayLongPress}
          markingType={markingType}
          markedDates={markedDates_ex}
          hideArrows={false}
        />
      </View>
    );
  }

  onDayPress=(day) =>{
    //console.log(this.props.location,"----",day.dateString);
   /* this.setState({
      selected: day.dateString
    });*/
    
    this.props.updateEventCalendarByKey({payload:{year:moment(day.dateString).format('YYYY'), month:moment(day.dateString).format('MM'), day:moment(day.dateString).format('DD')}, key:this.props.location.state.key});
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

