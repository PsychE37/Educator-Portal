import React from 'react';
import NavigationBar from './navbar'
import { Grid, Paper, Stack, Alert, AlertTitle } from '@mui/material';
function LandingPage() {
	return (
		<div>
			<NavigationBar />
			<Grid container sx={{flexDirection: 'column', justifyContent: 'start', alignItems: 'center', margin: 5}}>
				<Grid item>
					<Paper >
						<Stack container>
							<Stack item>
								<Alert severity="error" sx={{ alignItems: 'center' }} fullWidth>
									<AlertTitle>Class 3B</AlertTitle>
									Multiple students with low attendance.
								</Alert>
							</Stack>
						</Stack>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default LandingPage;