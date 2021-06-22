import { React, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import User from './User';
import Tabs from './Tabs';

import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import ByDistrict from './ByDistrict';
import ByPIN from './ByPIN';
import ByLocation from './ByLocation';
import Footer from './Footer';
import { config } from '../config/config.js';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: 'auto',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
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
        padding: theme.spacing(1, 4, 1),
    },
    address: {
        width: '48vw',
        [theme.breakpoints.down('sm')]: {
            width: '96vw',
        },
    },
    filters: {
        padding: '28px',
        paddingLeft: '0px',
        paddingRight: '0px',
    },
    chip: {
        marginRight: '1vw',
        marginTop: '4vh'
    },
    button: {
        marginRight: '1vw',
        marginTop: '3.5vh',
        height: 'fit-content',
        borderRadius: '12px'
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        marginTop: '10vh',
        marginBottom: '10vh'
    },
    notify: {
        width: '100%'
    }
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
    const [age, setAge] = useState(0);
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(60);
    const [free, setFree] = useState('');
    const [paid, setPaid] = useState('');
    const [notifier, setNotifier] = useState(false);

    const handleNotifier = () => {
        setNotifier(true);
    };

    const closeNotifier = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotifier(false);
    };

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
                centers: list,
                deviceToken: user.deviceToken
            }
        }
        //console.log(data)
        try {
            let response = await fetch(`${config.REACT_APP_URL}/api/user/notifyme`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            let res = await response.json()
            if (response.status === 201)
                handleNotifier()
            //console.log(res)
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
                <Tabs value={tab} setValue={setTab} />
                {getContent(tab)}
                {(tab !== 2) ? <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.notify}
                    onClick={handleOpen}
                >
                    Notify Me
                </Button> : <div></div>}
                <Snackbar open={notifier} autoHideDuration={6000} onClose={closeNotifier}>
                    <Alert onClose={closeNotifier} severity="success">
                        Congrats!! Your Vaccine Notifier has been  Deployed Successfully...
                    </Alert>
                </Snackbar>
            </div>
            <div>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={3} >
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
                    <Grid item xs={12} sm={6}>
                        <Chip
                            size="medium"
                            label="18+"
                            color={(age === 18) ? "primary" : "default"}
                            className={classes.chip}
                            onClick={
                                () => {
                                    if (age === 18) {
                                        setAge(0)
                                        setMinAge(0)
                                        setMaxAge(60)
                                    }
                                    else {
                                        setAge(18)
                                        setMinAge(0)
                                        setMaxAge(30)
                                    }
                                }
                            }
                        />
                        <Chip
                            size="medium"
                            label="45+"
                            color={(age === 45) ? "primary" : "default"}
                            className={classes.chip}
                            onClick={
                                () => {
                                    if (age === 45) {
                                        setAge(0)
                                        setMinAge(0)
                                        setMaxAge(60)
                                    }
                                    else {
                                        setAge(45)
                                        setMinAge(30)
                                        setMaxAge(60)
                                    }
                                }
                            }
                        />
                        <Chip
                            size="medium"
                            label="COVAXIN"
                            color={(covaxin) ? "primary" : "default"}
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
                        <Chip
                            size="medium"
                            label="COVISHIELD"
                            color={(covishield) ? "primary" : "default"}
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
                        <Chip
                            size="medium"
                            label="SPUTNIK"
                            color={(sputnik) ? "primary" : "default"}
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
                        <Chip
                            size="medium"
                            label="FREE"
                            color={(free) ? "primary" : "default"}
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
                        <Chip
                            size="medium"
                            label="PAID"
                            color={(paid) ? "primary" : "default"}
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
                    <Grid item xs={12} sm={3}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={resetList}
                        >
                            Remove All
                    </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={addAll}
                        >
                            Select All
                    </Button>
                    </Grid>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div><User postData={postData} close={handleClose} /></div>
                </Modal>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Center Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell align="right">Vaccine</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Fee</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {centers.filter(nextCenter => nextCenter.address.toLowerCase().includes(filterText.toLowerCase()) ||
                            nextCenter.name.toLowerCase().includes(filterText.toLowerCase()))
                            .filter(item =>
                                item.vaccine.includes(covaxin) && item.vaccine.includes(covishield) &&
                                item.vaccine.includes(sputnik))
                            .filter(data =>
                                data.fee_type.includes(free) && data.fee_type.includes(paid))
                            .filter(obj =>
                                obj.min_age_limit > minAge && obj.min_age_limit < maxAge)
                            .map((center, idx) => {
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
                    </TableBody>
                </Table>
                {centers.length === 0 ? <Typography variant="h5" className={classes.title} > No Centers Available </Typography> : <div></div>}
            </TableContainer>
            <Footer />
        </Container >
    );
}
