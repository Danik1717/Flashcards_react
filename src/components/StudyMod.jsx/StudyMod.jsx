import React from "react";
import "./StudyMod.css";

class StudyMod extends React.Component {
  state = {
    currentIndex: 0,
    isFlipped: false,
  };

  handleFlip = () => {
    this.setState({ isFlipped: !this.state.isFlipped });
  };

  handlePrev = () => {
    const length = this.props.cards.length;
    this.setState((prevState) => ({
      currentIndex: prevState.currentIndex === 0 ? length - 1 : prevState.currentIndex - 1,
      isFlipped: false
    }));
  };

  handleNext = () => {
    const length = this.props.cards.length;
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % length,
      isFlipped: false
    }));
  };

  handleLearned = (e, card) => {
    e.stopPropagation(); 
    this.props.onToggleLearned(card.id);
  };

  render() {
    if (!this.props.cards || this.props.cards.length === 0) {
      return (
        <div className="study-container">
          <div className="no-cards">No cards to study!</div>
          <button className="leave-btn" onClick={this.props.onLeave}>Leave Study Mod</button>
        </div>
      );
    }

    const currentCard = this.props.cards[this.state.currentIndex];
    const { isFlipped } = this.state;

    return (
      <div className="study-container">
        <div 
          className={`card ${isFlipped ? "is-flipped" : "front-side"}`} 
          onClick={this.handleFlip}
        >
          <span className="card-number">№{this.state.currentIndex + 1}</span>
          
          <input 
            type="checkbox" 
            className="learned-checkbox"
            checked={currentCard.learned} 
            onChange={(e) => this.handleLearned(e, currentCard)}
            onClick={(e) => e.stopPropagation()} // Двойная защита от всплытия
          />

          <div className="card-content">
            <small className="side-indicator">
              {isFlipped ? "ANSWER" : "QUESTION"}
            </small>
            <p className="card-text">
              {isFlipped ? currentCard.back : currentCard.front}
            </p>
          </div>
        </div>

        <div className="controls-wrapper">
          <div className="nav-buttons">
            <button className="nav-btn" onClick={this.handlePrev}>Previous</button>
            <button className="nav-btn" onClick={this.handleNext}>Next</button>
          </div>
          <button className="leave-btn" onClick={this.props.onLeave}>
            Leave Study Mod
          </button>
        </div>
      </div>
    );
  }
}

export default StudyMod;