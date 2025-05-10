import React from 'react'
import './LexusWorld.css'
import NavBar from '../../components/UI/NavBar/NavBar'



export default function LexusWorld() {
    return (
        <main>
            <NavBar>Мир Lexus</NavBar>
            <div className="lexus-world">
                {/* Верхний блок с текстом и изображением */}
                <div className="lexus-intro">
                    <div className="intro-text">
                        <h2>МИР LEXUS</h2>
                        <h1>O LEXUS</h1>
                    </div> 
                    <div className="intro-text">
                        <p>
                            Все начинается со смелой идеи: мы не ограничиваем себя в поиске источников вдохновения:
                            такой подход развивает оригинальность мышления и креативность.
                        </p>
                    </div>
                </div>

                {/* Основной контент */}
                <div className="features-grid">
                    {/* Блок 1: Передовые технологии */}
                    <div className="feature-column">
                    <div className="feature-number">01</div>
                    <h2 className="feature-title">ПЕРЕДОВЫЕ ТЕХНОЛОГИИ</h2>
                    <p className="feature-description">
                    Мы рассматриваем технологии как катализатор творчества. Мы не просто воплощаем самые актуальные разработки, 
                    а развиваем их в необычных и неожиданных направлениях.
                    </p>
                    </div>

                    {/* Блок 2: Высочайшее качество */}
                    <div className="feature-column">
                    <div className="feature-number">02</div>
                    <h2 className="feature-title">ВЫСОЧАЙШЕЕ КАЧЕСТВО</h2>
                    <p className="feature-description">
                    «Такуми» — древние японские понятие и традиция, выражающие суть мастерства. 
                    Именно они лежат в основе всего нашего производственного процесса. 
                    Все наши мастера Такуми обладают утонченным вкусом и прошли напряженный путь обучения длиною в годы. 
                    Стремясь к наилучшим результатам, они работают столько, сколько необходимо для создания исключительных 
                    автомобилей, сочетая традиционные техники с современными технологиями.
                    </p>
                    </div>

                    {/* Блок 3: Стандарты гостеприимства */}
                    <div className="feature-column">
                    <div className="feature-number">03</div>
                    <h2 className="feature-title">СТАНДАРТЫ ГОСТЕПРИИМСТВА</h2>
                    <p className="feature-description">
                    Ваша уверенность в качестве услуг и премиальном обслуживании – основной приоритет, 
                    поэтому мы гарантируем максимальный комфорт.
                    </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
