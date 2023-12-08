import React from 'react';
import { Dialog, DialogContent, DialogTitle, Divider, Typography, BottomNavigation, BottomNavigationAction } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import MuiAlert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SyllabusDialog(props) {

	const { open, onClose, syllabus } = props;
	const [isEditing, setIsEditing] = React.useState(false);
	const [courseObjectives, setCourseObjectives] = React.useState('');
	const [topics, setTopics] = React.useState('');
	const [assignments, setAssignments] = React.useState('');
	const [notes, setNotes] = React.useState('');
	const [references, setReferences] = React.useState('');

	const handleClose = () => {
		setIsEditing(false);
		onClose();
	};

	const updateSyllabus = () => {
		var id = syllabus;
		var details = { syllabus, courseObjectives, topics, assignments, notes, references };
		axios.post('http://localhost:4000/user/updateSyllabus', { id, details }).then((response) => {
			console.log(response);
		}).catch((error) => {
			console.log(error);
			setOpenSnackBar(true);
		});
		setIsEditing(false);
	}

	const [openSnackBar, setOpenSnackBar] = React.useState(false);

	const handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackBar(false);
	};

	React.useEffect(() => {
		if(!open) return;
		axios.post('http://localhost:4000/user/getSyllabus', { syllabus }).then((response) => {
			setCourseObjectives(response.data.courseObjectives);
			setTopics(response.data.topics);
			setAssignments(response.data.assignments);
			setNotes(response.data.notes);
			setReferences(response.data.references);
		}).catch((error) => {
			console.log(error);
		});
	},[open]);

	return (
		<Dialog open={open} onClose={handleClose} fullWidth >
			<DialogTitle sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
				Syllabus
				<IconButton onClick={handleClose} style={{ backgroundColor: 'transparent' }}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<Typography variant="h5" component="div" paddingY={1}>
					Course Objectives
				</Typography>
				{!isEditing ? (<Typography variant="body1" component="div">
					{courseObjectives}
				</Typography>) :
					(<TextField defaultValue={courseObjectives} onChange={(e) => setCourseObjectives(e.target.value)} multiline maxRows={6} fullWidth />)}
				<Typography variant="h5" component="div" paddingY={1}>
					Topics
				</Typography>
				{!isEditing ? (<Typography variant="body1" component="div">
					{topics}
				</Typography>) :
					(<TextField defaultValue={topics} onChange={(e) => setTopics(e.target.value)} multiline maxRows={6} fullWidth />)}
				<Typography variant="h5" component="div" paddingY={1}>
					Assignments
				</Typography>
				{!isEditing ? (<Typography variant="body1" component="div">
					{assignments}
				</Typography>) :
					(<TextField defaultValue={assignments} onChange={(e) => setAssignments(e.target.value)} multiline maxRows={6} fullWidth />)}
				<Typography variant="h5" component="div" paddingY={1}>
					Notes
				</Typography>
				{!isEditing ? (<Typography variant="body1" component="div">
					{notes}
				</Typography>) :
					(<TextField defaultValue={notes} onChange={(e) => setNotes(e.target.value)} multiline maxRows={6} fullWidth />)}
				<Typography variant="h5" component="div" paddingY={1}>
					References/Links
				</Typography>
				{!isEditing ? (<Typography variant="body1" component="div">
					{references}
				</Typography>) :
					(<TextField defaultValue={references} onChange={(e) => setReferences(e.target.value)} multiline maxRows={6} fullWidth />)}
			</DialogContent>
			<Divider />
			<Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleCloseSnackBar}>
				<Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>
					Could not save syllabus!
				</Alert>
			</Snackbar>
			<BottomNavigation
				showLabels
				sx={{ marginY: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}
			>
				<BottomNavigationAction label="Edit" icon={<EditIcon />} disabled={isEditing} onClick={() => setIsEditing(true)} />
				<Divider orientation="vertical" flexItem />
				<BottomNavigationAction label="Save" icon={<SaveIcon />} disabled={!isEditing} onClick={updateSyllabus} />
			</BottomNavigation>
		</Dialog>
	);
}

export default SyllabusDialog;