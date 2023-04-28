import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import LoginModule from './LoginModule';

function App() {

  return (
    <div className="custome-class">
    {/* <LoginModule /> */}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
