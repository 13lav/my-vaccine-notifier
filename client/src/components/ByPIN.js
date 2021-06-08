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
            let response = await fetch(`http://localhost:4000/api/centers/byPincode/${pin}`, {
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

export default ByPIN

