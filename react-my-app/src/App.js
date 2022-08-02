import logo from './logo.svg';
import './App.css';
// import Songle from 'songle-api'
//import {Songle} from 'songle-api'

// ES6
// import { Note, Key } from "@tonaljs/tonal";
// node
const { Note, Key } = require("@tonaljs/tonal");
console.log(Note.transpose("A4", "5P"));
console.log(Key.majorKey("Gb"));

const Songle = require("songle-api");
console.log(Songle);
const player =
  new Songle.SyncPlayer({
    accessToken: "YOUR-ACCESS-TOKEN-HERE", // please edit your access token
  });
console.log(player);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
