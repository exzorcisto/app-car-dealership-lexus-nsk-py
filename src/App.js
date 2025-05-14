import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Homepage from "./pages/Homepage/Homepage";
import ModelRange from "./pages/ModelRange/ModelRange";
import AvailableCars from "./pages/AvailableCars/AvailableCars";
import LexusWorld from "./pages/LexusWorld/LexusWorld";
import Contacts from "./pages/Contacts/Contacts";
import CarDetails from "./pages/CarDetails/CarDetails";
import { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceAppointmentForm from './pages/ServiceAppointmentForm/ServiceAppointmentForm';
import CallBackForm from './pages/CallBackForm/CallBackForm';
import './index.css';

import AdminCarsList from './pages/admin/AdminCarsList';
import AddCar from './pages/admin/AddCar/AddCar';
import EditCar from './pages/admin/EditCar';

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="modelrange" element={<ModelRange />} />
            <Route path="availablecars" element={<AvailableCars cars={cars} />} />
            <Route path="availablecars/:id" element={<CarDetails cars={cars} />} />
            <Route path="lexusworld" element={<LexusWorld />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="serviceAppointmentForm" element={<ServiceAppointmentForm />} />
            <Route path="callBackForm" element={<CallBackForm />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminCarsList />} />
        <Route path="/admin/add" element={<AddCar />} />
        <Route path="/admin/edit/:id" element={<EditCar />} />
    </Routes>
    </>
  );
}

export default App;