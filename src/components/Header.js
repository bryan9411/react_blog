import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext, LoadingContext } from 'Contexts';
import { setAuthToken } from 'utils';
import Panel from 'components/Panel';

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [isPanel, setIsPanel] = useState(false);
  const history = useHistory();

  // 登出
  const handleLogout = (e) => {
    setAuthToken('');
    setUser(null);
    setIsLoading(true);
    history.push('/');
    setIsLoading(false);
  };
  // 打開 panel
  const handleOpen = (e) => {
    e.preventDefault();
    setIsPanel(true);
  };
  return (
    <div className="header">
      <div className="container">
        <div className="start">
          <Link to="/">Home</Link>
        </div>
        <div className="end">
          {!user && <Link to="/login">登入</Link>}
          {!user && <Link to="/register">註冊</Link>}
          {user && <Link onClick={handleLogout}>登出</Link>}
          {user && <Link onClick={handleOpen}>發佈文章</Link>}
        </div>
      </div>
      {isPanel && <Panel isPanel={isPanel} setIsPanel={setIsPanel} />}
    </div>
  );
}
