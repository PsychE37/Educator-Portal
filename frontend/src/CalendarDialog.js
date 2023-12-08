import React from 'react';
import { Dialog, DialogContent, DialogTitle, Divider,Alert, AlertTitle, Stack, Typography, Paper} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CalendarComponent from './CalendarComponent';
import axios from 'axios';
import dayjs from 'dayjs';

function CalendarDialog(props) {

	const { open, onClose, subjectId } = props;
	const [events, setEvents] = React.useState([]);

	const handleClose = () => {
		onClose();
	};

	React.useEffect(() => {
		axios.post('http://localhost:4000/user/getEvents', { subjectId }).then((response) => {
			var thisWeekEvents = response.data.filter((event) => {
				return dayjs(event.startDate).isAfter(dayjs()) && dayjs(event.startDate).isBefore(dayjs().add(7, 'day'));
			})
			thisWeekEvents = thisWeekEvents.filter((event) => {
				return event.subject === subjectId;
			})
			
			setEvents(thisWeekEvents);
		}).catch((error) => {
			console.log(error);
		});
	})

	return (
		<Dialog open={open} onClose={handleClose} fullWidth >
			<DialogTitle sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
				Calendar
				<IconButton onClick={handleClose} style={{ backgroundColor: 'transparent' }}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<Stack container spacing={2}>
					<Stack item>
						<CalendarComponent subject={subjectId} />
					</Stack>
					<Stack item>
						<Paper elevation={3}>
							<Stack container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
								<Stack item paddingY={2}>
									<Typography variant="h6">
										Upcoming Events
									</Typography>
								</Stack>
								<Stack item width={"80%"}>
									<Divider />
								</Stack>
								<Stack container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'center', paddingY: 2 }}>
									{
										events.map((event, index) => (
											<Stack item width={"80%"} paddingY={1}>
												<Alert severity="info" sx={{ alignItems: 'center' }}>
													<AlertTitle>{event.title}</AlertTitle>
													{event.description}
												</Alert>
											</Stack>
										))
									}
								</Stack>
							</Stack>
						</Paper>
					</Stack>
				</Stack>				  
			</DialogContent>
		</Dialog>
	);
}

export default CalendarDialog;