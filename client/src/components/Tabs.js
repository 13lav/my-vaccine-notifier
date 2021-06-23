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
    label: {
        fontWeight: '900'
    }
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
                <Tab className={classes.label} label="By District" />
                <Tab className={classes.label} label="How to use" />
                <Tab className={classes.label} label="By PINCode" />
            </Tabs>
        </Paper>
    );
}
