import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard, readDeck } from "../../utils/api/index";
import { deleteDeck } from "../../utils/api/index";

//create a function retrieves an updated deck's id, fetch it's card data and set the deck useState to have content
const Deck = ({ updateDecks }) => {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id, name, description, cards } = deck;

  useEffect(() => {
    const abortController = new AbortController();
    const deckInfo = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(() => response);
    };
    deckInfo();
    return () => abortController.abort();
  }, [deckId]);
  //create a delete handler with prompt window pop up, if confirmed delete it
  const deleteHandler = async () => {
    if (
      window.confirm("Delete this deck? You will not be able to revocer it.")
    ) {
      await deleteDeck(id);
      //utilize the updateDecks() to remove it from the deck
      updateDecks(-1);
      //go to home page
      history.push("/");
    } else {
      //ramains on the same page
      history.go(0);
    }
  };
  // if no deck or card, return 'loading...'
  if (!deck || !cards) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
    //if it's present return content
  } else {
    return (
      <div className="col-9 mx-auto">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumbs">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item">{name}</li>
          </ol>
        </nav>

        {/* deck container with name, description, btn study, btn edit, btn add cards, btn delete */}
        <div className="card border-0 mb-4">
          <div className="card-body">
            <div className="row px-3">
              <h5 className="card-title">{name}</h5>
            </div>

            <p className="card-text">{description}</p>

            <div className="row px-3"></div>
            <Link to={`/decks/${id}edit`} className="btn btn-secondary">
              Edit
            </Link>

            <Link to={`/decks/${id}/study`} className="btn btn-primary ml-2">
              Study
            </Link>

            <Link
              to={`/decks/${id}/cards/new`}
              className="btn btn-primary ml-2"
            >
              + Add Cards
            </Link>

            <button
              onClick={deleteHandler}
              name="delete"
              // controled input
              value={id}
              className="btn btn-danger ml-auto"
            >
              {/* trash icon */}
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        {/* //   cards container for all cards, front, back, edit bth , delete btn */}
        <div className="row pl-3 pb-2">
          <h1>Cards</h1>
        </div>

        {cards.map((card, index) => (
          <div className="row" key={index}>
            <div className="col">
              <div className="card">
                <div className="row card-body">
                  <p className="col-6 card-text">{card.front}</p>
                  <p className="col-6 card-text">{card.back}</p>
                </div>
                <div className="d-flex justify-content-end p-2">
                  <Link
                    to={`${url}/cards/${card.id}/edit`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Delete this deck? You will not be able to revocer it."
                        )
                      ) {
                        await deleteCard(card.id);
                        updateDecks(-1);
                        history.go(0);
                      } else {
                        history.go(0);
                      }
                    }}
                    name='deleteCard'
                    value={card.id}
                    className='btn btn-danger ml-2'
                  >
                    <i className='fa fa-trash' aria-hidden='true'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Deck;
