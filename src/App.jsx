import React from "react";
import CardForm from "./CardForm";
import Table from "./Table";
import StudyMod from "./StudyMod";
import DeckManager from "./DeckManager";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      decks: [],
      currentDeckId: null,
    };
  }

  AddNewDeck = (NewDeckName) => {
    if (NewDeckName.trim()) {
      const newDeck = {
        title: NewDeckName,
        cards: [],
        id: Date.now(),
      };
      this.setState({
        decks: [newDeck, ...this.state.decks],
        currentDeckId: newDeck.id,
      });
    }
  };

  selectDeck = (id) => {
    this.setState({ currentDeckId: id });
  };

  render() {
    return (
      <div>
        <h1>Fleshcards</h1>
        <DeckManager
          decks={this.state.decks}
          currentDeckId={this.state.currentDeckId}
          onAddDeck={this.AddNewDeck}
          onSelectDeck={this.selectDeck}
        />
        <CardForm />
      </div>
    );
  }
}

export default App;
