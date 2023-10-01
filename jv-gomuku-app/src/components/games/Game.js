import { BOARD_SIZE } from "./consts";
import { checkWin } from "./utils";

import React from "react";

class Game extends React.Component {
  constructor(props) {
    super(props);
    let boardSize = localStorage.getItem("boardSize");
    console.log(boardSize);
    if (boardSize == null) {
      boardSize = BOARD_SIZE;
    }

    // initiate area
    var area = new Array(boardSize);
    for (var i = 0; i < boardSize; i++) {
      area[i] = new Array(boardSize);
      for (var j = 0; j < boardSize; j++) {
        area[i][j] = 0;
      }
    }
    // game state
    this.state = {
      blackStone: true,
      gameOver: false,
      gameState: "Next: Black Stone *",
      currValue: -1, // black - O, white - 1
      area: area,
      boardSize: boardSize,
    };

    // functions
    this.init = this.init.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleLeaveGame = this.handleLeaveGame.bind(this);
  }
  /* eslint-disable */
  handleMouseDown(event) {
    var message = document.getElementById("message");
    var player = document.getElementById("player");
    if (this.state.gameOver) {
      if (message != null) {
        message.innerHTML = "Status - Game Over";
      }
      return;
    }

    if (message != null) {
      message.innerHTML = "Status - Inprogress";
    }
    var cell = event.target;

    // check class exist in the div element
    if (cell.firstChild.classList.contains("boardCellBlack")) return "";
    if (cell.firstChild.classList.contains("boardCellWhite")) return "";
    var indexes = cell.firstChild.id.split("-");

    this.setState({ currValue: this.state.currValue * -1 });
    cell.firstChild.className = deserve(this.state.currValue);
    this.state.area[indexes[0]][indexes[1]] = this.state.currValue;
    function deserve(val) {
      if (val === 1) {
        // get element player
        var player = document.getElementById("player");
        if (player != null) {
          player.innerHTML = "Active Player: White";
        }
        return "boardCellBlack";
      } else {
        player = document.getElementById("player");
        if (player != null) {
          player.innerHTML = "Active Player: Black";
        }
        return "boardCellWhite";
      }
    }
    let winState = checkWin(indexes[0], indexes[1], this.state.area);
    if (winState !== "") {
      message = document.getElementById("message");
      if (message != null) {
        //gameOver = true;
        this.setState({
          gameOver: true,
          gameState: winState,
        });
        if (message != null) {
          message.innerHTML = "Status - Game Over";
        }
        if (winState === "White Wins") {
          //message.addClass("looseState");
          if (player != null) {
            player.innerHTML = "Player: White Wins";
          }
          message.innerHTML = "Status - Game Over";
        } else {
          if (player != null) {
            player.innerHTML = "Player: Black Wins";
          }
        }
      }
    }
  }

  init() {
    let board = document.getElementById("goBoard");
    board.className = "board";
    board.id = "board";
    board.style.width = "700px";
    board.style.height = "700px";

    for (let rindex = 0; rindex < this.state.boardSize; rindex++) {
      let row = document.createElement("div");

      row.className = "boardRow";
      for (let cindex = 0; cindex < this.state.boardSize; cindex++) {
        let boardCol = document.createElement("div");
        boardCol.className = "boardCol";
        boardCol.addEventListener("mousedown", this.handleMouseDown);

        let cell = document.createElement("div");
        cell.className = "boardCell";
        cell.id = rindex + "-" + cindex;
        boardCol.appendChild(cell);
        row.appendChild(boardCol);
      }
      board.appendChild(row);
    }

    //number array number[0] - row, number[1] - column
    //initiate area

    let reset = document.getElementById("newGame");
    if (reset != null) reset.addEventListener("click", this.handleNewGame);

    let leaveGame = document.getElementById("leaveGame");
    if (leaveGame != null)
      leaveGame.addEventListener("click", this.handleLeaveGame);
  }

  handleLeaveGame(event) {
    if (this.state.gameOver) {
      let historyData = {
        gameId: 1,
        winner: this.state.gameState,
        date: new Date().toLocaleString(),
        boardSize: this.state.boardSize,
        area: this.state.area,
      };
      console.log(JSON.stringify([historyData]));
      let history = localStorage.getItem("history");
      if (history == null) {
        localStorage.setItem("history", JSON.stringify([historyData]));
      } else {
        let items = Array.from(JSON.parse(history));
        historyData.gameId = items.length + 1;
        localStorage.setItem(
          "history",
          JSON.stringify(items.concat([historyData]))
        );
      }
    }
    window.location = "games";
  }
  handleNewGame(event) {
    var message = document.getElementById("message");
    var player = document.getElementById("player");
    //remove class from all cells
    let items = Array.from(document.querySelectorAll("[class$=White]"));
    items.map((cell) => {
      if (cell != null) {
        cell.className = "boardCell";
      }
    });
    items = Array.from(document.querySelectorAll("[class$=Black]"));
    items.map((cell) => {
      if (cell != null) {
        cell.className = "boardCell";
      }
    });
    if (player != null) {
      player.innerHTML = "Active Player: Black";
    }
    if (message != null) {
      message.innerHTML = "Status: New Game";
    }

    //initiate area
    var area = new Array(this.state.boardSize);
    for (var i = 0; i < this.state.boardSize; i++) {
      area[i] = new Array(this.state.boardSize);
      for (var j = 0; j < this.state.boardSize; j++) {
        area[i][j] = 0;
      }
    }
    this.state = {
      blackStone: true,
      gameOver: false,
      gameState: "Next: Black Stone *",
      currValue: -1, // black  -1, white  1
      area: area,
    };
  }
  componentDidMount() {
    this.init();
  }

  render() {
    return (
      <div className="game">
        <div className="messages">
          <div className="">
            <div className="messages" id="message">
              Status: New Game
            </div>
            <div className="messages" id="player">
              Active player: Black turns...
            </div>
          </div>
        </div>
        <div>
          <div>
            <button className="newGame" id="newGame">
              Reset Game
            </button>{" "}
            <button className="leaveGame" id="leaveGame">
              Leave
            </button>
          </div>
        </div>
        <div className="game-board">
          <div className="goBoard" id="goBoard" />
        </div>
      </div>
    );
  }
}

export default Game;
