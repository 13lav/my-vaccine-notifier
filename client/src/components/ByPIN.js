import { React, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { config } from '../config/config.js';

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
}));

const ByPIN = (props) => {
    const classes = useStyles();

    const [pin, setPin] = useState(110001)

    const handleChange = event => {
        setPin(event.target.value)
    }

    const getByPIN = async (pin) => {

        try {
            let response = await fetch(`${config.REACT_APP_URL}/api/centers/byPincode/${pin}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let res = await response.json()
            console.log(res)
            props.setCenters(res.data)
            return res
        } catch (err) {
            console.log(err)
        }
    }

    const clickSubmit = async (event) => {
        event.preventDefault();
        getByPIN(pin)
    }

    return (
        <div className={classes.root}>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="pin"
                    label="PIN Code"
                    type="pin"
                    id="pin"
                    onChange={handleChange}
                    value={pin}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={clickSubmit}
                >
                    Find Centers
                </Button>
            </form>
        </div>
    )
}

export default ByPIN

