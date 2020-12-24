import Button from '../../components/Button';
import cookie from 'js-cookie';
import './styles.css';
import { useUserContext } from '../../store/userContext';

const Header = () => {
  const { token, setUserToken } = useUserContext();
  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    await cookie.remove('gid');
    setUserToken!('');
    window.location.href = '/login';
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
