import { useState } from 'react';
import {Amplify} from 'aws-amplify';
import awsmobile from './aws-exports';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import DashBoard from './pages/dashboard';

Amplify.configure(awsmobile);

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <>
      {/* Header */}
      <main>
        {/* If signed in render dashboard / else login page */}
        {isSignedIn ? (
          <DashBoard />
        ) : (
          <Authenticator>
            {({ signOut }) => (
                <header className='App-header'>
                  {/* Sign Out Button */}
                  <button 
                    onClick={signOut} 
                    style={{ 
                      margin: '20px', 
                      fontSize: '0.8rem', 
                      padding: '5px 10px', 
                      marginTop: '20px'
                    }}
                  >
                    Sign Out
                  </button>
                </header>
            )}
          </Authenticator>
        )}
      </main>
    </>
  )
}

export default withAuthenticator(App);
