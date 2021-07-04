import { React, useState } from 'react';
import states from "../data/states"

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { config } from '../config/config.js';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3.5),
    },
    submit: {
        margin: theme.spacing(4, 0, 2),
    },
    formControl: {
        width: '100%'
    },
    container: {
        marginTop: '2%',
        marginBottom: '2%',
    }
}));

const ByDistrict = (props) => {
    const classes = useStyles();

    const [state, setState] = useState({ districts: [] });
    const [district, setDistrict] = useState('Select District');
    const [loading, setLoading] = useState(false)


    const handleState = (event) => {
        var selectedState = states[event.target.value]
        setState(selectedState);
    };

    const handleDistrict = (event) => {
        var selectedDistrict = state.districts[event.target.value]
        setDistrict(selectedDistrict);
        console.log(district, event.target.value)
    };


    const getByDistrict = async (district) => {

        try {
            let response = await fetch(`${config.REACT_APP_URL}/api/centers/byDistrict/${district.district_name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let res = await response.json()
            console.log(res)
            props.setCenters(res.data)
            setLoading(false)
            return res
        } catch (err) {
            console.log(err)
        }
    }


    const clickSubmit = async (event) => {
        event.preventDefault();
        getByDistrict(district)
        setLoading(true)
    }

    return (
        <div className={classes.root}>

            <form className={classes.form} noValidate>
                <Grid container spacing={2} className={classes.container} >
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes.formControl} >
                            <InputLabel id="select-label">Select State</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select-state"
                                defaultValue=""
                                value={state.state_name}
                                onChange={handleState}
                                name="selectedState"
                                elevation={0}
                            >
                                {
                                    states.map((state, idx) => {
                                        return (
                                            <MenuItem
                                                key={idx}
                                                value={idx}
                                                id={state.state_id}
                                                name={state.state_id}
                                            >
                                                {state.state_name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-label">Select District</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select-district"
                                defaultValue=""
                                value={district.district_name}
                                onChange={handleDistrict}
                                name="selectedDistrict"
                            >
                                {
                                    state.districts.map((district, idx) => {
                                        //console.log(state.state_name)
                                        return <MenuItem
                                            key={idx}
                                            value={idx}
                                            //label={state.state_name}
                                            id={idx}
                                        >
                                            {district.district_name}
                                        </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color={(loading) ? "primary" : "secondary"}
                    className={classes.submit}
                    onClick={clickSubmit}
                >
                    {(loading) ? 'Finding...' : 'Find Centers'}
                </Button>
            </form>
        </div>
    )
}

export default ByDistrict
