import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import { auth } from '../firebase-config';
import Login from './components/Login';
import BookList from './components/BookList';

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Header>
        <h1>Personal Library</h1>
        {user && <LogoutBtn onClick={() => signOut(auth)}>Logout</LogoutBtn>}
      </Header>

      {!user ? <Login /> : <BookList />}
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
