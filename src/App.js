import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {useState, useCallback} from 'react';
import Drawer from "carbon-react/lib/components/drawer";
import Home from "./views/Home";
import Login from "./views/Login";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const onChangeHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
}, [isExpanded]);

  return (
    <Router>
      <Drawer
        onChange={onChangeHandler}
        expanded={isExpanded}
        showControls
        expandedWidth="10%"
        sidebar={
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        }
      >

        <Switch>
        <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Drawer>
    </Router>
  );
}

export default App;
