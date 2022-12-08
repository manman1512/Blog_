import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './components/context/Context';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
      <App />
    </ContextProvider>,
);
