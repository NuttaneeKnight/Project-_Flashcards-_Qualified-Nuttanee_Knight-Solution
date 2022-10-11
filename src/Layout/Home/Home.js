import React, { useState, useEffect } from "react";
import DeckList from "./DeckList";
import { Link } from "react-router-dom";
import { listDecks, updateDeck } from "../../utils/api";

function Home ({ updateDecks, deckLength }) {
    const [decks, setDecks] = useState([])

    //fetch the deck from api
    useEffect(() =>{
        const abortController = new AbortController()
        //fetching listDecks from the API server by using async await
        const fetchDecks = async () => {
            const ApiDecks = await listDecks(abortController.signal)
            //change the state 'setDecks' to listDecks
            setDecks(ApiDecks)
            console.log(2)
        }
        // call fetchDecks
        console.log(1)
        fetchDecks()
        return () => abortController.abort()
    }, [deckLength])
    // create deck
    // showing deckList on home
    return ( 
        <div>
            <div className='row mx-auto'>
                <Link to={'/decks/new'} className='btn btn-secondary mb-2'>
                <button type="button" className="btn btn-secondary">+ Create Deck</button>   
                </Link>
            </div>
            {/* display the existing deck */}
            <div className='row mx-auto'>
                {decks.map((deck) => 
                <DeckList 
                    key={deck.id}
                    deck={deck}
                    updateDecks={updateDecks}
                />
                )}
            </div>
        </div>

     );
}
 
export default Home;