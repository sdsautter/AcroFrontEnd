import React, {Component} from 'react';
import GameInstance from "./GameInstance";


// Create the Main component
export default class Main extends Component {

  // Here we render the component. Right now there's only a GameInstane child
  render() {

    return (
      <div className="container-fluid z-index-2">
        <GameInstance />
      </div>
    );
  }
}
