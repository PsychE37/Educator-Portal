import React from "react";
import { Dialog, DialogContent, DialogTitle, Divider, TextField, Button, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import MuiAlert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EventDialog(props) {

	const { openDialog, onClose, clickedDate, handleSuccess, subject } = props;

	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [startEventTime, setStartEventTime] = React.useState();
	const [endEventTime, setEndEventTime] = React.useState();
	const [open, setOpen] = React.useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleCloseDialog = () => {
		onClose();
	};

	const handleEventCreate = () => {
		if(title === '' || description === '') {
			setOpen(true);
			return;
		}
		// console.log(startEventTime, typeof(startEventTime));
		// console.log(endEventTime, typeof(endEventTime));

		axios.post('http://localhost:4000/user/addEvent', {
			title: title,
			description: description,
			startDate: startEventTime !== undefined ? startEventTime.toDate() : clickedDate.toDate(),
			endDate: endEventTime !== undefined ? endEventTime.toDate() : clickedDate.add(1, 'hour').toDate(),
			subject: subject ? subject : null
		})
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			})
		handleSuccess();
		handleCloseDialog();
	}

	return (
		<Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
			<DialogTitle sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
				Add event
				<IconButton onClick={handleCloseDialog} style={{ backgroundColor: 'transparent' }}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider />
			<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					Please fill all the fields!
				</Alert>
			</Snackbar>
			<DialogContent>
				<Box
					component="form"
					noValidate
					autoComplete="off"
					sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
				>
					<TextField
						required
						label="Title"
						placeholder='Enter event title'
						margin="dense"
						onChange={(e) => setTitle(e.target.value)}
						fullWidth
					/>
					<TextField
						required
						label="Description"
						placeholder='Enter event description'
						margin="dense"
						onChange={(e) => setDescription(e.target.value)}
						maxRows={6}
						multiline
						fullWidth
					/>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Stack sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, marginBottom: 1}}>
							<DateTimePicker
							 	sx={{maxWidth: '50%', marginRight: 1}}
								defaultValue={clickedDate}
								value={startEventTime}
								onChange={(newValue) => setStartEventTime(newValue)}
								label="Start Time"
								viewRenderers={{
									hours: renderTimeViewClock,
									minutes: renderTimeViewClock,
									seconds: renderTimeViewClock,
								}}
							/>
							<Divider sx={{minWidth: '8%'}}>
								to
							</Divider>
							<DateTimePicker
								sx={{ maxWidth: '50%', marginLeft: 1}}	
								defaultValue={clickedDate.add(1, 'hour')}
								value={endEventTime}
								onChange={(newValue) => setEndEventTime(newValue)}
								label="End Time"
								viewRenderers={{
									hours: renderTimeViewClock,
									minutes: renderTimeViewClock,
									seconds: renderTimeViewClock,
								}}
							/>
						</Stack>
					</LocalizationProvider>
					<Button variant="contained" sx={{ marginTop: 2 }} fullWidth onClick={handleEventCreate}>
						Create
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

export default EventDialog;