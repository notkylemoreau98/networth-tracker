import { useState } from 'react'
import './App.css'
import DashBoard from './pages/dashboard';
import LogIn from './pages/login';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);

  return (
    <>
      {/* Header */}
      {/* Account Login */}
      {/* <header className='text-right'>
        <p>Sign In</p>
      </header> */}

      <main>
        {/* If signed in render dashboard / else login page */}
        {isSignedIn ? (
          <DashBoard />
        ) : (
          <LogIn />
        )}
      </main>
    </>
  )
}

export default App
