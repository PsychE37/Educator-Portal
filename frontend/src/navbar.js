import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ListItemIcon } from '@mui/material';
import ProfileDialog from './ProfileDialog';

const pages = ['Syllabus', 'Calendar', 'Schedule'];
const menuItems = ['Settings'];
const menuIcons = [SettingsIcon];

function NavigationBar() {
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		window.location.href = '/';
	}

	return (
		<AppBar position="static" sx={{opacity: .8}}>
			<Container maxWidth="false">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/syllabus"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontWeight: 700,
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Educator Portal
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page}
								sx={{ my: 2, color: 'white', display: 'block' }}
								onClick={() => window.location.href = '/' + page.toLowerCase()}
							>
								{page}
							</Button>
						))}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="ABCD" src="/static/images/avatar/profile_pic.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem key="Profile" onClick={handleClickOpen}>
								<ListItemIcon>
									<AccountBoxIcon />
								</ListItemIcon>
								<ListItemText>Profile</ListItemText>
							</MenuItem>
							{menuItems.map((item, index) => (
								<MenuItem key={item} onClick={handleCloseUserMenu}>
									<ListItemIcon>
										{React.createElement(menuIcons[index])}
									</ListItemIcon>
									<ListItemText>{item}</ListItemText>
								</MenuItem>
							))}
							<ProfileDialog open={open} onClose={handleClose} />
							<MenuItem key="Logout" onClick={handleLogout}>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText>Logout</ListItemText>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default NavigationBar;