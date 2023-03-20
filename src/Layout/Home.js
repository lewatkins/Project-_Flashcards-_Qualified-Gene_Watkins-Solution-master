import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";
import { deleteDeck } from "../utils/api";

const Home = () => {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadDecks() {
      const result = await listDecks();
      setDecks(result);
    }

    loadDecks();
  }, [decks.length]);

  const handleDelete = (deckId) => {
    if (window.confirm("Do you really want to delete this deck?")) {
      deleteDeck(deckId)
      .then((history.push("/")))
      .then(window.location.reload());
      
    }
  };

  return (
    <div>
      <Link to="./decks/new">
        <button className="btn btn-secondary">+ Create Deck</button>
      </Link>

      {decks.map((deck, index) => {
        return (
          <div className="card m-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {deck.cards.length} cards
              </h6>
              <p className="card-text">{deck.description}</p>
              <Link to={`decks/${deck.id}`} className="btn btn-secondary mx-1">
                View
              </Link>
              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary mx-1"
              >
                Study
              </Link>
              <button
                className="btn btn-danger mx-4"
                onClick={() => handleDelete(deck.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
