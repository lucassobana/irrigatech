import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';

import { Home } from './pages/Home';
import { History } from './pages/history/History';
import { FarmList } from './pages/farms/FarmList';
import { UserList } from './pages/users/UserList';

import './global.css'

export function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/farm" element={<FarmList />} />
          <Route path="/history" element={<History />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </main>
    </>
  );
}
