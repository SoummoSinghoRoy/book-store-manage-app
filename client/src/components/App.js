import './App.css';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

import SignUp from '../pages/auth/SignUp';
import LogIn from '../pages/auth/LogIn';
import Publisher from '../pages/publisher/Publisher';
import BookCreate from '../pages/book/BookCreate';
import BookList from '../pages/book/BookList';
import BookEdit from '../pages/book/BookEdit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/publisher' element={<Publisher/>}/>
          <Route path="/book">
            <Route index element={<BookList />} />
            <Route path="create" element={<BookCreate />} />
            <Route path="edit/:bookid" element={<BookEdit/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
