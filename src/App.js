import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.css';

const cardImages = [
	{ src: '/img/helmet-1.png', matched: false },
	{ src: '/img/potion-1.png', matched: false },
	{ src: '/img/ring-1.png', matched: false },
	{ src: '/img/scroll-1.png', matched: false },
	{ src: '/img/shield-1.png', matched: false },
	{ src: '/img/sword-1.png', matched: false },
];

  function App() {

    //12 cards (6 x2)
    //shuffle cards

    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    
    const shuffleCards = () => {
      const shuffledCards = [...cardImages, ...cardImages] // verdubbelt de array
      .sort(() => Math.random() - 0.5) // negatief verandert de orde, positief houdt de orde - eindresultaat: shuffled array
      .map((card) => ({ ...card, id: Math.random() })) // voegt een id toe

      setCards(shuffledCards);
      setTurns(0);
    }
  
    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // compare 2 selected cards
    // making a new array, check if src is equal & return the match as 'true'

    useEffect(() => {
      if (choiceOne && choiceTwo) {
        if (choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
                return {...card, matched: true}
              } else {return card}
            })
          })
          resetTurn()
        } else {
          console.log('those cards do not match')
        }
      }
    }, [choiceOne, choiceTwo])

    console.log(cards)
    // reset choices & increase turn
    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns + 1)
    }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (<SingleCard key={card.id} card={card} handleChoice={handleChoice}/>))}
      </div>
    </div>
  );
}

export default App