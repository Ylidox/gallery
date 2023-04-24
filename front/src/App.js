import logo from './logo.svg';
import './App.css';
import {useEffect} from "react"

function App() {
  let f = async () => {
    let res = await fetch('/api');
    let obj = await res.json();
    console.log(obj);
  }

  useEffect(() =>
  {
    f();
  }, []);
  
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
