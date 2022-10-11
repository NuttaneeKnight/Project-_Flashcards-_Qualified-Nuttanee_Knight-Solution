import React from "react";
import { Link } from "react-router-dom";

const CardForm = ({ submitForm, changeForm, card, deckId }) => {
  return (
    <form id="cardForm" onSubmit={submitForm}>
      <div>
        <label>Front</label>
        <textarea
          name="front"
          id="front"
          rows={2}
          value={card.front}
          onChange={changeForm}
          className="form-control mb-3"
          placeholder="Front side of card"
        ></textarea>

        <label>Back</label>
        <textarea
          name="back"
          id="back"
          rows={2}
          value={card.back}
          onChange={changeForm}
          className="form-control mb-3"
          placeholder="Back side of card"
        ></textarea>

        <Link
            to={`/decks/${deckId}`}
            className='btn btn-secondary mr-2'
            name='cancel'
        >Done</Link>

        <button type='submit' className='btn btn-primary'>
            Save
        </button>
      </div>
    </form>
  );
};

export default CardForm;
