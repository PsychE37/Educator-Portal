import React from 'react';
import { Event } from "@mui/icons-material";
import CalendarViewWeekOutlinedIcon from '@mui/icons-material/CalendarViewWeekOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { AppBar, Button, Container, Toolbar, Box } from '@mui/material';
import dayjs from 'dayjs';
import EventDialog from './EventDialog';

function ScheduleToolbar({changeView}) {

	const [openDialog, setOpenDialog] = React.useState(false);

	const handleClickOpen = () => {
		setOpenDialog(true);
	}

	const closeDialog = () => {
		setOpenDialog(false);
	}

	return (
		<AppBar position="static" sx={{ opacity: .8, marginY: 1, borderRadius: 10 }} color="secondary">
			<Container maxWidth="false">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Button variant='outlined' onClick={handleClickOpen} startIcon={<CalendarTodayOutlinedIcon />} sx={{ marginX: 2, color: "white", borderColor: "white" }}>
								New Event
						</Button>
						<Button variant='text' onClick={() => changeView('Day')} startIcon={<Event />} sx={{ marginX: 1, color: "white" }}>
								Day
						</Button>
						<Button variant='text' onClick={() => changeView('Week')} startIcon={<CalendarViewWeekOutlinedIcon />} sx={{ marginX: 1, color: "white" }}>
								Week
						</Button>
						<Button variant='text' onClick={() => changeView('Month')} startIcon={<CalendarMonthOutlinedIcon />} sx={{ marginX: 1, color: "white" }}>
								Month
						</Button>
					</Box>
				</Toolbar>
				<EventDialog openDialog={openDialog} onClose={closeDialog} clickedDate={dayjs(new Date())}/>
			</Container>
		</AppBar>
	);
}
export default ScheduleToolbar;