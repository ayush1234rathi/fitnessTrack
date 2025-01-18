 import AuthPage from './components/Auth/AuthPage'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import img from './assets/img2.jpg';
function App() {
  return (
  <div 
  className='min-h-screen flex flex-col justify-between' 
  style={{
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
  >
    <Navbar />
    <AuthPage />
    <Footer />
   </div>
   )
}

export default App
