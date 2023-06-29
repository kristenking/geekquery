import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import QuestionList from './QuestionList';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './UserContext';
import { useEffect, useState } from 'react';
import ProfilePage from './ProfilePage';


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/users')
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={user}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/questions" element={<QuestionList />} />
            <Route path="/" element={<ProfilePage />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
