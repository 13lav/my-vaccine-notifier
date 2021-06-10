import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logo: {
        width: '3em',
        height: '3em'
    },
    title: {
        flexGrow: 1,
    },
    link: {
        '&:hover': {
            textDecoration: 'none',
            color: 'inherit'
        }
    }
}));

const ButtonAppBar = (props) => {
    const classes = useStyles();

    const handleClick = () => {

    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        CoWin-NearBy
                    </Typography>
                    {/*(!props.token) ?
                        (<React.Fragment>
                            <Button color="secondary-dark">
                                <Link to="/signup" className={classes.link}>Signup</Link>
                            </Button>
                            <Button color="secondary-dark">
                                <Link to="/login" className={classes.link}>SignIn</Link>
                            </Button>
                        </React.Fragment>) :
                        (<React.Fragment>
                            <Button color="secondary-dark" onClick={handleClick} >
                                <AssignmentIndTwoToneIcon />
                            </Button>
                            <Button onClick={props.logout} color="secondary-dark">
                                <Link to="/login" className={classes.link}>Logout</Link>
                            </Button>
                        </React.Fragment>)
                    */}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ButtonAppBar;