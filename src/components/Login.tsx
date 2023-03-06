import React from 'react';
import styled from 'styled-components';
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
  return (
    <Container>
      <h1>Log in</h1>
      <LoginBtn>
        <GoogleIcon />
        Log in with Google
      </LoginBtn>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LoginBtn = styled.button`
  width: 200px;
  display: flex;
  align-items: center;
  background-color: #1e1e1e;
  border: 1px solid #e9e9e9;
  padding: 8px 16px;
  border-radius: 4px;
  gap: 10px;
  justify-content: center;

  :hover {
    filter: brightness(85%);
  }

  :active {
    filter: brightness(70%);
  }
`;
