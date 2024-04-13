import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameModesPage from './pages/GameModesPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import DailyChallenge from './gameModes/DailyChallenge';
import WeeklyChallenge from './gameModes/WeeklyChallenge';
import MonthlyChallenge from './gameModes/MonthlyChallenge';
import WordList from './components/WordList';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ApplicationRoutes />
      </Router>
    </AuthProvider>
  );
};

const ApplicationRoutes = () => {
  const { loading } = useAuth(); // This hook must be inside a component that's a child of <AuthProvider>

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/gamemodes" element={<GameModesPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/game/daily" element={<DailyChallenge />} />
      <Route path="/game/weekly" element={<WeeklyChallenge />} />
      <Route path="/game/monthly" element={<MonthlyChallenge />} />
      <Route path="/admin/words" element={<PrivateRoute><WordList /></PrivateRoute>} />
    </Routes>
  );
};

export default App;
