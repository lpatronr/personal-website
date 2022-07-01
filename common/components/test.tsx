import { ChangeEvent, FormEvent, useState } from 'react';

export default function Form(): JSX.Element {
  const [username, setUsername] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (username.length < 3 || username.length > 12 || !/^[A-Za-z0-9]+$/.test(username)) return;

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (result.status === 200) {
      console.log('success');
    } else {
      console.log('error');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='user' value={username} onChange={handleChange} />
      <button type='submit'>Create user</button>
    </form>
  );
}
