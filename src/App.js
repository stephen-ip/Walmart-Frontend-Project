import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./components/Users/Users";
import User from "./components/User/User";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/:username" children={<User />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
