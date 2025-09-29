import React from 'react';

const Signup = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Signup</h1>
      <form style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input type="text" placeholder="Username" style={{ marginBottom: '10px', padding: '10px' }} />
        <input type="email" placeholder="Email" style={{ marginBottom: '10px', padding: '10px' }} />
        <input type="password" placeholder="Password" style={{ marginBottom: '10px', padding: '10px' }} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;