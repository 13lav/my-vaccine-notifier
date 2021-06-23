import { React, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

//import NewMap from './newMap';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        textAlign: 'left',
        //paddingLeft: '8%'
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
    image: {
        width: '100%',
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
                <img className={classes.image} src="./HowToUse.png" ></img>
                {/* <Typography className={classes.text}>
                    - Search Centers by District/PIN.<br />
                    - Use filters to acc. to your needs.<br />
                    - Add/Remove centers to/from your notifier list.<br />
                    - Click on Notify Me, enter details.<br />
                    - *Click Allow Notifications and press Allow on popup.<br />
                    - Now click on Set Notifier and Done!<br />
                    * This Web-App notifies via the browser you use to set your Notifier.<br />
                </Typography> */}
                {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={getLocation}
                >
                    Get Your Location
                </Button> */}
                {/* <div className={classes.mapContainer}>
                    <NewMap />
                </div> */}
                {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={clickSubmit}
                >
                    Find Certers
                </Button> */}
            </form>
        </div>
    )
}

export default ByLocation

