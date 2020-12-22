import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cookie from 'js-cookie';

interface User {
  token: string | null;
  isAuthorized: boolean;
  setUserToken?: (T: string) => void;
}

export const UserContext = createContext<User>({
  token: null,
  isAuthorized: false,
});

const DetailContext: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  function setUserToken(token: string) {
    setToken(token);
  }

  useEffect(() => {
    let token = cookie.get('gid');
    if (token) {
      setToken(token);
      setIsAuthorized(true);
    }
  }, []);

  const memoizedValue = useMemo(() => ({ token, isAuthorized }), [
    token,
    isAuthorized,
  ]);

  return (
    <UserContext.Provider value={{ ...memoizedValue, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}

export default DetailContext;
