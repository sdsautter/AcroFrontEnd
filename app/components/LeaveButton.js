import React, {Component} from "react";
import axios from "axios";


export default class LeaveButton extends Component {
    constructor(props) {
        super(props);
        this.leaveClick = this.leaveClick.bind(this);
    }

    leaveClick() {
        //Updates the find game boolean state in order to render the find game stage
        this.props.setFindGameFalse();

        //Sends a delete request to the api to remove the player from the game
        axios.delete(`/api/games/${this.props.gameInstanceId}`)
            .then((response) => {
                console.log("Goodbye");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
                <div className="col-1 text-left">
                    <img onClick={this.leaveClick} className="leave-button" src="assets/images/power-button.png" alt="leave game" />
                </div>
        )
    }
}