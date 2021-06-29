import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
        <div>
            <Typography variant="body2" color="textSecondary">
                {'Copyright © '}
                <Link color="inherit" href="https://github.com/13lav" target="_blank" >
                    13lav
      </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {'Write to us at '}
                <Link color="secondary" href="mailto:webmaster@example.com" target="_blank" >
                    myvaccinenotifier.me@gmail.com
            </Link>
            </Typography>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],

        // [theme.breakpoints.down('sm')]: {
        //     position: "relative",
        //     bottom: 0,
        //     width: '100%',
        // },
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <footer className={classes.footer}>
                <Container maxWidth="sm" align="center">
                    <Copyright />
                </Container>
            </footer>
        </div>
    );
}

export default Footer;