import Dashboard from './components/Dashboard';
import SignUpForm from './components/Auth/SignUp';
import LoginForm from './components/Auth/Login';
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom';
function App() {
  return (
  <div 
  className='min-h-screen flex flex-col bg-gray-200 justify-between'>
    
    <Navbar />
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path='/dashboard' element={<Dashboard /> } />
</Routes>

    <Footer />
   </div>
   )
}

export default App
