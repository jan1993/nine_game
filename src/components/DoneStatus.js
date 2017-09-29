// @flow weak

import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {
    star: {
        marginLeft: '5px',
        marginRight: '5px',
        marginBottom: '5px',
        marginTop: '5px',
        fontSize: 30
    },
    paper: {
        padding: '15px'

    }
};



function Stars(props) {

    const doneStatus = props.doneStatus;


    return (
        <Paper className={props.classes.paper} elevation={4}>            
                {doneStatus}   
                 <Button>Retry</Button>

        </Paper>
    );
}

Stars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Stars);