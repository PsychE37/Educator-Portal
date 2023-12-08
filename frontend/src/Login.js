import { Grid, Paper, Stack, Typography, Box, TextField, Button } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from 'react';

function LoginPage() {
	const [value, setValue] = React.useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Grid container style={{ height: '100vh', display: 'flex', flexDirection: 'row', justifyContent: 'start', overflow: 'hidden' }}>
				<Grid item xs={8}>
					<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="Background" style={{ height: '100%'}} />
				</Grid>
				<Grid item xs={4} sx={{minHeight: '100%'}}>
					<Paper elevation={6} sx={{ minHeight: '100%', borderRadius: 2}}>
						<Stack container sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
							<Stack item padding={3}>
								<Typography variant="h3" flexWrap={'wrap'}>
									Welcome Back
								</Typography>
							</Stack>
							<Stack item>
								<TabContext value={value}>
									<Box sx={{ borderBottom: 1, borderColor: 'divider', marginX: 3}}>
										<TabList onChange={handleChange}>
											<Tab label="Teacher" value="1" />
											<Tab label="Headmaster" value="2" />
										</TabList>
									</Box>
									<TabPanel value="1">
										<Box
											component="form"									
											noValidate
											autoComplete="off"
											sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
										>
											<TextField
												required
												label="Username"
												placeholder='Enter your username'
												margin="dense"
											/>
											<TextField
												required
												type="password"
												label="Password"
												placeholder='Enter your password'
												margin="dense"
											/>
										<Button variant="contained" sx={{ marginTop: 2 }} fullWidth href='/syllabus'>
												Login
											</Button>
										</Box>
									</TabPanel>
									<TabPanel value="2">
										<Box
											component="form"
											noValidate
											autoComplete="off"
											sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
										>
											<TextField
												required
												label="Username"
												placeholder='Enter your username'
												margin="dense"
											/>
											<TextField
												required
												type="password"
												label="Password"
												placeholder='Enter your password'
												margin="dense"
											/>
											<Button variant="contained" sx={{ marginTop: 2 }} fullWidth href='/syllabus'>
												Login
											</Button>
										</Box>
									</TabPanel>
								</TabContext>
							</Stack>

						</Stack>
					</Paper>
				</Grid>
			</Grid>
	);
}

export default LoginPage;