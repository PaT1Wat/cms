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
    <div>
      <h1>Welcome to Vite + React App</h1>
    </div>
  );
};

export default App;