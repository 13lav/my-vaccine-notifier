import { React, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { requestFirebaseNotificationPermission, onMessageListener } from '../firebaseInit'

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '1%',
        marginTop: '20%',
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginTop: '33%',
        },
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(3, 3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        padding: '0px',
        width: '100%',
    },
}));

const User = (props) => {
    const classes = useStyles();
    //const history = useHistory()

    const [values, setValues] = useState({
        email: '',
        name: '',
        deviceToken: ''
    })

    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({ title: '', body: '' });
    const [isTokenFound, setTokenFound] = useState(false);

    const getToken = () => {

        requestFirebaseNotificationPermission(setTokenFound)
            .then((firebaseToken) => {
                //console.log('Device Token Found', firebaseToken);
                setValues({ ...values, deviceToken: firebaseToken })
            })
            .catch((err) => {
                return err;
            });

        onMessageListener().then(payload => {
            setShow(true);
            setNotification({ title: payload.notification.title, body: payload.notification.body })
            console.log(payload);
        }).catch(err => console.log('failed: ', err));


    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        //console.log(props.deviceToken)
        if (values.deviceToken)
            props.postData(values)
        else {
            setValues({ ...values, deviceToken: 'wait' })
            getToken()
        }
    }

    return (
        <Container container className={classes.root} component={Paper} elevation={6} square>

            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Notifier Details
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="Name"
                        type="name"
                        id="name"
                        onChange={handleChange('name')}
                        value={values.name}
                        autoComplete="current-name"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        onChange={handleChange('email')}
                        value={values.email}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    {(!values.deviceToken) ?
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={clickSubmit}
                        >
                            Allow Notifications
                        </Button> :
                        (values.deviceToken === 'wait') ?
                            <Button
                                //type="submit"
                                fullWidth
                                variant="contained"
                                //color={(values.deviceToken === 'wait') ? 'secondary' : 'primary'}
                                className={classes.submit}
                                //onClick={clickSubmit}
                                disabled='true'
                            >
                                Loading...
                        </Button> :
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color='primary'
                                className={classes.submit}
                                onClick={clickSubmit}
                            //disabled={(values.deviceToken === 'wait') ? 'false' : 'true'}
                            >
                                Set Notifier
                        </Button>
                    }
                </form>
            </div>
        </Container>
    );
}

export default User;