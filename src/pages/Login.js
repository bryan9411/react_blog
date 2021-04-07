import React, { useState, useContext } from 'react';
import Layout from 'Layout';
import { login, getMe } from 'WebApi';
import { AuthContext } from 'Contexts';
import { setAuthToken } from 'utils';
import { useHistory } from 'react-router';

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleUserChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const handlePasswordChange = (e) => {
    setPassword('Lidemy');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    login(username, password).then((data) => {
      if (data.ok === 0) return setErrorMessage(data.message);
      setAuthToken(data.token);
      getMe().then((res) => {
        if (res.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(res.toString());
        } else {
          setUser(res.data);
          history.push('/');
        }
      });
    });
  };
  return (
    <Layout>
      <div className="login-wrapper">
        <form className="box login-box" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                name="usename"
                value={username}
                onChange={handleUserChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Text input"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="control">
            <button className="button is-fullwidth is-primary">Login</button>
          </div>
          {errorMessage && <div className="errorMessage ">{errorMessage}</div>}
        </form>
      </div>
    </Layout>
  );
}
