import Button from '../../components/Button';
import cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import './styles.css';

const Header = () => {
  const token = cookie.get('gid');
  const history = useHistory();
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    cookie.remove('gid');
    history.push('/login');
  };
  return (
    <header className="main-header">
      <div className="logo">
        <span>🌏</span>Country Lookup.
      </div>
      {token ? (
        <Button
          text="Logout"
          additionalClasses="logout-button"
          onClick={handleLogout}
        />
      ) : null}
    </header>
  );
};

export default Header;
