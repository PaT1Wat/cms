import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import ContentList from './components/content/ContentList';
import ContentForm from './components/content/ContentForm';
import ContentEdit from './components/content/ContentEdit';
import MediaList from './components/media/MediaList';
import UserManagement from './components/admin/UserManagement';
import NotFound from './components/layout/NotFound';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/content" component={ContentList} />
          <PrivateRoute exact path="/content/new" component={ContentForm} />
          <PrivateRoute exact path="/content/edit/:id" component={ContentEdit} />
          <PrivateRoute exact path="/media" component={MediaList} />
          <AdminRoute exact path="/admin/users" component={UserManagement} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;