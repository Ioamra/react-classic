import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {NextUIProvider} from "@nextui-org/react";
import HomePage from './pages/home/home.page';

const App: React.FC = () => {
  return (
    <NextUIProvider>
      <HomePage />
      {/* <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router> */}
    </NextUIProvider>
  );
};

export default App;