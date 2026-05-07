import React from 'react'

class CardForm extends React.Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="Question"/>
        <input type="text" placeholder="Answer"/>
        <button>Create</button>
      </div>
    );
  }
}

export default CardForm;