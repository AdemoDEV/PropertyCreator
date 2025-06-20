import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyCreator from "./components/CreationPropriete";
import PropertyPanel from "./components/buyPropriete";
import Notifications from "./components/Notification/notifications";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertyCreator />} />
        <Route path="/property"element={<PropertyPanel/>} />
        <Route path="/notif"element={<Notifications/>} />
      </Routes>
    </Router>
  );
}

export default App;
