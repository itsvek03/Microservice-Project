import Header from './components/Header/Header.component'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login.Page'
import Home from './pages/Home.Page.jsx'
import Signup from './pages/Signup.Page'
import LoginProvider from './contexts/Login.Provider.jsx'
import ProductDetails from './components/ProductDetails/ProductDetails.components.jsx'



function App() {
  return (
    <LoginProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path='/signup' component={SignUp} /> */}
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/:sku' component={ProductDetails} />
        </Switch>
      </Router>
    </LoginProvider>




  );
}



export default App;
