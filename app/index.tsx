import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to Our App</h1>
      <p>Explore the features of our application.</p>
      <div style={{ marginTop: '20px' }}>
        <Link href="/login">
          <a style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Login</a>
        </Link>
        <Link href="/signup">
          <a style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Signup</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;