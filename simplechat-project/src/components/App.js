import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";
import ChatScreen from "./ChatScreen";
import LoginScreen from "./LoginScreen";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={ChatScreen} />
            <Route path="/" component={LoginScreen} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
