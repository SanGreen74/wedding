import React from 'react';
import logo from './logoX2-v3.png';
import './App.css';
import CountdownTimer from "./CountDownTimer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <CountdownTimer targetDate="2013-11-08" dateName="нашей первой встречи"/>
          <CountdownTimer targetDate="2020-11-08" dateName="нашей свадьбы"/>
        </div>
      </header>
    </div>
  );
}

export default App;
