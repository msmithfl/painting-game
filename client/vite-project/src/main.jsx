import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import Lobby from './Lobby';
import GameRoom from './GameRoom';
import PostGame from './PostGame';
import './index.css';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lobby/:roomName" element={<Lobby />} />
        <Route path="/gameroom/:roomName" element={<GameRoom />} />
        <Route path="/postgame/:roomName" element={<PostGame />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Fallback route */}
      </Routes>
    </Router>
);
