import { Route, Routes } from 'react-router-dom';
import './App.css';
import NumberInput from './components/NumberInput/NumberInput';
import OTPVerify from './components/OTPVerify/OTPVerify';
import Success from './components/Success/Success';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<NumberInput/>} />
        <Route path='/verify' element={<OTPVerify/>} />
        <Route path='/home' element={<Success/>}/>
      </Routes>
    </div>
  );
}

export default App;
