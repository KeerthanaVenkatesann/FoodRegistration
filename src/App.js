import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './Components/Food Registration/Form';
import List from './Components/Food Registration/List';
import Edit from './Components/Food Registration/Edit';
import Layout from './Components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
    <Layout />
    <Routes>
    
    
    <Route path="/foodregistration/:id/edit" element={<Edit />    }/>
      <Route path='/foodregistration'element={<Form/>}></Route>
      <Route path='/listmanaging'element={<List/>}></Route>
      <Route path='/edit'element={<Edit/>}></Route>
    </Routes>
      </BrowserRouter>
  );
}

export default App;