import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import AuthProvider from './Context/AuthProvider/AuthProvider';
import Navigation from './Shared/Navigation/Navigation';
import AllProducts from './pages/AllProducts/AllProducts';
import CustomerReview from './pages/CustomerReview/CustomerReview';
import Dashboard from './pages/Dashboard/Dashboard';
import Pay from './pages/Pay/Pay';



function App() {
  return (

    <AuthProvider>

      <BrowserRouter>
        <Navigation></Navigation>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/allProducts'>
            <AllProducts></AllProducts>
          </Route>
          <Route path='/review'>
            <CustomerReview></CustomerReview>
          </Route>
          <Route path='/dashboard'>
            <Dashboard></Dashboard>
          </Route>
          <Route path='/pay'>
            <Pay></Pay>
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
