import React from "react";
import CardForm from "./components/CardForm/CardForm";
import Table from "./components/Table/Table";
import StudyMod from "./components/StudyMod.jsx/StudyMod";
import DeckManager from "./components/DeckManager/DeckManager";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      decks: [],
      currentDeckId: null,
      isStudyMod: false,
      onlyLearned: false,
    };
  }

  addNewDeck = (NewDeckName) => {
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
      decks: this.state.decks.filter(
        (deck) => deck.id !== Number(currentDeckId),
      ),
      currentDeckId: null,
    });
  };
  selectDeck = (id) => {
    this.setState({ currentDeckId: id });
  };

  addNewCard = (front, back) => {
    if (front.trim() && back.trim() && this.state.currentDeckId) {
      const newCard = {
        front: front,
        back: back,
        id: Date.now(),
        learned: false,
      };
      let updatedDecks = this.state.decks.map((deck) => {
        if (deck.id === Number(this.state.currentDeckId)) {
          return {
            ...deck,
            cards: [...deck.cards, newCard],
          };
        }
        return deck;
      });
      this.setState({ decks: updatedDecks });
    }
  };

  deleteCard = (cardId) => {
    const { decks, currentDeckId } = this.state;

    const updatedDecks = decks.map((deck) => {
      if (deck.id === Number(currentDeckId)) {
        return {
          ...deck,
          cards: deck.cards.filter((card) => card.id !== cardId),
        };
      }
      return deck;
    });

    this.setState({ decks: updatedDecks });
  };

  editCard = (cardId, newFront, newBack) => {
    const { decks, currentDeckId } = this.state;

    const updatedDecks = decks.map((deck) => {
      if (deck.id === Number(currentDeckId)) {
        return {
          ...deck,
          cards: deck.cards.map((card) =>
            card.id === cardId
              ? { ...card, front: newFront, back: newBack }
              : card,
          ),
        };
      }
      return deck;
    });

    this.setState({ decks: updatedDecks });
  };

  toggleLearned = (cardId) => {
    const { decks, currentDeckId } = this.state;

    const updatedDecks = decks.map((deck) => {
      if (deck.id === Number(currentDeckId)) {
        return {
          ...deck,
          cards: deck.cards.map((card) =>
            card.id === cardId ? { ...card, learned: !card.learned } : card,
          ),
        };
      }
      return deck;
    });

    this.setState({ decks: updatedDecks });
  };

  toggleStudyMod = () => {
    this.setState({ isStudyMod: !this.state.isStudyMod });
  };

  toggleOnlyLearnedMod = () => {
    this.setState({ onlyLearned: !this.state.onlyLearned });
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

  getFilteredCards = () => {
    const currentDeck = this.state.decks.find(
      (deck) => deck.id === Number(this.state.currentDeckId),
    );
    if (!currentDeck) return [];
    if (this.state.onlyLearned) {
      return currentDeck.cards.filter((card) => card.learned === false);
    }
    return currentDeck.cards;
  };
  render() {
    const currentDeck = this.state.decks.find(
      (deck) => deck.id === Number(this.state.currentDeckId),
    );
    const filteredDeck = this.getFilteredCards();

    return (
      <div>
        <h1>Fleshcards</h1>
        {this.state.isStudyMod ? (
          <>
            <StudyMod
              cards={filteredDeck}
              onToggleLearned={this.toggleLearned}
            />
            <button onClick={() => this.toggleStudyMod()}>
              Leave Study Mod
            </button>
          </>
        ) : (
          <>
            <DeckManager
              decks={this.state.decks}
              currentDeckId={this.state.currentDeckId}
              onAddDeck={this.addNewDeck}
              onSelectDeck={this.selectDeck}
              onDeleteDeck={this.deleteDeck}
            />
            <CardForm
              onAddCard={this.addNewCard}
              currentDeckId={this.state.currentDeckId}
            />
            <Table
              cards={currentDeck ? currentDeck.cards : []}
              onDeleteCard={this.deleteCard}
              onEditCard={this.editCard}
              onToggleLearned={this.toggleLearned}
            />
            {this.state.currentDeckId && (
              <>
                {" "}
                Only Unlearned
                <input
                  type="checkbox"
                  onChange={this.toggleOnlyLearnedMod}
                  checked={this.state.onlyLearned}
                />
                <button onClick={this.toggleStudyMod}>Enter Study Mod</button>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default App;
