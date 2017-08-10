import React, {Component} from "react";
import axios from "axios";

export default class VoteButton extends Component {
    constructor() {
       super();
       this.voteAnswerPost = this.voteAnswerPost.bind(this);
   }

    voteAnswerPost(event) {
        //Does a post to the database with the answerId as the vote
        let vote = this.props.answerId;
            axios.post(`/api/games/${this.props.gameInstanceId}`, { vote })
            .then((response) => {
                //Sets the votedBool to true after a vote is registered
                this.props.setVotedBool(true);
            })
            .catch(function (error) {
                console.log(error);
            });
        

    }

    render() {
        return (
            <div className="col-12 vote-answer">
                <a href="#" onClick={this.voteAnswerPost}
                    disabled={this.props.votedBool}
                    name="findGame"
                >
                    {this.props.answer}
                </a>
            </div>
        )
    }
}