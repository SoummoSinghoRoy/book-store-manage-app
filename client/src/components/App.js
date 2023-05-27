import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUp from '../pages/auth/SignUp';
import LogIn from '../pages/auth/LogIn';
import Publisher from '../pages/publisher/Publisher';
import BookCreate from '../pages/book/BookCreate';
import BookList from '../pages/book/BookList';
import ProtectedRoute from './partials/ProtectedRoute';
import UnProtectedRoute from './partials/UnProtectedRoute';
import Navbar from './partials/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/signup' element={
            <UnProtectedRoute>
              <SignUp/>
            </UnProtectedRoute>
          }/>
          <Route path='/login' element={
            <UnProtectedRoute>
            <LogIn/>
          </UnProtectedRoute>
          }/>
          <Route path='/publisher' element={
            <ProtectedRoute>
              <Publisher/>
            </ProtectedRoute>
          }/>
          <Route path="/book">
            <Route index element={
              <ProtectedRoute>
                <BookList />
              </ProtectedRoute>
            } />
            <Route path="create" element={
              <ProtectedRoute>
                <BookCreate />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
