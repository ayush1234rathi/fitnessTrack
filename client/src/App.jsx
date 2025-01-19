 import AuthPage from './components/Auth/AuthPage'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
function App() {
  return (
  <div 
  className='min-h-screen flex flex-col justify-between'>
    <Navbar />
    <AuthPage />
    <Footer />
   </div>
   )
}

export default App
