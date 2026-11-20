import { useState } from 'react';
import TextField from './ui/TextField.jsx';
import Button from './ui/Button.jsx';
import StatusNotice from './ui/StatusNotice.jsx';

export default function LoginForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('Authentication is not connected in this frontend-only build.');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField id="username" label="Username" autoComplete="username" required />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
      />
      <div className="form__actions">
        <Button type="submit">Login</Button>
      </div>
      <StatusNotice>{message}</StatusNotice>
    </form>
  );
}
