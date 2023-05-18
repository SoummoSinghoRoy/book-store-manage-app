import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUp from '../pages/auth/SignUp';
import LogIn from '../pages/auth/LogIn';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<LogIn/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
