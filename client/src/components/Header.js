import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import IconButton from '@material-ui/core/IconButton';
//import LinkedInIcon from '@material-ui/icons/LinkedIn';
//import GitHubIcon from '@material-ui/icons/GitHub';
//import MailOutlineIcon from '@material-ui/icons/MailOutline';
//import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logo: {
        width: '1.5em',
        height: '1.5em'
    },
    title: {
        flexGrow: 1,
    },
    link: {
        '&:hover': {
            textDecoration: 'none',
            color: 'inherit'
        }
    },
    icons: {
        position: 'absolute',
        zIndex: 1,
        right: theme.spacing(2),
        margin: '0 auto',
    },
}));

const ButtonAppBar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={0} >
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        MyVaccineNotifier
                        {/* <img className={classes.logo} src="./logo.png" alt="logo" /> */}
                    </Typography>
                    <div className={classes.icons}>
                        {/*<IconButton href="https://github.com/13lav" color="inherit">
                            <GitHubIcon />
                        </IconButton>
                         <IconButton href="https://github.com/13lav" color="inherit">
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            href="https://github.com/13lav"
                            aria-haspopup="true"
                            //onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <MailOutlineIcon />
                        </IconButton> */}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ButtonAppBar;