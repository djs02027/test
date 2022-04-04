import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import server from '../../API/server';
import axios from 'axios';
import Swal from 'sweetalert2';
// import jwt_decode from 'jwt-decode';

function LoginPage() {
  const [id, setid] = useState('');
  const [password, setPassword] = useState('');
  // const [authTokens, setAuthTokens] = useState('');
  // const [user, setUser] = useState('');
  const onidHandler = (event) => {
    setid(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', id);
    formData.append('password', password);
    await axios
      .post(server.BASE_URL + server.ROUTES.login, formData)
      .then((response) => {
        if (response.status === 200) {
          // setAuthTokens(response.data);
          // //jwt decode 사용
          // setUser(jwt_decode(response.data.access));
          // //Access Token 저장
          sessionStorage.setItem('jwt', response.data.access);
        }

        navigate('/');
      })
      .catch((error) => {
        // alert(error.response.data.detail);
        Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          // eslint-disable-next-line prettier/prettier
          text: '잘못된 아이디 또는 패스워드 입니다.'
        });
      });
  };
  let navigate = useNavigate();
  const onClick = () => {
    navigate('/signup');
  };

  return (
    <div className="wrap">
      <div className="login">
        {/* <h1>오디가지</h1> */}
        <form onSubmit={onSubmit}>
          <div className="login_id">
            <h5>아이디</h5>
            <input
              name="id"
              type="id"
              value={id}
              onChange={onidHandler}
              required
              autoComplete="on"
            />
          </div>
          <div className="login_pw">
            <h5>비밀번호</h5>
            <input
              name="password"
              type="password"
              value={password}
              onChange={onPasswordHandler}
              required
              autoComplete="off"
            />
          </div>
        </form>
        <div className="clearfix">
          <div className="btn">
            <button type="submit" onClick={onSubmit}>
              로그인
            </button>
          </div>
          <div className="btn" onClick={onClick}>
            <button>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
