import { React, useState } from 'react';
import states from "../metaData/states"

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import NewMap from './newMap';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(4, 0, 2),
    },
    formControl: {
        width: '100%'
    },
    mapContainer: {
        width: '50%',
        height: '60%',
        position: 'absolute',
        left: '1%'
    },
}));

const ByLocation = (props) => {
    const classes = useStyles();

    const [latLong, setLatLong] = useState({
        lat: '',
        long: ''
    })

    const getByLocation = async (latLong) => {

        try {
            let response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat=${latLong.lat}&long=${latLong.long}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let res = await response.json()
            console.log(res)
            props.setCenters(res.centers)
            return res
        } catch (err) {
            console.log(err)
        }
    }

    const getLocation = async (event) => {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatLong({
                lat: position.coords.latitude,
                long: position.coords.longitude
            })
        });
    }

    const clickSubmit = async (event) => {
        event.preventDefault();
        getByLocation(latLong)
    }

    return (
        <div className={classes.root}>
            <form className={classes.form} noValidate>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={getLocation}
                >
                    Get Your Location
                </Button>
                {/*<div className={classes.mapContainer}>
                    <NewMap />
                </div>*/}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={clickSubmit}
                >
                    Find Certers
                </Button>
            </form>
        </div>
    )
}

export default ByLocation
