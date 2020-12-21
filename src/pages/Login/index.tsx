import React, { useState } from 'react';
import Layout from '../../commons/Layout';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/InputField';
import { post } from '../../helpers/request';
import endpoints from '../../action/endpoint';
import cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
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
    const loadingToast = toast.loading('One minute!.');
    post(
      endpoints.login,
      { 'Content-Type': 'application/json' },
      { email: userEmail },
    )
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          toast.dismiss(loadingToast);
          toast.success('Login successful');
          cookie.set('gid', response.data.token);
          history.push('/');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.dismiss(loadingToast);
        toast.error(error.response.data.message);
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
