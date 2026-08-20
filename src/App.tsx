import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import ChatApp from '@/components/ChatApp';

type View = 'landing' | 'app';

function App() {
  const [view, setView] = useState<View>('landing');

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onGetStarted={() => setView('app')} />
      ) : (
        <ChatApp onExit={() => setView('landing')} />
      )}
    </>
  );
}

export default App;
