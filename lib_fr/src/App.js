import BookDetail from './book/bookDetail';
import BookList from './book/bookList';
import Login from './user/login';
import SignUp from './user/signup';
import AddBook from './book/addBook';
import PaginatedItems from './book/test';
import UpdateBook from './book/updateBook';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Header from './partner/header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        {/* <BookList itemsPerPage={5}></BookList> */}
        {/* <Login></Login> */}
        {/* <AddBook></AddBook> */}
        {/* <UpdateBook></UpdateBook> */}
        <Routes>
          <Route exact path="/" element={<BookList itemsPerPage={5}/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/insert-book" element={<AddBook/>} />
          <Route path="/update-book/:id" element={<UpdateBook/>} />
          <Route path="/book/:id" element={<BookDetail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
