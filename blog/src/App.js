import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Component/View/Home';
import Signup from './Component/View/Signup';
import './Component/assets/css/style.css'
import Login from './Component/View/Login';
import ImageUpload from './Component/View/ImageUpload';

function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/imageupload' element={<ImageUpload />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
