import React from 'react';

import Scheduler from 'devextreme-react/scheduler';
import axios from 'axios';
import {CSVLink} from 'react-csv';

import * as AspNetData from 'devextreme-aspnet-data-nojquery';

const url = 'https://js.devexpress.com/Demos/Mvc/api/SchedulerData';
const dataSource = AspNetData.createStore({
  key: 'AppointmentId',
  loadUrl: `${url }/Get`,
  insertUrl: `${url }/Post`,
  updateUrl: `${url }/Put`,
  deleteUrl: `${url }/Delete`,
  onBeforeSend(_, ajaxOptions) {
    ajaxOptions.xhrFields = { withCredentials: true };
  }
});

const currentDate = new Date();
const views = ['day', 'workWeek', 'month'];

class App extends React.Component {
  constructor(){
    super();
    this.state={
      data:[]
    }
  }

  componentDidMount(){
     axios.get(url + '/Get').then(res=>
      {this.setState({data:res.data.data})})
  }


  render() {
    return (
      <div className="scheduler-app">
      <div className="exportToCsv">
      <CSVLink asyncOnClick={true} data={this.state.data}>Export to CSV</CSVLink>
      </div>
      <Scheduler
        dataSource={dataSource}
        views={views}
        defaultCurrentView={'day'}
        defaultCurrentDate={currentDate}
        height={600}
        startDayHour={9}
        endDayHour={19}
        textExpr= {'Text'}
        startDateExpr={'StartDate'}
        endDateExpr={'EndDate'}
        allDayExpr={'AllDay'} />
        </div>
    );
  }
}

export default App;
