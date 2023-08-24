import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Search from './pages/Search';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import '../src/index.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/searchrecs" element={<Search />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/myprofile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
