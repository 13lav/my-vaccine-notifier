import { React, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import { useHistory } from "react-router-dom";
// import { connect } from 'react-redux';
// import { loginCheck } from '../redux/actionCreators';
// import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        padding: '1%',
        marginTop: '5%'
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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

const Login = (props) => {
    const classes = useStyles();
    //const history = useHistory()

    const [values, setValues] = useState({
        email: '',
        name: ''
    })

    const regex = {
        email: '^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$',
        password: '(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$'
    }

    const [errorText, setErrorText] = useState({
        email: '',
        password: ''
    })

    const validateInput = (name, input) => {
        if (name === 'email') {
            if (!input.match(regex.email))
                setErrorText({ ...errorText, [name]: 'Invalid Email Id' })
            else setErrorText({ ...errorText, [name]: '' })
        }
        if (name === 'password') {
            if (!input.match(regex.password))
                setErrorText({ ...errorText, [name]: 'Password must be Alphanumeric, Min. Length 6' })
            else setErrorText({ ...errorText, [name]: '' })
        }
    }


    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
        validateInput(name, event.target.value)
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }

        // props.loginCheck(user, function (token) {
        //     localStorage.setItem('token', token);
        //     //history.push("/")
        // })
        console.log(values)
        props.postUser(values)
    }

    return (
        <Container container component="main" className={classes.root} component={Paper} elevation={6} square>

            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Mailing Details
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
                        error={errorText.password}
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
                        autoFocus
                        error={errorText.email}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={clickSubmit}
                        disabled={(errorText.password || errorText.email) ? "true" : ""}
                    >
                        Set Notifier
                        </Button>
                </form>
            </div>
        </Container>
    );
}

export default Login;