import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from 'components/App';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/Notfound';
import PostPage from 'pages/PostPage';
import { AuthContext, LoadingContext } from 'Contexts';
import { getMe } from 'WebApi';
import { getAuthToken } from 'utils';

export default function Router() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((res) => {
        if (res.ok) {
          setUser(res.data);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <Switch>
            <Route path="/" component={App} exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/posts/:slug" component={PostPage} />
            <Route component={NotFound} />
          </Switch>
        </LoadingContext.Provider>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
