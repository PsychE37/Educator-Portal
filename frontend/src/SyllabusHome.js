import React from 'react';
import { Paper, Stack, TextField, Typography, InputAdornment } from '@mui/material';
import SubjectCard from './SubjectCard';
import SyllabusDialog from './SyllabusDialog';
import SearchIcon from '@mui/icons-material/Search';
import Fuse from "fuse.js";
import NavigationBar from './navbar';
import axios from 'axios';

function SyllabusHomePage() {
	const [open, setOpen] = React.useState(false);
	const [search, setSearch] = React.useState('');
	const [subjects, setSubjects] = React.useState([]);
	const [bookmarkedSubjects, setBookmarkedSubjects] = React.useState([]);
	const [allSubjects, setAllSubjects] = React.useState([]);
	const [bookmarked, setBookmarked] = React.useState([]);
	const [selectedSubjectId, setSelectedSubjectId] = React.useState('');

	const handleClickOpen = (subject) => {
		setSelectedSubjectId(subject);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const toggleBookmark = (id, mark) => {
		axios.post('http://localhost:4000/user/toggleBookmark', { id, bookmarked: mark }).then((response) => {
			console.log(response);
		}).catch((error) => {
			console.log(error);
		});
	}

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
	})

	return (
		<div>
			<NavigationBar />
			<Stack container spacing={2} paddingX={4} paddingY={1}>
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
										<SubjectCard key={index} image={subject.Image} title={subject.Name} description={subject.Description} onClick={() => handleClickOpen(subject.Syllabus)} bookmarked={subject.Bookmarked} id={subject._id} toggleBookmark={toggleBookmark}/>
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
										<SubjectCard key={index} image={subject.Image} title={subject.Name} description={subject.Description} onClick={() => handleClickOpen(subject.Syllabus)} bookmarked={subject.Bookmarked} id={subject._id} toggleBookmark={toggleBookmark} />
									))
								}
							</Stack>
						</Stack>
					</Paper>
				</Stack>
			</Stack>
			<SyllabusDialog open={open} onClose={handleClose} syllabus={selectedSubjectId}/>
		</div>
	);
}

export default SyllabusHomePage;