import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props){
  super(props);
  const best = localStorage.getItem("best");

  this.state = {
    score: 0,
    bestScore: best ? best : 0,
    numbers: [
      {
        content: "un",
        wasViewed: false,
        color: this.randomHEX(),
      },
      {
        content: "deux",
        wasViewed: false,
        color: this.randomHEX(),
      },
      {
        content: "trois",
        wasViewed: false,
        color: this.randomHEX(),
      },
      {
        content: "quatre",
        wasViewed: false,
        color: this.randomHEX(),
      },
      {
        content: "cinque",
        wasViewed: false,
        color: this.randomHEX(),
      },
      {
        content: "six",
        wasViewed: false,
        color: this.randomHEX(),
      },
      {
        content: "sept",
        wasViewed: false,
        color: this.randomHEX(),
      },
      {
        content: "huite",
        wasViewed: false,
        color: this.randomHEX(),
      },
      {
        content: "neuf",
        wasViewed: false,
        color: this.randomHEX(),
      },
      {
        content: "dix",
        wasViewed: false,
        color: this.randomHEX(),
      },
    ],
  };
  this.checkScore = this.checkScore.bind(this);
  this.randomizeNumbers = this.randomizeNumbers.bind(this);
  }
  randomHEX() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }

  flashCongratulations() {
    const congrats = document.getElementById("congratulations");
    congrats.classList.toggle("show-congrats");
    setTimeout(() => congrats.classList.toggle("show-congrats"), 5000);
  }
  checkScore(item, answer) {
    let tempArray = this.randomizeNumbers();
    if (item.wasViewed === answer) {
      let incrementedScore = this.state.score + 1;
    if (incrementedScore === 10) {
        this.flashCongratulations();

        localStorage.setItem("best", incrementedScore);
        this.setState({
          score: 0,
          bestScore: incrementedScore,
          numbers: tempArray,
        });
      } else {
        tempArray.forEach((num) => {
          if (num.content == item.content) {
            num.wasViewed = true;
          }
        });
        const newBest =
          this.state.bestScore > incrementedScore
            ? this.state.bestScore
            : incrementedScore;

        localStorage.setItem("best", newBest);

        this.setState({
          score: incrementedScore,
          bestScore: newBest,
          numbers: tempArray,
        });
      }
    } else {
      tempArray.forEach((item) => {
        item.wasViewed = false;
      });
      this.setState({
        score: 0,
        bestScore:
          this.state.bestScore > this.state.score
            ? this.state.bestScore
            : this.state.score,
        numbers: tempArray,
      });
    }
  }

  randomizeNumbers() {
    let array = this.state.numbers;
    let index = this.state.numbers.length,
      temporaryIndex,
      randomIndex;

    while (0 !== index) {
      randomIndex = Math.floor(Math.random() * index);
      index -= 1;

      temporaryIndex = array[index];
      array[index] = array[randomIndex];
      array[index].color = this.randomHEX();
      array[randomIndex] = temporaryIndex;
      array[randomIndex].color = this.randomHEX();
    }

    return array;
  }

  componentDidMount() {
    let array = this.randomizeNumbers();
    this.setState({ numbers: array });
  }

  render() {
    const randomIndex = Math.floor(Math.random() * this.state.numbers.length);
    const selectedNum = this.state.numbers[randomIndex];
    return (
      <main className="App">
        <header className="App-header">
          <h1>React Memory Game</h1>
          <p>
            Objective: Answer the questions to test your memory.<br></br>
            Highest score is 10!
          </p>
          <div className="App-scoreboard">
            <span>Score: {this.state.score}</span>
            <span>Best Score: {this.state.bestScore}</span>
          </div>
        </header>
        <section className="App-container">
          <Congratulations />
          <div className="App-item-container">
            <GameItem value={selectedNum} />
            <div>
              <h3>Have you seen this number yet?</h3>
              <button
                id="no"
                className="btn"
                onClick={() => this.checkScore(selectedNum, false)}
              >
                No
              </button>
              <button
                id="yes"
                className="btn"
                onClick={() => this.checkScore(selectedNum, true)}
              >
                Yes
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default App;
