import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index.js";

function DeckList({ deck, updateDecks }) {
  // card content, length and view to deck screen
  //destructure
  const { id, name, description, cards } = deck;
  //deck length
  const deckLength = cards.length;
  // to go back for the delete prompt
  const history = useHistory();

  //delete button with async await becuase we are fetching from the api
  const deleteHandler = async () => {
    // if the delete btn is clicked promt the window
    //if confirmed -> uses 'deleteDeck' 'utils/api/index.js
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      await deleteDeck(id);
      updateDecks(-1);
      //history.go(0) - reloads the current page
      history.go(0);
    } else {
      history.go(0);
    }
  };
  //deck name, card length, description, view/study/delete btns
  return (
    <div className="card w-75 mb-4">
      <div className="card-body">
        <div className="row px-3">
          <h5 className="card-title">{name}</h5>
          <p className="ml-auto">{deckLength} cards</p>
        </div>
        <p className="card-text">{description}</p>

        <div>
          <Link to={`/decks/${id}`} className="btn btn-secondart mr-2">
            View
          </Link>

          <Link to={`/decks/${id}/study`} className="btn btn-primary mi-3 mr2">
            Study
          </Link>

          <button
            onClick={deleteHandler}
            name="delete"
            value={id}
            className="btn btn-danger ml-auto"
          ></button>

        </div>
      </div>
    </div>
  );
}

export default DeckList;
