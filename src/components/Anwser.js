import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: '15px'
    }),
    button: {
        margin: theme.spacing.unit,
    },
});

function Anwser(props) {
    const classes = props.classes;
    const selectedNumbers = props.selectedNumbers;
    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                {selectedNumbers.map((number, i) =>
                    <Button onClick={() => props.unSelectNumber(number)} key={i} fab color="accent" className={classes.button}>{number}</Button>
                )}
            </Paper>
        </div>
    );
}


Anwser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Anwser);

