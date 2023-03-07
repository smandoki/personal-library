import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface IFormInput {
  title: string;
  author: string;
  pages: string;
  read: boolean;
}

function BookList() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    closeDialog();
  });

  const closeDialog = () => {
    dialogRef.current?.close();
    reset();
  };

  return (
    <Container>
      <AddBookBtn onClick={() => dialogRef.current?.showModal()}>
        + Add Book
      </AddBookBtn>

      <AddBookDialog ref={dialogRef} onClick={closeDialog}>
        <form
          method="dialog"
          onClick={(e) => e.stopPropagation()}
          onSubmit={onSubmit}
        >
          <h2>Add New Book</h2>

          <label htmlFor="title">Title:</label>
          <input type="text" {...register('title')} required />

          <label htmlFor="author">Author:</label>
          <input type="text" {...register('author')} required />

          <label htmlFor="pages">Pages:</label>
          <input type="number" {...register('pages')} min="1" required />

          <label className="checkbox-label">
            Have you read this book?
            <input type="checkbox" {...register('read')} />
          </label>

          <ButtonContainer>
            <button type="button" id="cancel-button" onClick={closeDialog}>
              Cancel
            </button>
            <button type="submit" id="submit-button">
              Submit
            </button>
          </ButtonContainer>
        </form>
      </AddBookDialog>
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

const AddBookDialog = styled.dialog`
  position: absolute;
  inset: 50% 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: #1b1b1b;
  padding: 0;
  border: none;
  border-radius: 4px;

  ::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }

  form {
    padding: 30px 40px;
    width: 300px;
    display: flex;
    flex-direction: column;
  }

  h2 {
    margin-bottom: 20px;
  }

  input {
    margin-top: 4px;
    margin-bottom: 20px;
    padding: 8px;
    color: black;
    border-radius: 4px;
    border: none;
  }

  .checkbox-label {
    display: flex;
    gap: 20px;

    :hover {
      cursor: pointer;
    }

    input {
      margin: 0;

      :hover {
        cursor: pointer;
      }
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-left: auto;
  margin-top: 40px;

  button {
    border: none;
    padding: 8px 16px;
    border-radius: 4px;

    :hover {
      filter: brightness(85%);
    }

    :active {
      filter: brightness(70%);
    }
  }

  #cancel-button {
    outline: 1px solid #a67ad9;
    background-color: #1b1b1b;
    color: #a67ad9;
  }

  #submit-button {
    background-color: #a67ad9;
    color: black;
  }
`;
