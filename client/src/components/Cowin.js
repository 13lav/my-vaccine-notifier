import { React, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import User from './User';
import Tabs from './Tabs';
import states from "../metaData/states"

import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';

import ByDistrict from './ByDistrict';
import ByPIN from './ByPIN';
import ByLocation from './ByLocation';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: 'auto',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        width: '100%'
    },
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    address: {
        width: '48vw'
    },
}));

export default function Cowin() {
    const classes = useStyles();

    const [centers, setCenters] = useState([]);

    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState(0);
    const [filterText, setFilterText] = useState('');
    const [covaxin, setCovaxin] = useState('');
    const [covishield, setCovishield] = useState('');
    const [sputnik, setSputnik] = useState('');
    const [age18, setAge18] = useState('');
    const [age45, setAge45] = useState('');
    const [free, setFree] = useState('');
    const [paid, setPaid] = useState('');

    const getContent = (id) => {
        switch (id) {
            case 0: return <ByDistrict setCenters={setCenters} />;
            case 1: return <ByPIN setCenters={setCenters} />;
            case 2: return <ByLocation setCenters={setCenters} />;
            default: break;
        }
    }

    const postData = async (user) => {
        const data = {
            data: {
                name: user.name,
                email: user.email,
                centers: list
            }
        }

        try {
            let response = await fetch('http://localhost:4000/api/user/notifyme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            let res = await response.json()
            console.log(res)
            return res
        } catch (err) {
            console.log(err)
        }

    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFilter = event => {
        setFilterText(event.target.value)
    }

    const addToList = (id) => {
        const currentIndex = list.indexOf(id);
        const newList = [...list];

        if (currentIndex === -1) {
            newList.push(id);
        } else {
            newList.splice(currentIndex, 1);
        }

        setList(newList)
        console.log(list)
    }

    const addAll = () => {
        const newList = [];

        centers.forEach(center => {
            newList.push(center._id)
        })

        setList(newList)
        console.log(list)
    }

    const resetList = () => {
        const newList = [];
        setList(newList)
        console.log(list)
    }

    return (
        <Container component="main" >
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    CoWin NearBy
                </Typography>
                <Tabs value={tab} setValue={setTab} />
                {getContent(tab)}
            </div>
            <div>
                <Grid container spacing={2} className={classes.container} >
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            name="filter"
                            label="Filter"
                            type="filter"
                            id="filter"
                            fullWidth
                            onChange={handleFilter}
                            value={filterText}
                        />
                    </Grid>
                    {/* <Grid item xs={12} sm={4}>
                        <Grid container spacing={2} className={classes.container} >
                            <Grid item xs={12} sm={4}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={resetList}
                                >
                                    Reset
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={addAll}
                                >
                                    Add All
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleOpen}
                                >
                                    Notify Me
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid> */}
                    <Grid item xs={12} sm={8}>
                        <Grid container spacing={1} className={classes.container} >
                            <Grid item xs={12} sm={1}>
                                <Chip
                                    size="large"
                                    label="18+"
                                    color={(age18) ? "primary" : ""}
                                    className={classes.chip}
                                    onClick={
                                        () => {
                                            if (age18)
                                                setAge18('')
                                            else {
                                                setAge45('')
                                                setAge18('18')
                                            }
                                        }
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <Chip
                                    size="large"
                                    label="45+"
                                    color={(age45) ? "primary" : ""}
                                    className={classes.chip}
                                    onClick={
                                        () => {
                                            if (age45)
                                                setAge45('')
                                            else {
                                                setAge45('45')
                                                setAge18('')
                                            }
                                        }
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Chip
                                    size="large"
                                    label="COVAXIN"
                                    color={(covaxin) ? "primary" : ""}
                                    className={classes.chip}
                                    onClick={
                                        () => {
                                            if (covaxin)
                                                setCovaxin('')
                                            else {
                                                setCovaxin('COVAXIN')
                                                setCovishield('')
                                                setSputnik('')
                                            }
                                        }
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Chip
                                    size="large"
                                    label="COVISHIELD"
                                    color={(covishield) ? "primary" : ""}
                                    className={classes.chip}
                                    onClick={
                                        () => {
                                            if (covishield)
                                                setCovishield('')
                                            else {
                                                setCovaxin('')
                                                setCovishield('COVISHIELD')
                                                setSputnik('')
                                            }
                                        }
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Chip
                                    size="large"
                                    label="SPUTNIK"
                                    color={(sputnik) ? "primary" : ""}
                                    className={classes.chip}
                                    onClick={
                                        () => {
                                            if (sputnik)
                                                setSputnik('')
                                            else {
                                                setCovaxin('')
                                                setCovishield('')
                                                setSputnik('SPUTNIK')
                                            }
                                        }
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Chip
                                    size="large"
                                    label="FREE"
                                    color={(free) ? "primary" : ""}
                                    className={classes.chip}
                                    onClick={
                                        () => {
                                            if (free)
                                                setFree('')
                                            else {
                                                setFree('Free')
                                                setPaid('')
                                            }
                                        }
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Chip
                                    size="large"
                                    label="PAID"
                                    color={(paid) ? "primary" : ""}
                                    className={classes.chip}
                                    onClick={
                                        () => {
                                            if (paid)
                                                setPaid('')
                                            else {
                                                setFree('')
                                                setPaid('Paid')
                                            }
                                        }
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <User postUser={postData} />
                </Modal>
            </div>
            <List>
                {centers.filter(nextCenter => nextCenter.address.toLowerCase().includes(filterText.toLowerCase()) ||
                    nextCenter.name.toLowerCase().includes(filterText.toLowerCase()))
                    .filter(item =>
                        item.vaccine.includes(covaxin) && item.vaccine.includes(covishield) && item.vaccine.includes(sputnik)).map((center, idx) => {
                            return <TableRow key={center.id}>
                                <TableCell>{center.name}</TableCell>
                                <TableCell className={classes.address} >{center.address}</TableCell>
                                <TableCell align="right">{center.vaccine}</TableCell>
                                <TableCell align="right">{center.min_age_limit}</TableCell>
                                <TableCell align="right">{center.fee_type}</TableCell>
                                <TableCell>
                                    {list.includes(center._id) ? <Button color="secondary" onClick={() => { addToList(center._id) }} >Remove</Button> : <Button color="primary" onClick={() => { addToList(center._id) }} >Add</Button>}</TableCell>
                            </TableRow>
                        })
                }
            </List>
        </Container >
    );
}

/***
 *
 ) &&
                        item.vaccine.includes(age18) &&
                        item.vaccine.includes(age45) &&
                        item.vaccine.includes(free) &&
                        item.vaccine.includes(paid
 */