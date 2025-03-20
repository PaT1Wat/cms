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