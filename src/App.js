import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import UsersListComponent from "./components/UsersListComponent";
import NavigationComponent from "./components/NavigationComponent";
import PublicationsListComponent from "./components/PublicationsListComponent";
import PublicationComponent from "./components/PublicationComponent";

function App() {
  return (
      <Router>
        <NavigationComponent/>
        <Route path='/users' component={UsersListComponent} exact/>
        <Route path='/publications' component={PublicationsListComponent} exact/>
        <Route path='/publications/6175f1c9b2b95f14803e801f' component={PublicationComponent} exact/>
      </Router>
  );
}

export default App;
