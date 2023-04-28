import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import LoginModule from './LoginModule';

function App() {

  return (
    <h3>This is App Home Page</h3>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
    <LoginModule />
  </React.StrictMode>
);

export default App;
