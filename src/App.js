import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyCreator from "./components/CreationPropriete";
import PropertyPanel from "./components/buyPropriete";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertyCreator />} />
        <Route path="/property"element={<PropertyPanel/>} />
      </Routes>
    </Router>
  );
}

export default App;
