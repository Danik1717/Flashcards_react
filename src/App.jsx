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
  deleteDeck = (currentDeckId) => {
    this.setState({
      decks: this.state.decks.filter((deck) => deck.id !== Number(currentDeckId)),
      currentDeckId: null,
    });
  };
  selectDeck = (id) => {
    this.setState({ currentDeckId: id });
  };

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem(`flashcards-react`));
    if (data) {
      this.setState({ decks: data });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.decks !== this.state.decks) {
      localStorage.setItem(
        "flashcards-react",
        JSON.stringify(this.state.decks),
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Fleshcards</h1>
        <DeckManager
          decks={this.state.decks}
          currentDeckId={this.state.currentDeckId}
          onAddDeck={this.AddNewDeck}
          onSelectDeck={this.selectDeck}
          onDeleteDeck = {this.deleteDeck}
        />
        <CardForm />
      </div>
    );
  }
}

export default App;
