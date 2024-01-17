import './App.css';
import Home from './Pages/Home';
import SecondPage from './Pages/SecondPage';
import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/second' element={<SecondPage />} />
      </Routes>
    </>
  )
}

export default App
