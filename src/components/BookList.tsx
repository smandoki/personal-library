import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { User } from 'firebase/auth';
import { db } from '../../firebase-config';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface IFormInput {
  title: string;
  author: string;
  pages: string;
  read: boolean;
}

interface Book extends IFormInput {
  id: string;
}

function BookList({ user }: { user: User }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [books, setBooks] = useState<Book[]>([]);

  const onSubmit = handleSubmit((data) => {
    closeDialog();
    addBookToCollection(data);
  });

  const closeDialog = () => {
    dialogRef.current?.close();
    reset();
  };

  const addBookToCollection = async (data: IFormInput) => {
    try {
      await addDoc(collection(db, `users/${user.uid}/books`), {
        ...data,
      });

      getBooksFromCollection();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getBooksFromCollection = async () => {
    const querySnapshot = await getDocs(
      collection(db, `users/${user.uid}/books`)
    );

    const books: Book[] = [];
    querySnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() } as Book);
    });

    setBooks(books);
  };

  //load users books on mount and when new user logs in
  useEffect(() => {
    getBooksFromCollection();
  }, [user]);

  const deleteBookFromCollection = async (id: string) => {
    await deleteDoc(doc(db, `users/${user.uid}/books`, id));
    getBooksFromCollection();
  };

  const toggleReadStatus = async (id: string, read: boolean) => {
    //update local state first to make checkbox feel responsive
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === id) {
          return { ...book, read: !read };
        }

        return { ...book };
      })
    );

    //then update firestore and refetch state
    await updateDoc(doc(db, `users/${user.uid}/books`, id), { read: !read });
    getBooksFromCollection();
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

      {books.length > 0 && (
        <Table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Pages</th>
              <th>Read</th>
              <th></th>
            </tr>

            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.pages}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={book.read}
                    onChange={() => toggleReadStatus(book.id, book.read)}
                  />
                </td>
                <td>
                  <DeleteButton
                    onClick={() => deleteBookFromCollection(book.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
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

const Table = styled.table`
  //background-color: #1e1e1e;
  margin-top: 40px;
  border-collapse: collapse;

  tbody {
    tr:not(:first-child) {
      border-top: 1px solid darkgray;
      border-bottom: 1px solid darkgray;
    }
  }

  th {
    text-align: left;
  }

  td,
  th {
    padding: 16px 32px;
  }
`;

const DeleteButton = styled(DeleteForeverIcon)`
  :hover {
    filter: brightness(85%);
  }

  :active {
    filter: brightness(70%);
  }
`;
