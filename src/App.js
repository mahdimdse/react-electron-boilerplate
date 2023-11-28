import logo from "./logo.svg";
import "./App.css";

const { ipcRenderer } = window?.electron || {};

function App() {
  const sendNotification = () => {
    ipcRenderer.send("triggerNotification", "Sample notification!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Make your own Desktop App with <code>React</code> &{" "}
          <code>Electron</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
        <a
          className="App-link"
          href="https://www.electronjs.org/"
          target="_blank"
          rel="noopener noreferrer">
          Learn Electron
        </a>
        <br></br>
        <button
          onClick={() => {
            sendNotification();
          }}>
          Send Notification
        </button>
      </header>
    </div>
  );
}

export default App;
