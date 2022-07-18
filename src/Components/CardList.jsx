import { Button, Pagination } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { timeConverter } from "../utils";

const CardList = ({ data }) => {
  const [cards, setCards] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const cardPerPage = 20;
  const lastCardIndex = currentPage * cardPerPage;
  const firstCardIndex = lastCardIndex - cardPerPage;
  const currentCards = cards.slice(firstCardIndex, lastCardIndex);
  const [closed, setClosed] = useState([]);

  const changePage = (event, value) => {
    setCurrentPage(value);
  };

  const animation = (id) => {
    const tmp = [...cards];
    tmp.forEach((card) => {
      if (card.id === id) {
        card.opacity = 0;
        return;
      }
    });
    setCards(tmp);
  };
  const closeCard = (id) => {
    const filtered = cards.filter((card) => card.id !== id);
    setCards(filtered);

    const closedCards = [...closed, id];
    localStorage.setItem("closedCards", closedCards);
    setClosed(closedCards);
  };

  useEffect(() => {
    if (!data) return;
    if (!localStorage.hasOwnProperty("closedCards")) {
      setCards(data);
      return;
    }

    const closedCards = localStorage.closedCards.split(",");
    if (!closedCards) return;

    const filtered = data.filter((card) => !closedCards.includes(card.image));
    setCards(filtered);
    setClosed(closedCards);
  }, [data]);

  const restore = () => {
    setCards(data);
    localStorage.removeItem("closedCards");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button variant="contained" onClick={restore}>
        Восстановить карточки
      </Button>
      <div className="container">
        {currentCards.map((card) => {
          return (
            <div
              key={card.id}
              className="card"
              style={card.opacity === 0 ? { opacity: 0 } : { opacity: 1 }}
              onTransitionEnd={() => {
                closeCard(card.id);
              }}
            >
              <div className="card-header">
                <img
                  src={`http://contest.elecard.ru/frontend_data/${card.image}`}
                  alt=""
                />
                <button
                  className="card-close"
                  onClick={() => {
                    animation(card.id);
                  }}
                >
                  x
                </button>
              </div>
              <div className="card-body">
                <h4>{timeConverter(card.timestamp)}</h4>
              </div>
            </div>
          );
        })}
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Pagination
            count={Math.ceil(cards.length / cardPerPage)}
            page={currentPage}
            onChange={changePage}
          />
        </div>
      </div>
    </div>
  );
};

export default CardList;
