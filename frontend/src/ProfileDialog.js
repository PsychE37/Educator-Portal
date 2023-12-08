import React from 'react';
import { Dialog, DialogContent, DialogTitle, Divider, Typography, BottomNavigation, BottomNavigationAction } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';

const text = "Lorem ipsum dolor sit amet."

function ProfileDialog(props) {

	const { open, onClose } = props;
	const [isEditing, setIsEditing] = React.useState(false);

	const handleClose = () => {
		setIsEditing(false);
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth >
			<DialogTitle sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
				Profile
				<IconButton onClick={handleClose} style={{ backgroundColor: 'transparent' }}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<Typography variant="h5" component="div" paddingY={1}>
					Name
				</Typography>
				{!isEditing ? (<Typography variant="body1" component="div">
					{text}
				</Typography>) :
					(<TextField defaultValue={text} multiline maxRows={6} fullWidth />)}
				<Typography variant="h5" component="div" paddingY={1}>
					Designation
				</Typography>
				{!isEditing ? (<Typography variant="body1" component="div">
					{text}
				</Typography>) :
					(<TextField defaultValue={text} multiline maxRows={6} fullWidth />)}
				<Typography variant="h5" component="div" paddingY={1}>
					Email
				</Typography>
				{!isEditing ? (<Typography variant="body1" component="div">
					{text}
				</Typography>) :
					(<TextField defaultValue={text} multiline maxRows={6} fullWidth />)}
			</DialogContent>
			<Divider />
			<BottomNavigation
				showLabels
				sx={{ marginY: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}
			>
				<BottomNavigationAction label="Edit" icon={<EditIcon />} disabled={isEditing} onClick={() => setIsEditing(true)} />
				<Divider orientation="vertical" flexItem />
				<BottomNavigationAction label="Save" icon={<SaveIcon />} disabled={!isEditing} onClick={() => setIsEditing(false)} />
			</BottomNavigation>
		</Dialog>
	);
}

export default ProfileDialog;