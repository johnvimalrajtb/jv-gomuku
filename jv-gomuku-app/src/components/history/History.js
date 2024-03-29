import React from "react";
import { getGameHistory } from "../../helpers/http";

class History extends React.Component {
  constructor(props) {
    super(props);
    let history = null;
    this.state = {
      history: history,
    };
  }

  async init() {
    //set state to history
    this.setState({ history: await getGameHistory() });
  }

  gameList(history) {
    for (var i = 0; i < history.length; i++) {
      console.log(history[i].gameId);
      console.log(history[i].winner);
      console.log(history[i].date);
      console.log(history[i].boardSize);
      console.log(history[i].board);
    }
    return history;
  }

  async componentDidMount() {
    await this.init();
  }
  /**
   * 
   * @returns       let historyData = {
        gameId: this.state.history.length + 1,
        winner: this.state.gameState,
        date: new Date().toLocaleString(),
        boardSize: this.state.boardSize,
        area: this.state.area,
      }
   */
  openGameLog(gameId) {
    window.location = "game-log/:" + { gameId };
  }
  /**
   *
   * @returns render
   */
  render() {
    const emptyMessage = <p>There are no previous games played yet.</p>;
    let history = this.state.history;
    if (history == null) {
      return emptyMessage;
    } else {
      let items = history;
      return (
        <div className="game" id="history">
          <div className="App">
            <table>
              <tr>
                <th>Game ID</th>
                <th>Date</th>
                <th>Winner</th>
                <th>Board Size</th>
                <th>Action</th>
              </tr>
              {items.map((val) => {
                return (
                  <tr key={val.gameId}>
                    <td>#{val.gameId}</td>
                    <td>{val.date}</td>
                    <td>{val.winner}</td>
                    <td>{val.boardSize}</td>
                    <td>
                      <a href={"/game-log/" + val.gameId}> View game log</a>
                      {/* <button className="leaveGame" id="leaveGame" 
                      onClick={this.openGameLog(val.gameId)}>
                      View game log
                    </button> */}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      );
    }
  }
}
export default History;
