import React from "react";
import { getGameById  } from "../../helpers/http";

class GameRO extends React.Component {
  constructor(props) {
    super(props);

    const gameId = props.id;
    console.log(gameId);
    this.state = {"gameId": gameId};
    // functions
    this.init = this.init.bind(this);
  }

  async init() {

    let historyData = await getGameById(this.state.gameId);
    console.log(JSON.stringify(historyData));
    if (historyData === undefined) {
      this.setState({});
    } else {
      // game state
      this.state = {
        blackStone: true,
        gameOver: true,
        gameState: historyData.winner,
        currValue: -1, // black - O, white - 1
        area: historyData.board,
        boardSize: historyData.boardSize,
      };
    }

    let board = document.getElementById("goBoard");
    board.className = "board";
    board.id = "board";
    board.style.width = "700px";
    board.style.height = "700px";

    for (let rindex = 0; rindex < this.state.boardSize; rindex++) {
      let row = document.createElement("div");
        //alert(JSON.stringify(this.state.area));
      row.className = "boardRow";
      for (let cindex = 0; cindex < this.state.boardSize; cindex++) {
        let boardCol = document.createElement("div");
        boardCol.className = "boardCol"; //default -1

        let cell = document.createElement("div");
        cell.className = "boardCell";

        if (this.state.area[rindex][cindex] === 0) {
          cell.className = "boardCell";
        } else if (this.state.area[rindex][cindex] === 1) {
          cell.className = "boardCellBlack";         
        }else {
          cell.className = "boardCellWhite";
        }
        cell.id = rindex + "-" + cindex;
        boardCol.appendChild(cell);
        row.appendChild(boardCol);
      }
      board.appendChild(row);
    }

    //number array number[0] - row, number[1] - column
    //initiate area
    let message = document.getElementById("message");
    if (message != null) {
      message.innerHTML =  this.state.gameState;
    }
  }

  async componentDidMount() {
    if(this.state.gameId != null){
      await this.init();
    }
    let backButton = document.getElementById("back");
    if (backButton != null)
    backButton.addEventListener("click", this.handleBack);
  }

  handleBack = () => {
      window.location = "/games";
  }
  render() {
    return (
      <div className="game">
        <div className="messages">
          <div className="">
            <div className="messages" id="message">              
            </div>
          </div>
        </div>
        <div >
          <div>
            <button className="back" id="back" >
              Back
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

export default GameRO;
