import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import Lobby from './Lobby';
import './index.css';
import TempGameRoom from './TempGameRoom';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lobby/:roomName" element={<Lobby />} />
        <Route path="/gameroom/:roomName" element={<TempGameRoom />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Fallback route */}
      </Routes>
    </Router>
);
