import React from 'react';
import Paper from 'material-ui/Paper';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: '15px',
    }),
});

function GameButton(props) {
    const classes = props.classes;
    const redraws = props.redraws;

    let btn;
    switch (props.answerIsCorrect) {
        case true:
            btn = <Button onClick={props.acceptAnswer} disabled={props.selectedNumbers.length === 0} raised className={classes.button}>RIGHT</Button>
            break;
        case false:
            btn = <Button disabled={props.selectedNumbers.length === 0} raised className={classes.button}>WRONG</Button>
            break;
        default:
            btn = <Button onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0} raised className={classes.button}>Check</Button>
            break;
    }

    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                {props.answerIsCorrect}
                {btn}
                <Button color="accent" onClick={props.redraw} disabled={redraws === 0}>RE {redraws}</Button>
            </Paper>
        </div>
    );
}

GameButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameButton);

