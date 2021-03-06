import React, {Component} from "react";
import FinalResultItem from "./FinalResultItem.js";
import axios from "axios";

export default class FinalResultsStage extends Component {
    constructor(props){
        super(props);
        
        this.state = { 
            findGame: false
        }

        this.finalResults = this.finalResults.bind(this);
        this.findGamePost = this.findGamePost.bind(this);
    }

    componentDidMount() {
        //When the component mounts it stops the long polling to the database
        this.props.syncClearInterval();
    }

    findGamePost(event) {
        //Posts to the database to find a new game
        let addGameInstance = this.props.addGameInstance;
        event.preventDefault();
        this.setState({ findGame: true });
        
        axios.post("/api/games")
            .then((response) => {
                console.log("Blast Off Again!");
                this.props.setFindGameTrue();
                return addGameInstance(response.data.gameInstance.gameInstanceId);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    finalResults() {
        console.log(this.props.results);
        return this.props.results.map((player) => {
            return <FinalResultItem 
            score={player.points}
            username={player.username}
            />
        });
    }
    render() {
        return (
            <div className="col-11 main-game text-center">
                <div className="row text-center">
                    <div className="col">
                        <h1 className="game-over">Game Over!</h1>
                    </div>
                </div>
                <br />
                {this.finalResults()}
                <br />            
                    <div className="row">
                        <div className="col text-center">
                            <form onSubmit={this.findGamePost}>
                                <button 
                                name="findGame" 
                                className="btn btn-success vote-answer"
                                disabled={this.state.findGame}
                                >Find Game</button>
                            </form>
                        </div>
                    </div>
            </div>
        )
    }
}