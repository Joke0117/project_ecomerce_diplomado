import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter.jsx';
import { CarritoProvider } from './context/CarritoContext.jsx';
import { DescuentoProvider } from './context/DescuentoContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DescuentoProvider>
          <CarritoProvider>
            <Navbar />
            <div className="pt-20 min-h-screen bg-[#f8f8f8]">
              <AppRouter />
            </div>
            <WhatsAppButton />
          </CarritoProvider>
        </DescuentoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
