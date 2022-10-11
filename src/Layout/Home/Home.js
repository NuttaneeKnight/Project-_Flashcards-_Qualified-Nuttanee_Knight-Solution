import React, { useState, useEffect } from "react";
import DeckList from "./DeckList";
import { Link } from "react-router-dom";
import { listDecks, updateDeck } from "../../utils/api";

function Home ({ updateDecks, deckLength }) {
    const [decks, setDecks] = useState([])

    useEffect(() =>{
        //in case the user click the wrong button abort the API call, good practice
        const abortController = new AbortController()
        //fetching listDecks from the API server by using async await
        const fetchDecks = async () => {
            const ApiDecks = await listDecks(abortController.signal)
            //change the state 'setDecks' to listDecks
            setDecks(() => ApiDecks)
        }
        // call fetchDecks
        fetchDecks()
        return () => abortController.abort()
    }, [deckLength])
    // create deck
    // showing deckList on home
    return ( 
        <div>
            <div className='row mx-auto'>
                <Link to={'/decks/new'} className='btn btn-secondary mb-2'>
                <button type="button" class="btn btn-secondary">+ Create Deck</button>   
                </Link>
            </div>
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