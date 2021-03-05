import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Router, Switch, Route } from "react-router-dom";
import LandingPage from "./screens/LandingPage";
import TranslatorPage from "./screens/TranslatorPage";
import history from "./history";

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/Translate" component={TranslatorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
