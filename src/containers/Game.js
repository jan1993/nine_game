import React, { Component } from 'react';

import Grid from 'material-ui/Grid';

import GameHeader from '../components/GameHeader';
import Stars from '../components/Stars';
import GameButton from '../components/GameButton';
import Anwser from '../components/Anwser';
import Numbers from '../components/Numbers';
import DoneStatus from '../components/DoneStatus';

var possibleCombinationSum = function (arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount; i++) {
    var combinationSum = 0;
    for (var j = 0; j < listSize; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

class Game extends Component {

  static randomNumber = () => {
    return 1 + Math.floor(Math.random() * 9);
  }

  state = {
    selectedNumbers: [],
    numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    redraws: 5,
    doneStatus: null,
  };

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) return;
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }))
  };

  unSelectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }))
  };

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.numberOfStars ===
      prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }))
  };

  acceptAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      numberOfStars: Game.randomNumber(),
    }), () => {
      this.updateDoneStatus();
    });
    
  }

  redraw = () => {
    if (this.state.redraws <= 0) return;
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: [],
      numberOfStars: Game.randomNumber(),
      redraws: prevState.redraws - 1
    }), () => {
      this.updateDoneStatus();
    })
  }

  possibleSolutions = ({ numberOfStars, usedNumbers }) => {
    const possibleNumbers = [...Array(10).keys()].slice(1, 10).filter(number =>
      usedNumbers.indexOf(number) === -1
    );

    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: 'DONE!' }
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: 'GAME OVER!' }
      }
    })
  }

  render() {
    const { selectedNumbers, usedNumbers, numberOfStars, answerIsCorrect, redraws, doneStatus } = this.state;
    return (
      <div>
        <GameHeader />
        <div style={{
          flexGrow: 1,
          marginTop: 50,
          marginLeft: 25,
          marginRight: 25
        }}>
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <Stars numberOfStars={numberOfStars} />
            </Grid>
            <Grid item xs={4}>
              <GameButton selectedNumbers={selectedNumbers}
                answerIsCorrect={answerIsCorrect}
                checkAnswer={this.checkAnswer}
                acceptAnswer={this.acceptAnswer}
                redraw={this.redraw}
                redraws={redraws}
              />
            </Grid>
            <Grid item xs={4}>
              <Anwser selectedNumbers={selectedNumbers}
                unSelectNumber={this.unSelectNumber} />
            </Grid>
            <Grid item xs={12}>
              {doneStatus ? <DoneStatus doneStatus={doneStatus} /> :
                <Numbers selectedNumbers={selectedNumbers}
                  usedNumbers={usedNumbers}
                  selectNumber={this.selectNumber} />
              }
            </Grid>
          </Grid>
        </div>
      </div >
    );
  }
}

export default Game;
