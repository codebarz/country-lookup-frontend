import React, { useState } from 'react';
import Layout from '../../commons/Layout';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/InputField';
import { post } from '../../helpers/request';
import endpoints from '../../action/endpoint';
import cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import './styles.css';

const Login = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    post(
      endpoints.login,
      { 'Content-Type': 'application/json' },
      { email: userEmail },
    )
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          cookie.set('gid', response.data.token);
          history.push('/');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <Layout>
      <section className="form-wrapper">
        <Card additionalClasses="login-card">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email Address"
              value={userEmail}
              name="email"
              onChange={handleChange}
              id="email"
              disabled={isLoading}
              showLabel
            />
            <Button
              text="Login"
              additionalClasses="form-button"
              isLoading={isLoading}
            />
          </form>
        </Card>
      </section>
    </Layout>
  );
};

export default Login;
