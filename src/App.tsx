import React, {useRef} from 'react';
import logo from './logo.svg';
import './App.scss';
import { toSvg } from 'html-to-image';
const download = require("downloadjs");


function App() {
  const ref: React.MutableRefObject<HTMLElement|any> = useRef(null);

  const exportAsSvg = () => {
    toSvg(ref.current)
        .then(function (dataUrl) {
          download(dataUrl, 'my-node.png');
        });
  }

  return (
    <div className="App">
      <header className="App-header" ref={ref}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. <br />
          Press the button below to export page as svg.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button className="ExportSvgBtn" onClick={exportAsSvg}>
          Export SVG
        </button>
      </header>
    </div>
  );
}

export default App;
