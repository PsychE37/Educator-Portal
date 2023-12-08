import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import axios from "axios";

export default class ScheduleView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentDate: new Date(),
      currentViewName: props.viewName,
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.currentViewName !== this.props.viewName) {
      this.setState({ currentViewName: this.props.viewName });
    }
  }

  componentDidMount() {
    axios
      .post("http://localhost:4000/user/getEvents")
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { data, currentDate, currentViewName} = this.state;

    return (
      <React.Fragment>
        <Paper sx={{ height: "50rem", marginX: 1, marginTop: 2}}>
          <Scheduler
            data={data}
          >
            <ViewState
              currentDate={currentDate}
              currentViewName={currentViewName}
              onCurrentDateChange={this.currentDateChange}
            />
            <DayView
              startDayHour={0}
              endDayHour={24}
            />
            <WeekView
              startDayHour={0}
              endDayHour={24}
            />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
          </Scheduler>
        </Paper>
      </React.Fragment>
    );
  }
}