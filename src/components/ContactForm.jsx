import { useState } from 'react';
import TextField from './ui/TextField.jsx';
import TextArea from './ui/TextArea.jsx';
import Button from './ui/Button.jsx';
import StatusNotice from './ui/StatusNotice.jsx';

export default function ContactForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('Contact form submission is not connected in this frontend-only build.');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField id="name" label="Name" autoComplete="name" required />
      <TextField id="email" label="Email" type="email" autoComplete="email" required />
      <TextArea id="message" label="Message" rows={5} required />
      <div className="form__actions">
        <Button type="submit">Send message</Button>
      </div>
      {message && <StatusNotice>{message}</StatusNotice>}
    </form>
  );
}
