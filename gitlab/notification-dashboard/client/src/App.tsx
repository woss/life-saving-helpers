import React from 'react';
import Dashboard from './components/Dashboard';
import { Grommet } from 'grommet'
import AppHeader from './components/Header';


function App() {

  React.useEffect(() => {
    async function setup() {

    }
    setup()

  }, [])
  // Return the App component.
  return (
    <Grommet>
      <AppHeader />
      <Dashboard />
    </Grommet>
  );
}

export default App;
