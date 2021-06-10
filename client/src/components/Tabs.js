import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: '100%'
    },
});

export default function MenuTabs(props) {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        props.setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
            <Tabs
                value={props.value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="By District" />
                <Tab label="By PIN" />
                <Tab label="By Location" />
            </Tabs>
        </Paper>
    );
}
