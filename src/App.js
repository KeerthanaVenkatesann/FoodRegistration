import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './Components/Food Registration/Form';
import List from './Components/Food Registration/List';
import Edit from './Components/Food Registration/Edit';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/form'element={<Form/>}></Route>
      <Route path='/list'element={<List/>}></Route>
      <Route path='/edit'element={<Edit/>}></Route>
    </Routes>
      </BrowserRouter>
  );
}

export default App;
