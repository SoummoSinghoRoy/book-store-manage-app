import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUp from '../pages/auth/SignUp';
import LogIn from '../pages/auth/LogIn';
import Publisher from '../pages/publisher/Publisher';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/publisher' element={<Publisher/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
