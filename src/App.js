import { useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.css';

const cardImages = [
		{ "src": '/img/helmet-1.png' },
		{ "src": '/img/potion-1.png' },
		{ "src": '/img/ring-1.png' },
		{ "src": '/img/scroll-1.png' },
		{ "src": '/img/shield-1.png' },
		{ "src": '/img/sword-1.png' }
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