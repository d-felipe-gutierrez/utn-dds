import logo from './logo.svg';
import './App.css';
import HolaMundo from './HolaMundo.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HolaMundo mensaje='¡Hola mundo desde REACT! con props!' />
        <a
          className="App-link"
          href="https://www.frc.utn.edu.ar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ir a la página de la UTN - FRC
        </a>
      </header>
    </div>
  );
}

export default App;