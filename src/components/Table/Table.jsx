import React from "react";
import "./Table.css";

class Table extends React.Component {
  state = {
    editingId: null,
    tempFront: "",
    tempBack: "",
  };

  startEdit = (card) => {
    this.setState({
      editingId: card.id,
      tempFront: card.front,
      tempBack: card.back,
    });
  };

  handleSave = (id) => {
    this.props.onEditCard(id, this.state.tempFront, this.state.tempBack);
    this.setState({ editingId: null });
  };

  render() {
    return (
      <div>
        <hr />
        <h2>{this.props.deckTitle}</h2>
        <table className="table-container">
          <thead>
            <tr>
              <th>front side</th>
              <th>back side</th>
              <th>learned</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.cards.map((card) => {
              const isEditing = this.state.editingId === card.id;

              return (
                <tr key={card.id}>
                  <td>
                    {isEditing ? (
                      <input
                        value={this.state.tempFront}
                        onChange={(e) =>
                          this.setState({ tempFront: e.target.value })
                        }
                      />
                    ) : (
                      card.front
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        value={this.state.tempBack}
                        onChange={(e) =>
                          this.setState({ tempBack: e.target.value })
                        }
                      />
                    ) : (
                      card.back
                    )}
                  </td>
                  <td>
                    <input type="checkbox" checked={card.learned} onChange={()=>this.props.onToggleLearned(card.id)}/>
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <button onClick={() => this.handleSave(card.id)}>
                          Save
                        </button>
                        <button
                          onClick={() => this.setState({ editingId: null })}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => this.startEdit(card)}>
                          Edit
                        </button>
                        <button
                          onClick={() => this.props.onDeleteCard(card.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
