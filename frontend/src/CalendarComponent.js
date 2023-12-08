import React from 'react';
import { Dialog, DialogContent, DialogTitle, Divider, Popover, Alert, AlertTitle, TextField, Button, Box, Paper, Typography, Stack } from '@mui/material';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';
import dayjs from 'dayjs';
import EventDialog from './EventDialog';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";

const Alerttt = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ServerDay(props) {
	const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
	// console.log(day);
	const isSelected =
		!props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

	return (
		<Badge
			key={props.day.toString()}
			overlap="circular"
			badgeContent={isSelected ? '🟠' : undefined}
		>
			<PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
		</Badge>
	);
}


function CalendarComponent(props) {

	const { subject } = props;

	const [highlightedDays, setHighlightedDays] = React.useState([]);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [value, setValue] = React.useState(dayjs(new Date()));
	const [date, setDate] = React.useState(dayjs(new Date()));
	const [openDialog, setOpenDialog] = React.useState(false);
	const [events, setEvents] = React.useState([]);
	const requestAbortController = React.useRef(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [eventDate, setEventDate] = React.useState(dayjs(new Date()));
	const [openSuccess, setOpenSuccess] = React.useState(false);

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleSuccess = () => {
		setOpenSuccess(true);
	}

	const fetchHighlightedDays = (newDate) => {
		const controller = new AbortController();
		axios.post('http://localhost:4000/user/getEvents').then((response) => {
			var thisMonthEvents = response.data.filter((event) => {
				return dayjs(event.startDate).month() === newDate.month() && dayjs(event.startDate).year() === newDate.year();
			})
			if(subject) {
				thisMonthEvents = thisMonthEvents.filter((event) => {
					return event.subject === subject;
				})
			}
			// console.log(thisMonthEvents, date.month(), date.year(), date);
			var highDays = [];
			thisMonthEvents.forEach((event) => {
				highDays.push(dayjs(event.startDate).date());
			})
			setHighlightedDays(highDays);
			setEvents(thisMonthEvents);
			setIsLoading(false);
		}).catch((error) => {
			console.log(error);
		});
		requestAbortController.current = controller;
	};

	React.useEffect(() => {
		fetchHighlightedDays(date);
		// abort request on unmount
		return () => requestAbortController.current?.abort();
	},[]);

	// const [isEditing, setIsEditing] = React.useState(false);

	const handlePopoverOpen = (event, state) => {
		event.preventDefault();
		if (highlightedDays.indexOf(state.day.date()) >= 0) {
			setAnchorEl(event.currentTarget);
			setValue(state.day);
		}
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	}

	const handleEventCreate = async (event, state) => {
		event.preventDefault();
		// console.log(state.day);
		setEventDate(dayjs(state.day))
		setOpenDialog(true);
	}

	const handleCloseSuccess = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSuccess(false);
	};

	const handleMonthChange = (newDate) => {
		if (requestAbortController.current) {
			requestAbortController.current.abort();
		}

		setIsLoading(true);
		setHighlightedDays([]);
		fetchHighlightedDays(newDate);
	};

	const popoverOpen = Boolean(anchorEl);

	return (
		<Paper elevation={3}>
			<Snackbar open={openSuccess} autoHideDuration={2000} onClose={handleCloseSuccess}>
				<Alerttt onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
					Event Created
				</Alerttt>
			</Snackbar>
			<Stack container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
				<Stack item paddingY={2}>
					<Typography variant="h6">
						Calendar
					</Typography>
				</Stack>
				<Stack item width={"80%"}>
				<Divider />
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateCalendar
							sx={{
								"& .MuiDataGrid-root": {
									minWidth: "100%",
								},
							}}
							value={date}
							onChange={(newValue) => setDate(newValue)}
							loading={isLoading}
							onMonthChange={handleMonthChange}
							renderLoading={() => <DayCalendarSkeleton />}
							views={['year', 'month', 'day']}
							slots={{
								day: ServerDay,
							}}
							slotProps={{
								day: (ownerState) => ({
									highlightedDays: highlightedDays,
									onPointerEnter: (event) => handlePopoverOpen(event, ownerState),
									onPointerLeave: handlePopoverClose,
									onClick: (event) => handleEventCreate(event, ownerState),
								})
							}}
						/>
					</LocalizationProvider>
					<Popover
						sx={{
							pointerEvents: 'none',
						}}
						open={popoverOpen}
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
						onClose={handlePopoverClose}
						disableRestoreFocus
					>
						<Alert severity="info" sx={{alignItems: 'center', wordWrap: 'break-word', width: '20rem', }}>
							<AlertTitle>{events[highlightedDays.indexOf(value.date())]?.title}</AlertTitle>
							{events[highlightedDays.indexOf(value.date())]?.description}
						</Alert>
					</Popover>
					<EventDialog openDialog={openDialog} onClose={handleCloseDialog} clickedDate={eventDate} handleSuccess={handleSuccess} subject={subject}/>
				</Stack>
			</Stack>
		</Paper>
	);
}

export default CalendarComponent;