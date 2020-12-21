import React, { useState } from 'react';
import Layout from '../../commons/Layout';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/InputField';
import './styles.css';

const Login = () => {
  const [userEmail, setUserEmail] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              showLabel
            />
            <Button text="Login" additionalClasses="form-button" />
          </form>
        </Card>
      </section>
    </Layout>
  );
};

export default Login;
