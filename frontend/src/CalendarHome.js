import React from 'react';
import { Paper, Stack, TextField, Typography, InputAdornment,Grid, Divider, Alert, AlertTitle  } from '@mui/material';
import SubjectCard from './SubjectCard';
import CalendarDialog from './CalendarDialog';
import SearchIcon from '@mui/icons-material/Search';
import Fuse from "fuse.js";
import NavigationBar from './navbar';
import CalendarComponent from './CalendarComponent';
import axios from 'axios';
import dayjs from 'dayjs';

function CalendarHomePage() {
	const [open, setOpen] = React.useState(false);
	const [search, setSearch] = React.useState('');
	const [subjects, setSubjects] = React.useState([]);
	const [bookmarkedSubjects, setBookmarkedSubjects] = React.useState([]);
	const [allSubjects, setAllSubjects] = React.useState([]);
	const [bookmarked, setBookmarked] = React.useState([]);
	const [events, setEvents] = React.useState([]);
	const [currSubjectId, setCurrSubjectId] = React.useState("");

	const handleClickOpen = (subject) => {
		setCurrSubjectId(subject);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const updateSearch = (event) => {
		var query = event.target.value;
		setSearch(query);
		if (query === '') {
			setSubjects(allSubjects);
			setBookmarkedSubjects(bookmarked);
			return;
		}
		const fuse1 = new Fuse(allSubjects, { keys: ["Name"] });
		const fuse2 = new Fuse(bookmarked, { keys: ["Name"] });
		const result1 = fuse1.search(query);
		const result2 = fuse2.search(query);
		setSubjects(result1);
		setBookmarkedSubjects(result2);
	}

	const toggleBookmark = (id, mark) => {
		axios.post('http://localhost:4000/user/toggleBookmark', { id, bookmarked: mark }).then((response) => {
			console.log(response);
		}).catch((error) => {
			console.log(error);
		});
	}

	React.useEffect(() => {
		axios.post('http://localhost:4000/user/getSubjects').then((response) => {
			var book = [], nonbook = [];
			response.data.forEach((subject) => {
				if (subject.Bookmarked) {
					book.push(subject);
				} else {
					nonbook.push(subject);
				}
			})
			setAllSubjects([...nonbook]);
			setBookmarked([...book]);
			if (search === '') {
				setSubjects(allSubjects);
				setBookmarkedSubjects(bookmarked);
			}
		}).catch((error) => {
			console.log(error);
		});
		axios.post('http://localhost:4000/user/getEvents').then((response) => {
			var thisWeekEvents = response.data.filter((event) => {
				return dayjs(event.startDate).isAfter(dayjs()) && dayjs(event.startDate).isBefore(dayjs().add(7, 'day'));
			})
			setEvents(thisWeekEvents);
		}).catch((error) => {
			console.log(error);
		});
});

	return (
		<div>
			<NavigationBar />
			<Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
				<Grid item xs={9} >
					<Stack container spacing={2} paddingX={2} paddingY={1}>
						<Stack item >
							<Paper elevation={3}>
								<Stack container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
									<Stack item>
										<Typography variant="h5" component="div">
											Subjects
										</Typography>
									</Stack>
									<Stack item>
										<TextField placeholder="Search subject" variant="outlined" value={search} onChange={updateSearch} InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SearchIcon />
												</InputAdornment>
											),
										}}>
											<SearchIcon />
										</TextField>
									</Stack>
								</Stack>
							</Paper>
						</Stack>
						<Stack item >
							<Paper elevation={3}>
								<Stack container spacing={2} padding={2}>
									<Stack item paddingLeft={1}>
										Bookmarked
									</Stack>
									<Stack item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
										{
											bookmarkedSubjects.map((subject, index) => (
												<SubjectCard key={index} image={subject.Image} title={subject.Name} description={subject.Description} onClick={handleClickOpen} bookmarked={subject.Bookmarked} id={subject._id} toggleBookmark={toggleBookmark} />
											))
										}
									</Stack>
								</Stack>
							</Paper>
						</Stack>
						<Stack item >
							<Paper elevation={3}>
								<Stack container spacing={2} padding={2}>
									<Stack item paddingLeft={1}>
										All courses
									</Stack>
									<Stack item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
										{
											subjects.map((subject, index) => (
												<SubjectCard key={index} image={subject.Image} title={subject.Name} description={subject.Description} onClick={handleClickOpen} bookmarked={subject.Bookmarked} id={subject._id} toggleBookmark={toggleBookmark} />
											))
										}
									</Stack>
								</Stack>
							</Paper>
						</Stack>
					</Stack>
				</Grid>
				<Grid item xs={3} paddingY={1}>
					<Stack container spacing={2}>
						<Stack item>
							<CalendarComponent />
						</Stack>
						<Stack item>
							<Paper elevation={3}>
								<Stack container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
									<Stack item paddingY={2}>
										<Typography variant="h6">
											Upcoming Events
										</Typography>
									</Stack>
									<Stack item width={"80%"}>
										<Divider />
									</Stack>
									<Stack container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'center', paddingY: 2}}>
										{											
											events.map((event, index) => (
												<Stack item width={"80%"} paddingY={1}>
													<Alert severity="info" sx={{ alignItems: 'center'}}>
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
				</Grid>
			</Grid>
			<CalendarDialog open={open} onClose={handleClose} subjectId={currSubjectId} />
		</div>
	);
}

export default CalendarHomePage;