 import AuthPage from './components/Auth/AuthPage'
import Dashboard from './components/Dashboard';
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom';
function App() {
  return (
  <div 
  className='min-h-screen flex flex-col justify-between'>
    
    <Navbar />
    <Routes>
      <Route path='/' element={<AuthPage />} />
      <Route path='/dashboard' element={<Dashboard /> } />
    </Routes>
    <Footer />
   </div>
   )
}

export default App
