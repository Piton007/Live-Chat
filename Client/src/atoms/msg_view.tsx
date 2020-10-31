import { Card, CardContent, Tooltip, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { FC } from "react";

export interface MsgProps {
	type: Client;
	description: string;
	releaseDate: string;
}

type Client = "host" | "foreign";

interface StyleProps {
	type: Client;
}

const useStyles = makeStyles({
	root: {
		width: "100%",
		display: "flex",
		justifyContent: ({ type }: StyleProps) =>
			type == "host" ? "flex-end" : "flex-start",

		"& >": {
			margin: "2.5px 5px",
		},
	},
	date: {
		fontSize: ".7rem",
	},
	msg_box: {
		backgroundColor: ({ type }: StyleProps) =>
			type == "host" ? "#dcf8c6" : "#34B7F1",
		width: "25vw",
		
		fontSize: "1rem",
		
	},
	msg_content:{
		width:'100%',
		overflowWrap:'break-word'
	}
});

export const HostMsg: FC<MsgProps> = function HostMsg({
	type,
	description,
	releaseDate,
}: MsgProps) {
	const classes = useStyles({ type });

	return (
		<div className={classes.root}>
			<Card className={classes.msg_box}>
				<CardContent className={classes.msg_content}>
					<Typography className={classes.date}>
						{releaseDate}
					</Typography>
					
					<Typography style={{height:'auto'}} >
						{description}
					</Typography>
				</CardContent>
			</Card>
		</div>
		
	);
};
