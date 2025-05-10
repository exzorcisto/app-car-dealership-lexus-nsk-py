import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ButtonCustom from '../../components/UI/ButtonCustom/ButtonCustom';
import './CarDetails.css';
import axios from 'axios';

const URL = 'http://localhost:8000';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [car, setCarInfo] = useState(location.state?.car || null);
    const [loading, setLoading] = useState(!location.state?.car);

    useEffect(() => {
        if (!location.state?.car || location.state.car.carid.toString() !== id) {
            setLoading(true);
            axios.get(`${URL}/cars/${id}`)
                .then(response => {
                    setCarInfo(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [id, location.state]);

    // Улучшенная обработка описаний
    const getDescriptions = () => {
        if (!car) return { description1: [], description2: [] };

        // Получаем описания из car (используем правильные имена полей из models.py)
        const desc1 = car.description_1 || '';
        const desc2 = car.description_2 || '';

        // Преобразуем в массив, если это строка (разделяем по переносам строк)
        const description1 = typeof desc1 === 'string' 
            ? desc1.split('\n').filter(item => item.trim() !== '') 
            : [];
        
        const description2 = typeof desc2 === 'string' 
            ? desc2.split('\n').filter(item => item.trim() !== '') 
            : [];

        return { description1, description2 };
    };

    const { description1, description2 } = getDescriptions();

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (!car) {
        return (
            <div className="car-not-found">
                <h2>Автомобиль не найден</h2>
                <ButtonCustom onClick={() => navigate('/availablecars')}>
                    Вернуться к списку
                </ButtonCustom>
            </div>
        );
    }

    return (
        <div className="car-details-container">
            <div className="car-header-section">
                <div className="header-content">
                    <h1>LEXUS {car.model_name} {car.trimlevel}</h1>
                    <div className="availability-date">Доступен к заказу • {new Date().toLocaleDateString('ru-RU')}</div>
                </div>
                
                <div className="price-action-container">
                    <div className="price-value">
                        {new Intl.NumberFormat('ru-RU', {
                            style: 'decimal',
                        }).format(car.price)} ₽
                    </div>
                    <ButtonCustom className="offer-btn">
                        ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
                    </ButtonCustom>
                </div>
            </div>

            {car.image && (
                <div className="car-image-container">
                    <img 
                        src={car.image.startsWith('/assets/') 
                            ? process.env.PUBLIC_URL + car.image 
                            : !car.image.startsWith('/') 
                                ? process.env.PUBLIC_URL + '/assets/' + car.image 
                                : process.env.PUBLIC_URL + car.image} 
                        alt={`${car.model_name} ${car.trimlevel} ${car.year}`}
                    />
                </div>
            )}

            <div className="specs-section">
                <h2>ХАРАКТЕРИСТИКИ</h2>
                <div className="specs-grid">
                    <div className="spec-row">
                        <span className="spec-name">Цвет кузова</span>
                        <span className="spec-value">{car.color}</span>
                    </div>
                    <div className="spec-row">
                        <span className="spec-name">Дата производства</span>
                        <span className="spec-value">{car.year}</span>
                    </div>
                    <div className="spec-row">
                        <span className="spec-name">Кузов</span>
                        <span className="spec-value">{car.bodywork}</span>
                    </div>
                    <div className="spec-row">
                        <span className="spec-name">Двигатель</span>
                        <span className="spec-value">{car.engine} л</span>
                    </div>
                    <div className="spec-row">
                        <span className="spec-name">Топливо</span>
                        <span className="spec-value">{car.fuel}</span>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <h2>КОМПЛЕКТАЦИЯ</h2>
                <div className="features-grid">
                    <div className="feature-group">
                        <h3>ЭКСТЕРЬЕР</h3>
                        <ul className="features-list">
                            {description1.length > 0 ? (
                                description1.map((item, index) => (
                                    <li key={`exterior-${index}`}>{item}</li>
                                ))
                            ) : (
                                <li>Нет данных о комплектации</li>
                            )}
                        </ul>
                    </div>
                    <div className="feature-group">
                        <h3>КОМФОРТ</h3>
                        <ul className="features-list">
                            {description2.length > 0 ? (
                                description2.map((item, index) => (
                                    <li key={`comfort-${index}`}>{item}</li>
                                ))
                            ) : (
                                <li>Нет данных о комфорте</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;