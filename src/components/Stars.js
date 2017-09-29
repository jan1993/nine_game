// @flow weak

import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';

const styles = {
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start'
    },
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
    // const numberOfStars = 1 + Math.floor(Math.random()*9);
    const numberOfStars = props.numberOfStars;
    const starArray = [...Array(numberOfStars).keys()];
    console.log(starArray);

    return (
        <Paper className={props.classes.paper} elevation={4}>
            <div className={props.classes.root}>
            {starArray.map(i => 
                <Icon key={i} className={props.classes.star} >stars</Icon>
            )}
            </div>
        </Paper>
    );
}

Stars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Stars);