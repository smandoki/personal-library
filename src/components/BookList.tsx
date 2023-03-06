import React from 'react';
import styled from 'styled-components';

function BookList() {
  return (
    <Container>
      <AddBookBtn>+ Add Book</AddBookBtn>
    </Container>
  );
}

export default BookList;

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const AddBookBtn = styled.button`
  background-color: #c38fff;
  border: none;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 12px 24px;

  :hover {
    filter: brightness(85%);
  }

  :active {
    filter: brightness(70%);
  }
`;
