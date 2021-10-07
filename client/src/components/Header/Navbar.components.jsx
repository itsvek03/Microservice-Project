import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom"
import { useLoginContext } from '../../contexts/Login.Provider'
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    navTitle: {
        flexGrow: 9,
        fontWeight: "bolder",
    },
}));

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function ElevateAppBar(props) {
    const classes = useStyles();
    console.log("USER CONTEXT", useLoginContext())
    const { details, setDetails } = useLoginContext();
    const history = useHistory();
    const logout = () => {
        localStorage.removeItem('user');
       setDetails(false);
        history.push('/login')
    }
    return (
        <>
            <CssBaseline />
            <ElevationScroll {...props}>
                <div className={classes.root}>
                    <AppBar>
                        <Toolbar>

                            <Typography className={classes.navTitle} variant="h6" href="/">
                                <NavLink to="/">
                                    Product Management
                                </NavLink>
                            </Typography>



                            {details ? (
                                <>
                                    <Typography variant="h6">{details.email}</Typography>
                                    <Button variant="outlined" color="secondary" onClick={logout}>
                                        Logout
                                    </Button>
                                </>

                            ) :
                                <div className="m-3">
                                    <Link to="/login">

                                        <Button variant="outlined" color="secondary" className="m-3">
                                            Login
                                        </Button>

                                    </Link>

                                    <Link to="/signup">
                                        <Button variant="outlined" color="secondary" className="m-3">
                                            Signup
                                        </Button>
                                    </Link>
                                </div>
                            }


                        </Toolbar>
                    </AppBar>
                </div>
            </ElevationScroll>
            <Toolbar />

        </>
    );
}
