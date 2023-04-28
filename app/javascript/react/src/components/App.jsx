import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

function App() {

  return (
    <h3>This is App Home Page</h3>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
