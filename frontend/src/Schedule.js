import React from "react";
import NavigationBar from "./navbar";
import ScheduleToolbar from "./ScheduleToolbar";
import ScheduleView from "./Scheduler";


function SchedulePage() {
	const [view, setView] = React.useState('Week');
	const changeView = (view) => {
		setView(view);
	}
	return (
		<div className="calendar">
			<NavigationBar />
			<ScheduleToolbar changeView={changeView} />
			<ScheduleView viewName={view} />
		</div>
	);
}

export default SchedulePage;