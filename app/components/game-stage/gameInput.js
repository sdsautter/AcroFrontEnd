import React, { Component } from "react";
import axios from "axios";
import { addAnswer } from "../../utils/helpers";

export default class GameInput extends Component {
   constructor() {
       super();
       this.submitAnswer = this.submitAnswer.bind(this);
       this.viewportRender = this.viewportRender.bind(this);
   }
    
    submitAnswer(event) {
        event.preventDefault();
        
        //When an answer is submitted it is trimmed
        const answer = this.playerAnswer.value.trim();

        //Posts the answer to the database using the gameinstanceID
        axios.post(`/api/games/${this.props.gameInstanceId}`, { answer })
            .then((response) => {
                console.log(`answer submitted - server response: ${JSON.stringify(response.data)}`);
                //Sets the answerSubmitted state according to a word found in the response
                if (JSON.stringify(response.data).includes("Invalid") ) {
                    this.props.setAnswerSubmitted("Invalid");
                } else if (JSON.stringify(response.data).includes("Success")) {
                    this.props.setAnswerSubmitted("Success");
                    this.props.setSubmittedBool(true);
                } else if (JSON.stringify(response.data).includes("submitted")) {
                    this.props.setAnswerSubmitted("submitted");          
                }  
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    viewportRender() {
        var intViewportWidth = window.innerWidth;
        //Renders either an input or a text area depending on the screen width
        if (intViewportWidth > 900) {
            return (
                <input 
                    ref={(input) => {this.playerAnswer = input}}
                    name="answer"
                    disabled={this.props.submittedBool} 
                    type="text" 
                    required placeholder="Type Answer Here" 
                />
            )
        } else {
            return(
                <textarea 
                    ref={(input) => {this.playerAnswer = input}}
                    name="answer"
                    rows="1"
                    disabled={this.props.submittedBool} 
                    type="text" 
                    required placeholder="Type Answer Here" 
                />
            )
        }
    }

    render() {
        return(          
            <form onSubmit={this.submitAnswer}>
                <div className="row">
                    <div className="col-12 col-lg-10 answer-input">
                        {this.viewportRender()}
                    </div>
                    <div className="col col-lg-2 text-right">
                        <button 
                        id="answerSubmit" 
                        className="btn btn-sm btn-secondary"
                        disabled={this.props.submittedBool}                      
                        type="submit">
                            Submit!
                        </button>
                    </div>
                </div>
            </form>    
        )
    }
}