import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';


export default function SubjectCard({image, title, description, onClick, bookmarked, id, toggleBookmark}) {
	return (
		<Card sx={{ minWidth: 300, margin: 1 }}>
			<CardMedia
				sx={{ height: 140 }}
				image={image}
				title={title}
				onClick={() => onClick(id)}
			/>
			<Stack container flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
				<Stack item>
					<CardContent sx={{ marginBottom: -2 }}>
						<Typography variant="caption" color="text.secondary">
							{description}
						</Typography>
						<Typography gutterBottom variant="body1" component="div">
							{title}
						</Typography>
					</CardContent>
				</Stack>
				<Stack item>
					<CardActions>
						<IconButton onClick={() => toggleBookmark(id, bookmarked)}>
							{
								bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />
							}
						</IconButton>
					</CardActions>
				</Stack>
			</Stack>
		</Card>
	);
}