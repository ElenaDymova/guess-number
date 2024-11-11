import React, { useState, useRef } from "react";
import { toast, Toaster } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  //генерация случайного числа
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //состояние для хранения попыток и загаданного числа
  const [game, setGame] = useState({
    number: getRandomNumber(1, 10),
    attempts: 2
  });

  console.log(game);

  //состояние для инпута
  const [inputVisible, setInputVisible] = useState(true); 

  // Ссылка на инпут для очистки
  const inputRef = useRef(null);

  //обработка формы
  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredNumber = parseInt(event.target.guess.value, 10);
    console.log(event.target.guess.value)
    if(enteredNumber === game.number) {
      toast.custom((t) => (
        <div className="toast">
          <p>You guessed it! 🎉</p>
          <p>The number you guessed - <b>{game.number}</b></p>
          <button 
            onClick={() => {
              // Закрытие уведомления только при нажатии на кнопку
              toast.dismiss(t.id);  
              window.location.reload();
            }} 
            className="toast-action-button"
          >
            Play again?
          </button>
        </div>
      ), { duration: Infinity });
      confetti();  // Запускаем конфетти
      setInputVisible(false);
      //очищаем инпут
      inputRef.current.value = "";
    } else {
      if (game.attempts > 0) {
        toast.error(`Try again. Attempts left ${game.attempts}`, { duration: 2000 });
        // Очищаем инпут при неверном вводе
        inputRef.current.value = "";
        setGame((prevGame) => ({
          ...prevGame,
          attempts: prevGame.attempts - 1
        }));
      } else {
        setInputVisible(false);
        toast.custom((t) => (
          <div className="toast toast-end">
            <p>You lost it! 😭</p>
            <p>The number you didn't guess - <b>{game.number}</b></p>
            <button 
              onClick={() => {
                // Закрытие уведомления только при нажатии на кнопку
                toast.dismiss(t.id);  
                window.location.reload();
              }} 
              className="toast-action-button"
            >
              Play again?
            </button>
          </div>
        ), { duration: Infinity });
      }
    }
  }
  
  return (
    <div className="App">
      <div className="container">
        <h1>Guess Number</h1>
        <p>Guess the number is a game in which you have to guess the number given by the computer between 0 and 10. Use as few tries as possible. Good luck!</p>
        {inputVisible && 
          (<form onSubmit={handleSubmit}>
            <label aria-label='Enter the number'>
              <input
                className='input'
                type='number'
                name='guess'
                placeholder='Enter the number'
                min='1'
                max='10'
                ref={inputRef}
              />
            </label>
          </form>)
        }
      </div>
      <Toaster position="bottom-center"/>
    </div>
  );
}

export default App;