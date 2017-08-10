import React, {Component} from "react";

export default class VoteTime extends Component{
    
    constructor() {
        super();
        
        this.state = {
            timeLeft: 30,
            timerId: {}
        }

        this.timer = this.timer.bind(this);
    }

    timer() {
        //Starts a 30 second interval that counts down every second
        let timerId = setInterval(() => {
            let time = this.state.timeLeft - 1;
            this.setState({timeLeft: time})
            }, 1000);

        this.setState({ timerId })
        
    }

    componentDidMount() {  
        //Starts the timer when the component mounts
            this.timer();
    }

    componentWillUnmount() {
        //Stops the timer when the component unmounts
        clearInterval(this.state.timerId);
    }

    render() {

        return (
            <div className="row">
                <div className="col text-center">
                    <p className="time-left">{this.state.timeLeft}</p>
                </div>
            </div>
        )
    }
}