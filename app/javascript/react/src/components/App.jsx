import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import LoginModule from './LoginModule';
import QuestionCard from './QuestionCard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/questions" element={<QuestionCard />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
