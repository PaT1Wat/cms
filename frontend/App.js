import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './src/components/routing/PrivateRoute';
import AdminRoute from './src/components/routing/AdminRoute';
import Navbar from './src/components/layout/Navbar';
import Landing from './src/components/layout/Landing';
import Login from './src/components/auth/Login';
import Register from './src/components/auth/Register';
import Dashboard from './src/components/dashboard/Dashboard';
import ContentList from './src/components/content/ContentList';
import ContentForm from './src/components/content/ContentForm';
import ContentEdit from './src/components/content/ContentEdit';
import MediaList from './src/components/media/MediaList';
import UserManagement from './src/components/admin/UserManagement';
import NotFound from './src/components/layout/NotFound';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;