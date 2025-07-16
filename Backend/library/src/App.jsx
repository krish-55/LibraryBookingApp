import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Register from './Register.jsx';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import UserDashboard from './UserDashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import AvailableBook from './AvailableBook.jsx';
import BookDetails from './BookDetails.jsx';
import Reservation from './Reservation.jsx';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path='/books' element={<AvailableBook />} />
        <Route path='/book/:id' element={<BookDetails />} />
        <Route path='/books/reservations' element={<Reservation />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;