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

  handlePrev = ()=>{
    const length = this.props.cards.length
    if(this.state.currentIndex !=0) this.setState({currentIndex:this.state.currentIndex-1})
    else this.setState({currentIndex:length-1})
  }

  handlePrev = ()=>{
    const length = this.props.cards.length
    if(this.state.currentIndex !=0) this.setState({currentIndex:--this.state.currentIndex})
    else this.setState({currentIndex:length-1})
  }

  handleNext = ()=>{
    const length = this.props.cards.length
    if(this.state.currentIndex !=length-1) this.setState({currentIndex:++this.state.currentIndex})
    else this.setState({currentIndex:0})
  }

  handleLearned = (card)=>{
    this.props.onToggleLearned(card.id)
  }
  render() {
    if (!this.props.cards || this.props.cards.length === 0) {
      return <div>No cards to study!</div>;
    }

    const currentCard = this.props.cards[this.state.currentIndex];

    return (
      <div>
        <div className="card" onClick={this.handleFlip}>
          №{this.state.currentIndex+1}
          <input type="checkbox" checked= {currentCard.learned} onChange={()=>this.handleLearned(currentCard)}/>
          {this.state.isFlipped ? currentCard.back : currentCard.front}
        </div>

        <button onClick={this.handlePrev}>Previous card</button>
        <button onClick={this.handleNext}>Next card</button>
      </div>
    );
  }
}
export default StudyMod;
