import React, { useState, useContext } from 'react';
import Layout from 'Layout';
import { useHistory } from 'react-router-dom';
import { getMe, register } from 'WebApi';
import { setAuthToken } from 'utils';
import { AuthContext } from 'Contexts';

export default function Register() {
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handleUserChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword('Lidemy');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    register(nickname, username, password).then((data) => {
      if (data.ok !== 1) {
        setErrorMessage(data.message);
      }
      //token 存進 localstorage
      setAuthToken(data.token);

      //進行身分驗證
      getMe().then((res) => {
        if (res.ok !== 1) {
          setErrorMessage(res.message);
        } else {
          setUser(res.data);
          history.push('./login');
        }
      });
    });
  };
  return (
    <Layout>
      <div className="login-wrapper">
        <form className="box login-box" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Nickname</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                name="nickname"
                value={nickname}
                onChange={handleNicknameChange}
              />
            </div>
          </div>
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
            <button className="button is-fullwidth is-primary">Register</button>
          </div>
          {errorMessage && <div className="errorMessage ">{errorMessage}</div>}
        </form>
      </div>
    </Layout>
  );
}
