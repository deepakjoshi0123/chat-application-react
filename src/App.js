import React from "react";

import Chat from "./components/chat/chat";
import Login from "./components/login/login";
import Register from "./components/login/reg";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/chat" component={Chat} />
      </Router>
    </div>
  );
}

export default App;
