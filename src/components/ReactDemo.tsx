import React, {useRef} from 'react';
import logo from '../assets/logo.svg';
import { toSvg } from 'html-to-image';
import {download} from "../helpers";
import './ReactDemo.scss';


function ReactDemo() {
  const ref = useRef<HTMLDivElement>(null);

  const exportAsSvg = () => {
    toSvg(ref.current as HTMLElement)
        .then(function (dataUrl) {
          download(dataUrl, 'export.svg');
        });
  }

  return (
    <div className="react-demo" ref={ref}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/components/ReactDemo.tsx</code> and save to reload. <br />
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

export default ReactDemo;
