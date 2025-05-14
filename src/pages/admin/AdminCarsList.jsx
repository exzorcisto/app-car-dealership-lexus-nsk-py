import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './admin.css';

function AdminCarsList() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/cars/');
                setCars(response.data);
            } catch (err) {
                setError('Ошибка при загрузке автомобилей');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
            try {
                await axios.delete(`http://localhost:8000/api/cars/${id}/`);
                setCars(cars.filter(car => car.carid !== id));
            } catch (err) {
                setError('Ошибка при удалении автомобиля');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-container">
            <h1>Управление автомобилями</h1>
            <Link to="/admin/add" className="add-btn">Добавить автомобиль</Link>
            
            <div className="cars-list">
                {cars.length === 0 ? (
                    <p>Нет автомобилей в базе</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Модель</th>
                                <th>Комплектация</th>
                                <th>Год</th>
                                <th>Цена</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map(car => (
                                <tr key={car.carid}>
                                    <td>{car.model_name}</td>
                                    <td>{car.trimlevel}</td>
                                    <td>{car.year}</td>
                                    <td>{car.price.toLocaleString()} руб.</td>
                                    <td>
                                        <Link to={`/admin/edit/${car.carid}`} className="edit-btn">Изменить</Link>
                                        <button onClick={() => handleDelete(car.carid)} className="delete-btn">Удалить</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminCarsList;