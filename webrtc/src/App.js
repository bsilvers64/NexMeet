import './App.css';
import socketConnection from './webRTC-Utilities/socketConnection'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import MainVideoPage from './videoComponents/MainVideoPage.js';

const Home = ()=><h1>Hiiiii</h1>
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/join-video" Component={MainVideoPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
