import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    button: {
        margin: theme.spacing.unit,
    },
});

function Numbers(props) {
    const classes = props.classes;
    const selectedNumbers = props.selectedNumbers;
    const usedNumbers = props.usedNumbers;

    const btnColor = (number) => {
        if(selectedNumbers.indexOf(number) >= 0) {
            return "accent";
        }
        return "primary";
    }

    const btnEnabled = (number) => {
        return usedNumbers.indexOf(number) >= 0;
    }

    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                {Numbers.list.map((number, i) =>
                    <Button 
                        onClick={() => props.selectNumber(number)} key={i} 
                        fab 
                        color={btnColor(number)} 
                        className={classes.button}
                        disabled={btnEnabled(number)}
                    >
                        {number}
                    </Button>
                )}

                {/* <Button disabled fab color="accent" className={classes.button}>1</Button> */}
            </Paper>
        </div >
    );
}

Numbers.list = [...Array(10).keys()].slice(1,10);


Numbers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Numbers);


