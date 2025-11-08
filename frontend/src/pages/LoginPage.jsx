import LoginForm from '../components/LoginForm';

function LoginPage({ onLogin }) {
  return (
    <div className="page login-page">
      <div className="container">
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  );
}

export default LoginPage;
