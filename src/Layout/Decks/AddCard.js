import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck, updateDeck } from "../../utils/api";
import CardForm from './CardForm';

const AddCard = () => {
    //need the state to set store and render, set to an empty array
    const [deck, setDeck] = useState([]);
    // set the default card to add the info later
    const [card, setCard] = useState({
        front:'',
        back:'',
        deckId:''
    })

    const { deckId } = useParams();
    
    useEffect(() => {
        // 'readDeck(deckId,signal)' takes a signal as a parameter, define the signal
        const abortController = new AbortController()

        //grab the deck ino from the api -> async await
        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal)
            setDeck(() => response)
            console.log(readDeck(deckId, abortController.signal))
        }
        //invoke deckInfo
        deckInfo()

        return () => abortController.abort()
    }, [deckId])

    // need a function that is called when the form is changed from CardForm from the state
    //setcard for the existing data (...card) add the target.value to either 
    //the target.name (front/back): target.value the description
    const changeForm = ({ target }) => {
        setCard({...card, [target.name]: target.value})
    }

    const submitForm = (event) => {
        //stop the form from reseting
        event.preventDefault();
        //use setCard to add a new card to the deck
        setCard({...card, deckId: deckId})
        //use createCard() from api -> post request and use stringyfy  so it is no longer {obj}
        createCard(deckId, card)
        console.log("'submitForm' saved")
        //reset to the blank form 
        setCard({front: '', back: '', deckId: ''})
    }
    return ( 
    <div className='col-9 mx-suto'>

        <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to={'/'}>
                        Home
                    </Link>
                </li>

                <li className='breadcrumb-item'>
                    {/* got the deckId from the useParams */}
                    <Link to={`/decks/${deckId}`}>
                        {deck.name} 
                    </Link>
                </li>

                <li class="breadcrumb-item active" aria-current="page">
                    <Link to={`/decks/${deckId}/cards/new`}>
                         Add Card
                    </Link>
                </li>
            </ol>
        </nav>

        <div className='row pl-3 pb-2'>
            <h1>{deck.name}: Add Card</h1>
        </div>

        {/* use the cardForm component to show front/back and also 'Done' and 'Save' btn */}
        <CardForm 
            submitForm={submitForm}
            changeForm={changeForm}
            card={card}
            deckId={deckId}
        />

    </div> );
}
 
export default AddCard;