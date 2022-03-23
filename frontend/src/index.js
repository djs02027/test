import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './pages/Mainpage/Main';
import Mypage from './pages/Mypage/Mypage';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TravelDetail from './pages/Travelpage/TravelDetail';
import Local from './pages/Travelpage/Local';
import App from './App.js';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<Main />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="local" element={<Local />} />
        <Route path="local/travelDetail" element={<TravelDetail />} />
        <Route path="mypage" element={<Mypage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
