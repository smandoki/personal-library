import React from 'react';
import styled from 'styled-components';
import Login from './components/Login';
import BookList from './components/BookList';

function App() {
  return (
    <>
      <Header>
        <h1>Personal Library</h1>
        <LogoutBtn>Logout</LogoutBtn>
      </Header>

      <Login />
      <BookList />
    </>
  );
}

export default App;

const Header = styled.header`
  background-color: #1e1e1e;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const LogoutBtn = styled.button`
  background-color: #c38fff;
  color: black;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: bold;

  :hover {
    filter: brightness(85%);
  }

  :active {
    filter: brightness(70%);
  }
`;
