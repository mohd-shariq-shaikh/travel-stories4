import { useState } from 'react';
import { useRouter } from 'next/router';

const RegistrationForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePic', profilePic as Blob);

    const res = await fetch('/api/register', {
      method: 'POST',
      body: formData
    });

    if (res.status === 200) {
      router.push('/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <input type="file" onChange={(e) => setProfilePic(e.target.files ? e.target.files[0] : null)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
