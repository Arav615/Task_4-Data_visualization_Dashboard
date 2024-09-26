import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import NavBar from './components/navbar';   
import Header from './components/header';   
import Dashboard from './components/dashboard'; 

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <NavBar />           
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
